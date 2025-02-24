import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Import Screens
import Home from './Screens/Home';  
import Zgjedhjet2025 from './Screens/Zgjedhjet2025';
import About from './Screens/About';

const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();

// News Categories for Drawer
const categories = [
  { key: "general", label: "General" },
  { key: "business", label: "Business" },
  { key: "entertainment", label: "Entertainment" },
  { key: "health", label: "Health" },
  { key: "science", label: "Science" },
  { key: "sports", label: "Sports" },
  { key: "technology", label: "Technology" },
];

// Drawer Navigator for Categories
const DrawerNavigator = () => (
  <Drawer.Navigator 
    initialRouteName="General"
    screenOptions={{
      headerStyle: { backgroundColor: '#1F1F1F' },
      headerTintColor: '#fff',
      drawerStyle: { backgroundColor: '#121212' },
      drawerActiveTintColor: '#fff',
      drawerInactiveTintColor: '#888',
    }}
  >
    {categories.map((category) => (
      <Drawer.Screen 
        key={category.key} 
        name={category.label} 
        component={Home} 
        initialParams={{ category: category.key }}
      />
    ))}
  </Drawer.Navigator>
);

// Top Tab Navigator with Dark Theme and Icons
export default function App() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Tab.Navigator 
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          tabBarStyle: { backgroundColor: '#1F1F1F' },
          tabBarIndicatorStyle: { backgroundColor: '#fff' },
          tabBarIcon: ({ focused, color }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Zgjedhjet2025') {
              iconName = focused ? 'checkmark-circle' : 'checkmark-circle-outline';
            } else if (route.name === 'About') {
              iconName = focused ? 'information-circle' : 'information-circle-outline';
            }
            return <Ionicons name={iconName} size={24} color={color} />;
          },
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#888',
        })}
      >
        <Tab.Screen name="Home" component={DrawerNavigator} />
        <Tab.Screen name="Zgjedhjet2025" component={Zgjedhjet2025} />
        <Tab.Screen name="About" component={About} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
