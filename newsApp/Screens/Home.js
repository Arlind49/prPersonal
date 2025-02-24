import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  ImageBackground,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";

const API_KEY = "adb353561a7a472c893a68c27369c998";

// Define the list of categories
const categoriesList = [
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

const Home = ({ route, navigation }) => {
  const initialCategory = route.params?.category || "general";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState({});
  // State for toggling the categories bar visibility
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem("favorites");
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
      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  };

  const fetchNews = async (cat) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&category=${cat}&apiKey=${API_KEY}`
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

  // Fetch news whenever the selected category changes
  useEffect(() => {
    fetchNews(selectedCategory);
  }, [selectedCategory]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text.trim() === "") {
      setFilteredNews(news);
    } else {
      const filtered = news.filter((article) =>
        article.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredNews(filtered);
    }
  };

  const handleArticlePress = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  const renderArticle = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleArticlePress(item.url)}
    >
      <ImageBackground
        source={
          item.urlToImage
            ? { uri: item.urlToImage }
            : require("../assets/download.png")
        }
        style={styles.cardImage}
        imageStyle={{ borderRadius: 8 }}
      >
        <View style={styles.overlay}>
          <Text style={styles.cardTitle} numberOfLines={2}>
            {item.title}
          </Text>
        </View>
      </ImageBackground>
      <View style={styles.cardFooter}>
        <Text style={styles.cardSource}>{item.source.name}</Text>
        <TouchableOpacity onPress={() => toggleFavorite(item.url)}>
          <Text
            style={[
              styles.favoriteIcon,
              favorites[item.url] && styles.favorited,
            ]}
          >
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
    <>
      {/* Inject custom scrollbar styles for web */}
      <style>
        {`
          .darkScrollBar::-webkit-scrollbar {
            width: 12px;
          }
          .darkScrollBar::-webkit-scrollbar-track {
            background: #000;
          }
          .darkScrollBar::-webkit-scrollbar-thumb {
            background-color: #000;
            border-radius: 20px;
          }
          /* For Firefox */
          .darkScrollBar {
            scrollbar-width: thin;
            scrollbar-color: #000 #000;
          }
        `}
      </style>
      <SafeAreaView style={styles.safeArea}>
        {/* Header with title, search bar, and menu toggle */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>A.S News</Text>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search news..."
              placeholderTextColor="#888"
              value={searchQuery}
              onChangeText={handleSearch}
            />
            <TouchableOpacity onPress={() => setShowCategories(!showCategories)}>
              <Ionicons name="menu" size={28} color="#fff" style={styles.menuIcon} />
            </TouchableOpacity>
          </View>
        </View>
        {/* Conditionally render Categories Bar */}
        {showCategories && (
          <View style={styles.categoriesContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {categoriesList.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryButton,
                    selectedCategory === cat && styles.selectedCategoryButton,
                  ]}
                  onPress={() => {
                    setSelectedCategory(cat);
                    // Optionally hide the categories after selection
                    setShowCategories(false);
                  }}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      selectedCategory === cat && styles.selectedCategoryText,
                    ]}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
        {/* News List */}
        <ScrollView style={styles.darkScrollBar} className="darkScrollBar">
          <FlatList
            data={filteredNews}
            keyExtractor={(item, index) => item.url + index.toString()}
            renderItem={renderArticle}
            numColumns={2}
            contentContainerStyle={styles.listContent}
            columnWrapperStyle={styles.columnWrapper}
            ListEmptyComponent={
              <Text style={styles.noResults}>No results found.</Text>
            }
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    padding: 16,
    backgroundColor: "#333",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: "#555",
    borderRadius: 8,
    paddingHorizontal: 10,
    color: "#fff",
  },
  menuIcon: {
    marginLeft: 8,
  },
  categoriesContainer: {
    paddingVertical: 8,
    backgroundColor: "#222",
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#444",
    marginHorizontal: 4,
  },
  selectedCategoryButton: {
    backgroundColor: "#888",
  },
  categoryText: {
    color: "#fff",
  },
  selectedCategoryText: {
    color: "#000",
    fontWeight: "bold",
  },
  darkScrollBar: {
    backgroundColor: "#000",
    flex: 1,
  },
  listContent: {
    padding: 8,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  noResults: {
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: "#222",
    borderRadius: 8,
    overflow: "hidden",
  },
  cardImage: {
    height: 150,
    justifyContent: "flex-end",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 8,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#111",
  },
  cardSource: {
    color: "#ccc",
    fontSize: 14,
  },
  favoriteIcon: {
    color: "#ccc",
    fontSize: 18,
  },
  favorited: {
    color: "red",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
