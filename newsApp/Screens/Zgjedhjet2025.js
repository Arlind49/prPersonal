import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import Svg, { Rect } from "react-native-svg";

// Election data for different cities
const electionData = {
  Prishtina: [
    { name: "VV", percentage: 45.2, color: "#FF0000" },
    { name: "PDK", percentage: 20.1, color: "#5DADEC" },
    { name: "LDK", percentage: 18.3, color: "#6C93C4" },
    { name: "AAK-NISMA", percentage: 8.1, color: "#5B4B8A" },
    { name: "Koalicioni për Familjen", percentage: 2.3, color: "#7B68EE" },
  ],
  Mitrovica: [
    { name: "VV", percentage: 56.29, color: "#FF0000" },
    { name: "PDK", percentage: 30.51, color: "#5DADEC" },
    { name: "LDK", percentage: 6.38, color: "#6C93C4" },
    { name: "Koalicioni për Familjen", percentage: 3.41, color: "#7B68EE" },
    { name: "AAK-NISMA", percentage: 1.42, color: "#5B4B8A" },
  ],
  Gjakova: [
    { name: "VV", percentage: 48.08, color: "#FF0000" },
    { name: "AAK-NISMA", percentage: 19.15, color: "#5B4B8A" },
    { name: "LDK", percentage: 16.47, color: "#6C93C4" },
    { name: "PDK", percentage: 9.99, color: "#5DADEC" },
    { name: "Koalicioni për Familjen", percentage: 1.32, color: "#7B68EE" },
  ],
  Ferizaj: [
    { name: "VV", percentage: 42.3, color: "#FF0000" },
    { name: "PDK", percentage: 24.7, color: "#5DADEC" },
    { name: "LDK", percentage: 15.2, color: "#6C93C4" },
    { name: "AAK-NISMA", percentage: 9.8, color: "#5B4B8A" },
    { name: "Koalicioni për Familjen", percentage: 3.0, color: "#7B68EE" },
  ],
  Peja: [
    { name: "VV", percentage: 41.06, color: "#FF0000" },
    { name: "LDK", percentage: 27.64, color: "#6C93C4" },
    { name: "AAK-NISMA", percentage: 12.77, color: "#5B4B8A" },
    { name: "PDK", percentage: 10.36, color: "#5DADEC" },
    { name: "Koalicioni për Familjen", percentage: 1.14, color: "#7B68EE" },
  ],
  Gjilan: [
    { name: "VV", percentage: 36.7, color: "#FF0000" },
    { name: "PDK", percentage: 25.9, color: "#5DADEC" },
    { name: "LDK", percentage: 18.6, color: "#6C93C4" },
    { name: "AAK-NISMA", percentage: 12.3, color: "#5B4B8A" },
    { name: "Koalicioni për Familjen", percentage: 2.5, color: "#7B68EE" },
  ],
  Podujeva: [
    { name: "VV", percentage: 36.7, color: "#FF0000" },
    { name: "PDK", percentage: 25.9, color: "#5DADEC" },
    { name: "LDK", percentage: 18.6, color: "#6C93C4" },
    { name: "AAK-NISMA", percentage: 12.3, color: "#5B4B8A" },
    { name: "Koalicioni për Familjen", percentage: 2.5, color: "#7B68EE" },
  ],
};

const Zgjedhjet2025 = () => {
  const [selectedCity, setSelectedCity] = useState("Prishtina");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>REZULTATET PRELIMINARE</Text>
      <Text style={styles.subtitle}>10-shi News</Text>

      <View style={styles.cityBar}>
        {Object.keys(electionData).map((city) => (
          <TouchableOpacity
            key={city}
            style={[
              styles.cityButton,
              selectedCity === city && styles.selectedCityButton,
            ]}
            onPress={() => setSelectedCity(city)}
          >
            <Text
              style={[
                styles.cityText,
                selectedCity === city && styles.selectedCityText,
              ]}
            >
              {city}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Poll Results */}
      <FlatList
        data={electionData[selectedCity]}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.pollItem}>
            <Text style={styles.pollLabel}>{item.name}</Text>
            <View style={styles.barContainer}>
              <Svg height="20" width="100%">
                <Rect x="0" y="0" width={`${item.percentage}%`} height="20" fill={item.color} rx="10" ry="10" />
              </Svg>
            </View>
            <Text style={styles.pollPercentage}>{item.percentage}%</Text>
          </View>
        )}
      />

      <Text style={styles.footer}>Zgjedhjet 2025</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 25,
    color: "#aaa",
    marginBottom: 20,
  },
  cityBar: {
    flexDirection: "row",
    flexWrap: "wrap", // Allows cities to wrap to the next line
    justifyContent: "center",
    marginBottom: 20,
  },
  cityButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    marginVertical: 5, // Added spacing between rows
    borderRadius: 8,
    backgroundColor: "#333",
  },
  selectedCityButton: {
    backgroundColor: "#D70000",
  },
  cityText: {
    color: "#fff",
    fontSize: 18,
  },
  selectedCityText: {
    fontWeight: "bold",
  },
  pollItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 15,
  },
  pollLabel: {
    flex: 1,
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    paddingRight: 15,
  },
  barContainer: {
    flex: 3,
    marginHorizontal: 10,
  },
  pollPercentage: {
    marginLeft: 15,
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  footer: {
    marginTop: 30,
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#D70000",
    color: "white",
    padding: 15,
    borderRadius: 8,
  },
});

export default Zgjedhjet2025;
