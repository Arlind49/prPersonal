import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Import Screens
import Home from './Screens/Home';  
import Favorites from './Screens/Favorites';  

const Tab = createBottomTabNavigator();
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

// **Drawer Navigator for Categories**
const DrawerNavigator = () => (
  <Drawer.Navigator initialRouteName="General">
    {categories.map((category) => (
      <Drawer.Screen 
        key={category.key} 
        name={category.label} 
        component={Home} 
        initialParams={{ category: category.key }} // Pass category to Home
      />
    ))}
  </Drawer.Navigator>
);

// **Bottom Tab Navigator**
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Favorites') {
              iconName = focused ? 'heart' : 'heart-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'gray',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={DrawerNavigator} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
