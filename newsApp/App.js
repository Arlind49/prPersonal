import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Import Screens
import Home from './Screens/Home';  
import Favorites from './Screens/Favorites';  
import Zgjedhjet2025 from './Screens/Zgjedhjet2025';

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
        initialParams={{ category: category.key }} // Pass category to Home
      />
    ))}
  </Drawer.Navigator>
);

// Bottom Tab Navigator with Dark Theme
export default function App() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Tab.Navigator 
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: { backgroundColor: '#1F1F1F' },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Zgjedhjet2025') {
              iconName = focused ? 'checkmark-circle' : 'checkmark-circle-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#888',
        })}
      >
        <Tab.Screen name="Home" component={DrawerNavigator} />
        <Tab.Screen 
          name="Zgjedhjet2025" 
          component={Zgjedhjet2025} 
          options={{ title: 'Zgjedhjet 2025' }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
