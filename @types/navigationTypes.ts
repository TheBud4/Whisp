
// @types/navigationTypes.ts
export type RootStackParamList = {
  OnboardingScreen: undefined;
  RegistrationScreen: undefined;
  FirstStepLoginScreen: undefined;
  SecondStepLoginScreen: { email: string };
  HomeScreen: { userId: string };
  ProfileScreen: { userId: string };
  ContactsScreen: { userId: string };
  AddContactScreen: { userId: string };
  
  //TODO: Criar essas telas
  ChatScreen: { userId: string; chatId: string };

  GroupsScreen: { userId: string };
  ChatsScreen: { userId: string };
  CreateGroupScreen: { userId: string };
  GroupScreen: { userId: string; groupId: string };
  AddMembersScreen: { userId: string; groupId: string };
  ProfileEditScreen: { userId: string };
};
