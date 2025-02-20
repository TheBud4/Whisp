
// @types/navigationTypes.ts
export type RootStackParamList = {
  OnboardingScreen: undefined;
  RegistrationScreen: undefined;
  FirstStepLoginScreen: undefined;
  SecondStepLoginScreen: { email: string };
  HomeScreen: { userId: string };
  //TODO: Criar essas telas
  
  ProfileScreen: { userId: string };
  ContactsScreen: { userId: string };
  GroupsScreen: { userId: string };
  ChatsScreen: { userId: string };
  ChatScreen: { userId: string; chatId: string };
  CreateGroupScreen: { userId: string };
  GroupScreen: { userId: string; groupId: string };
  AddMembersScreen: { userId: string; groupId: string };
  ProfileEditScreen: { userId: string };
};
