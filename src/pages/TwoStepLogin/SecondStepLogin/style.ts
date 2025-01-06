import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  passwordContainer: {
    position: "relative",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
    height: "100%",
    paddingRight: 40, 
  },
  iconContainer: {
    position: "absolute",
    right: 10, 
  },
  botoes: {
    padding: 50,
    gap: 10,
  },
});

export default styles;