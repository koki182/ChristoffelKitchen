import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.chefEmoji}>👨‍🍳</Text>

        <Text style={styles.logo}>
          CHRISTOFFEL'S KITCHEN
        </Text>

        <Text style={styles.title}>
          Your Menu.
        </Text>

        <Text style={styles.title}>
          Your Experience.
        </Text>

        <Text style={styles.subtitle}>
          Fresh food made personally for every guest.
        </Text>
      </View>

      {/* About Section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          About This App
        </Text>

        <Text style={styles.description}>
          Christoffel's Kitchen is a private chef menu
          management application. It allows Chef Christoffel
          to create and manage menu items while allowing
          guests to easily view the available dishes.
        </Text>
      </View>

      {/* What You Can Do */}
      <View style={styles.featureCard}>
        <Text style={styles.sectionTitle}>
          What You Can Do
        </Text>

        <Text style={styles.feature}>
          🍽️ View today's complete menu
        </Text>

        <Text style={styles.feature}>
          ➕ Add new menu items
        </Text>

        <Text style={styles.feature}>
          🍲 Choose different courses
        </Text>

        <Text style={styles.feature}>
          🔍 Filter dishes by course
        </Text>

        <Text style={styles.feature}>
          📊 View menu information
        </Text>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.buttonsContainer}>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/todays-menu")}
        >
          <Text style={styles.buttonText}>
            VIEW TODAY'S MENU
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/add-menu-item")}
        >
          <Text style={styles.buttonText}>
            ADD MENU ITEM
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/filter-menu")}
        >
          <Text style={styles.buttonText}>
            FILTER MENU
          </Text>
        </TouchableOpacity>

      </View>

      {/* Logout */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.replace("/")}
      >
        <Text style={styles.backText}>
          LOG OUT
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F1E7",
  },

  header: {
    alignItems: "center",
    paddingTop: 45,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },

  chefEmoji: {
    fontSize: 60,
    marginBottom: 10,
  },

  logo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E4511E",
    marginBottom: 25,
  },

  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#33251F",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 18,
    color: "#76594C",
    marginTop: 20,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 25,
    marginHorizontal: 15,
    marginBottom: 20,
  },

  featureCard: {
    backgroundColor: "#FFF0E7",
    borderRadius: 20,
    padding: 25,
    marginHorizontal: 15,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#33251F",
    marginBottom: 15,
  },

  description: {
    fontSize: 17,
    lineHeight: 27,
    color: "#76594C",
  },

  feature: {
    fontSize: 18,
    color: "#76594C",
    marginBottom: 15,
  },

  buttonsContainer: {
    paddingHorizontal: 15,
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#E4511E",
    paddingVertical: 17,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  backButton: {
    alignItems: "center",
    padding: 20,
    marginBottom: 30,
  },

  backText: {
    color: "#E4511E",
    fontSize: 16,
    fontWeight: "bold",
  },
});