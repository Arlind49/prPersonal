import React, { useEffect, useState } from "react";
import { 
  SafeAreaView, View, Text, FlatList, ImageBackground, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity, Linking 
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_KEY = "adb353561a7a472c893a68c27369c998";

const Home = ({ route }) => {
  const { category } = route.params || { category: "general" };
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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
      const updatedFavorites = { ...favorites, [articleUrl]: !favorites[articleUrl] };
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
    if (text.trim() === "") {
      setFilteredNews(news);
    } else {
      const filtered = news.filter(article =>
        article.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredNews(filtered);
    }
  };

  const handleArticlePress = (url) => {
    Linking.openURL(url).catch(err => console.error("Failed to open URL:", err));
  };

  const renderArticle = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleArticlePress(item.url)}>
      <ImageBackground
        source={ item.urlToImage ? { uri: item.urlToImage } : require("../assets/download.png") }
        style={styles.cardImage}
        imageStyle={{ borderRadius: 8 }}
      >
        <View style={styles.overlay}>
          <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
        </View>
      </ImageBackground>
      <View style={styles.cardFooter}>
        <Text style={styles.cardSource}>{item.source.name}</Text>
        <TouchableOpacity onPress={() => toggleFavorite(item.url)}>
          <Text style={[styles.favoriteIcon, favorites[item.url] && styles.favorited]}>
            {favorites[item.url] ? "♥" : "♡"}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>A.S News</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search news..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <FlatList 
        data={filteredNews}
        keyExtractor={(item, index) => item.url + index.toString()}
        renderItem={renderArticle}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        ListEmptyComponent={<Text style={styles.noResults}>No results found.</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    padding: 16,
    backgroundColor: "#1F1F1F",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 8,
  },
  searchInput: {
    height: 40,
    backgroundColor: "#2A2A2A",
    borderRadius: 20,
    paddingHorizontal: 16,
    color: "#fff",
  },
  listContent: {
    padding: 8,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#1E1E1E",
    borderRadius: 8,
    flex: 0.48,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 250,
    justifyContent: "flex-end",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#1E1E1E",
  },
  cardSource: {
    fontSize: 12,
    color: "#aaa",
  },
  favoriteIcon: {
    fontSize: 20,
    color: "#aaa",
  },
  favorited: {
    color: "#e91e63",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noResults: {
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
  },
});

export default Home;
