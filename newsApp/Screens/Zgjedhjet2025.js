import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Svg, { Rect } from "react-native-svg";

const Zgjedhjet2025Data = [
  { name: "VV", percentage: 40.83, color: "#FF0000" },
  { name: "PDK", percentage: 22.05, color: "#5DADEC" },
  { name: "LDK", percentage: 17.67, color: "#6C93C4" },
  { name: "AAK-NISMA", percentage: 7.45, color: "#5B4B8A" },
  { name: "Koalicioni për Familjen", percentage: 2.26, color: "#7B68EE" },
];

const Zgjedhjet2025 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>REZULTATET PRELIMINARE</Text>
      <Text style={styles.subtitle}>10-shi News</Text>
      <FlatList
        data={Zgjedhjet2025Data}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.pollItem}>
            <Text style={styles.pollLabel}>{item.name}</Text>
            <Svg height="20" width="100%"> 
              <Rect
                x="0"
                y="0"
                width={`${item.percentage}%`}
                height="20" 
                fill={item.color}
                rx="10"
                ry="10"
              />
            </Svg>
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
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 25,
    color: "#aaa",
    marginBottom: 20,
  },
  pollItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 12,
  },
  pollLabel: {
    flex: 1,
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
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
