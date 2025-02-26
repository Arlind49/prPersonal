import React from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Linking,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const { width, height } = Dimensions.get("window");

const About = () => {
  const openLink = async (url) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Rreth A.S News</Text>
        <Text style={styles.content}>
          A.S News është një aplikacion lajmesh që mblidh lajmet më të fundit
          nga e gjithë bota. Projektuar me një temë moderne, ai ofron një
          përvojë të pastër dhe elegante për përdoruesit.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.subtitle}>Na Ndiqni</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() =>
              openLink("https://www.instagram.com/_arlindselimi_/")
            }
            style={styles.iconButton}
          >
            <Ionicons name="logo-instagram" size={32} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openLink("https://github.com/Arlind49")}
            style={styles.iconButton}
          >
            <Ionicons name="logo-github" size={32} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              openLink(
                "https://www.linkedin.com/in/arlind-selimi-10101010101010101010/"
              )
            }
            style={styles.iconButton}
          >
            <Ionicons name="logo-linkedin" size={32} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.subtitle}>Thank You For Visiting :)</Text>
      </View>

      <Text style={styles.footer}>© 2025 A.S News</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181818",
    padding: 16,
  },
  card: {
    backgroundColor: "#222",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
    width: width - 32,
    height: height * 0.25,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#ddd",
    textAlign: "center",
    marginBottom: 15,
  },
  content: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
    lineHeight: 24,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  iconButton: {
    backgroundColor: "#333",
    padding: 12,
    borderRadius: 50,
    alignItems: "center",
  },
  contactButton: {
    backgroundColor: "#1E90FF",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  contactText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
});

export default About;
