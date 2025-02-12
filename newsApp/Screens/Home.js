import React, { useEffect, useState } from "react";
import { 
  View, Text, FlatList, Image, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity, Linking 
} from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Import FontAwesome for heart icon

const API_KEY = "adb353561a7a472c893a68c27369c998"; // Replace with your API Key

const Home = () => {
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState({}); // Track favorite articles

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
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

    fetchNews();
  }, []);

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

  // Toggle favorite state
  const toggleFavorite = (index) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [index]: !prevFavorites[index], // Toggle the favorite state
    }));
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
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.newsItem}>
            {/* Heart Icon at the Edge */}
            <TouchableOpacity 
              style={styles.favoriteIcon} 
              onPress={() => toggleFavorite(index)} // Toggle heart color on press
            >
              <FontAwesome 
                name="heart" 
                size={20} 
                color={favorites[index] ? "red" : "gray"} // Toggle between red and gray
              />
            </TouchableOpacity>

            {/* News Content */}
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
        numColumns={5} // Display 5 items in each row
        columnWrapperStyle={styles.row} // Add style to the row of items
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
    width: '40%',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  newsItem: {
    flex: 1,
    marginRight: 10, 
    marginBottom: 15, 
    width: '18%', 
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    padding: 10,
    position: "relative", // Needed for absolute positioning of the heart
  },
  newsContent: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },
  textContainer: {
    marginTop: 10,
  },
  newsTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  srcName: {
    fontSize: 12,
    fontStyle: "italic",
    color: "gray",
  },
  noImage: {
    fontSize: 16,
    fontStyle: "italic",
    color: "gray",
  },
  noResults: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
    marginTop: 20,
  },
  row: {
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Distribute space evenly
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
    zIndex: 1, // Ensure it stays above other elements
  },
});

export default Home;
