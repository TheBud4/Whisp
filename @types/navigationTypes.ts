
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
  ChatScreen: { userId: string; contactId: string, contactName: string,conversationId: string };
  
  //TODO: Criar essas telas

  GroupsScreen: { userId: string };
  ChatsScreen: { userId: string };
  CreateGroupScreen: { userId: string };
  GroupScreen: { userId: string; groupId: string };
  AddMembersScreen: { userId: string; groupId: string };
  ProfileEditScreen: { userId: string };
};
