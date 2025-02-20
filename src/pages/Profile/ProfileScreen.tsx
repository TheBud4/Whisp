import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../@types/navigationTypes";
import { UserService } from "@/services/UserService";
import { User } from "@/models/User";
import "./style.ts";

type ProfileScreenRouteProp = RouteProp<RootStackParamList, "ProfileScreen">;

const ProfileScreen: React.FC = () => {
  const route = useRoute<ProfileScreenRouteProp>();
  const { userId } = route.params;

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await UserService.getCurrentUser(userId);
        if (fetchedUser) {
          setUser(fetchedUser);
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>
      {user ? (
        <View style={styles.profileContainer}>
          <Text style={styles.label}>ID:</Text>
          <Text style={styles.text}>{user.id}</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.text}>{user.email}</Text>

          <Text style={styles.label}>Nome de usuário:</Text>
          <Text style={styles.text}>{user.username}</Text>
        </View>
      ) : (
        <Text style={styles.loadingText}>Carregando...</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  profileContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
    marginBottom: 5,
  },
  text: {
    fontSize: 18,
    color: "#333",
    marginBottom: 15,
  },
  loadingText: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
  },
});

export default ProfileScreen;
