import React, { useEffect, useState } from "react";
import { 
  View, Text, FlatList, Image, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity, Linking 
} from "react-native";
import { FontAwesome } from "@expo/vector-icons"; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_KEY = "adb353561a7a472c893a68c27369c998"; 

const Home = ({ route }) => {
  const { category } = route.params || { category: "general" }; // Get category from navigation params

  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error("Error loading favorites:", error);
      }
    };
    loadFavorites();
  }, []);

  const toggleFavorite = async (articleUrl) => {
    try {
      const updatedFavorites = { 
        ...favorites, 
        [articleUrl]: !favorites[articleUrl] 
      };
      setFavorites(updatedFavorites);
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  };

  const fetchNews = async (selectedCategory) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&category=${selectedCategory}&apiKey=${API_KEY}`
      );
      const data = await response.json();
      
      if (response.ok) {
        setNews(data.articles);
        setFilteredNews(data.articles);
      } else {
        console.error("Error fetching news:", data.message);
      }
    } catch (error) {
      console.error("Network error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(category);
  }, [category]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text === "") {
      setFilteredNews(news);
    } else {
      const filtered = news.filter((article) =>
        article.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredNews(filtered);
    }
  };

  const handleArticlePress = (url) => {
    Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>10-shi News</Text>

      <TextInput 
        style={styles.searchBar}
        placeholder="Kërko Lajmin"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <FlatList
        data={filteredNews}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <View style={styles.newsItem}>
            <TouchableOpacity 
              style={styles.favoriteIcon} 
              onPress={() => toggleFavorite(item.url)}
            >
              <FontAwesome 
                name="heart" 
                size={20} 
                color={favorites[item.url] ? "red" : "gray"}
              />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.newsContent}
              onPress={() => handleArticlePress(item.url)}
            >
              {item.urlToImage ? (
                <Image source={{ uri: item.urlToImage }} style={styles.image} />
              ) : (
                <View>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                <Text style={styles.noImage}>[Nuk ka foto te disponueshme]</Text>
                </View>
              )}
              <View style={styles.textContainer}>
                <Text style={styles.newsTitle}>{item.title}</Text>
                <Text style={styles.srcName}>{item.source.name}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.noResults}>Nuk ka rezultat.</Text>}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  searchBar: {
    height: 50,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    textAlign: 'center',
    width: '80%',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  newsItem: {
    flex: 1,
    marginRight: 10, 
    marginBottom: 15, 
    width: '48%', 
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    padding: 10,
    position: "relative",
  },
  newsContent: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  textContainer: {
    marginTop: 10,
  },
  newsTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  srcName: {
    fontSize: 12,
    fontStyle: "italic",
    color: "gray",
    textAlign: "center",
  },
  noResults: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
    marginTop: 20,
  },
  row: {
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  favoriteIcon: {
    position: "absolute",
    top: 8, 
    right: 8, 
    zIndex: 1,
  },
});

export default Home;
