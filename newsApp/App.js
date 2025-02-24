import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Import Screens
import Home from './Screens/Home';  
import Zgjedhjet2025 from './Screens/Zgjedhjet2025';
import About from './Screens/About';

const Tab = createMaterialTopTabNavigator();

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
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Zgjedhjet2025" component={Zgjedhjet2025} />
        <Tab.Screen name="About" component={About} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
