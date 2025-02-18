import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Favorites = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          const parsedFavorites = JSON.parse(storedFavorites);
          const favoritedArticles = Object.keys(parsedFavorites).filter(url => parsedFavorites[url]);
          setFavorites(favoritedArticles);
        }
      } catch (error) {
        console.error("Error loading favorites:", error);
      }
    };

    loadFavorites();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>❤️ Favorited News</Text>

      {favorites.length === 0 ? (
        <Text style={styles.noFavorites}>No favorite articles yet.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item}
          renderItem={({ item }) => <Text>{item}</Text>}
        />
      )}
    </View>
  );
};

export default Favorites;
