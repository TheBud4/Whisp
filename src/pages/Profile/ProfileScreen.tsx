import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../@types/navigationTypes";
import { UserService } from "@/services/UserService";
import { User } from "@/models/User";

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
    <View>
      <Text>Perfil do Usuário</Text>
      {user ? (
        <Text>
          <Text>ID: {user.id}</Text>
          <Text>Email: {user.email}</Text>
          <Text>Nome de usuário: {user.username}</Text>
        </Text>
      ) : (
        <Text>Carregando...</Text>
      )}
    </View>
  );
};

export default ProfileScreen;
