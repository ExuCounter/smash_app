import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>About Screen</Text>
      <Link href="/" style={styles.button}>
        Go to home screen
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    color: "white",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#25292e",
    color: "white",
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "white",
    fontWeight: 600,
  },
});
