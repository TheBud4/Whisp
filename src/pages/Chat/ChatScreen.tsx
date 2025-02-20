import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../@types/navigationTypes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { MessageService } from "@/services/MessageService";
import Icon from "react-native-vector-icons/MaterialIcons";

type ChatScreenRouteProp = RouteProp<RootStackParamList, "ChatScreen">;
type ScreenProps = NativeStackNavigationProp<RootStackParamList, "ChatScreen">;

const ChatScreen: React.FC = () => {
  const route = useRoute<ChatScreenRouteProp>();
  const navigation = useNavigation<ScreenProps>();

  const { userId, contactId, contactName, conversationId } = route.params;

  const [messages, setMessages] = useState<
    { id: string; senderId: string; content: string; timestamp: string }[]
  >([]);
  const [messageText, setMessageText] = useState("");

  useEffect(() => {

     if (!conversationId) {
       console.error("conversationId não está definido!");
       return; // Evita a chamada se não houver conversationId
     }
     
    const fetchMessages = async () => {
      try {
        const fetchedMessages = await MessageService.getMessages(
          conversationId
        );

        // Transformando os dados no formato esperado
        const formattedMessages = fetchedMessages.map((message: any) => ({
          id: message.id,
          senderId: message.sender_id,
          content: message.content,
          timestamp: message.created_at,
        }));

        setMessages(formattedMessages);
      } catch (error) {
        console.error("Erro ao carregar mensagens:", error);
      }
    };

    fetchMessages();
  }, [conversationId]);

  const sendMessage = async () => {
    if (!messageText.trim()) return;

    try {
      const newMessage = await MessageService.sendMessage(
        conversationId,
        userId,
        messageText
      );

      if (newMessage) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: newMessage.id,
            senderId: newMessage.sender_id,
            content: newMessage.content,
            timestamp: newMessage.created_at,
          },
        ]);
      }

      setMessageText(""); // Limpa o campo de texto após enviar
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    }
  };


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{contactName}</Text>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.senderId === userId
                ? styles.sentMessage
                : styles.receivedMessage,
            ]}
          >
            <Text style={styles.messageText}>{item.content}</Text>
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={messageText}
          onChangeText={setMessageText}
          placeholder="Digite uma mensagem..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Icon name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    padding: 16,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 16,
  },
  messageContainer: {
    padding: 12,
    margin: 8,
    borderRadius: 12,
    maxWidth: "75%",
  },
  sentMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#007AFF",
  },
  receivedMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#E5E5EA",
  },
  messageText: {
    fontSize: 16,
    color: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#ccc",
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 20,
  },
});

export default ChatScreen;
