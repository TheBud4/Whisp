import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
  buttonBase: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "blue",
    marginHorizontal: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 8,
  },
  icon: {
    marginRight: 5,
  },
  botaoproximo: {
    backgroundColor: "blue",
  },
  botaopular: {
    backgroundColor: "gray",
  },
  botaoPronto: {
    backgroundColor: "green",
  },
});

export default styles;