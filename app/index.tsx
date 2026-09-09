import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = () => {
    router.replace("/home");
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>CHRISTOFFEL'S KITCHEN</Text>

      <Text style={styles.subtitle}>Private Chef Menu Manager</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#777"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#777"
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
      >
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F1E7",
    justifyContent: "center",
    padding: 25,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#5A2E1B",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: "#8B4A2F",
    textAlign: "center",
    marginBottom: 35,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D8B9A5",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },

  loginButton: {
    backgroundColor: "#C85A32",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  loginText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});