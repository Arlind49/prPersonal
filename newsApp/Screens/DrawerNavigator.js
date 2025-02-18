import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./Home"; // Import the Home screen

const Drawer = createDrawerNavigator();

const categories = [
  { key: "general", label: "General" },
  { key: "business", label: "Business" },
  { key: "entertainment", label: "Entertainment" },
  { key: "health", label: "Health" },
  { key: "science", label: "Science" },
  { key: "sports", label: "Sports" },
  { key: "technology", label: "Technology" },
];

const DrawerNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="General">
        {categories.map((category) => (
          <Drawer.Screen 
            key={category.key} 
            name={category.label} 
            component={HomeScreen} 
            initialParams={{ category: category.key }} // Pass category as a parameter
          />
        ))}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigator;
