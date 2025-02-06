import React, { useEffect, useState } from "react";
import { 
  View, Text, FlatList, Image, StyleSheet, TextInput, ActivityIndicator 
} from "react-native";

const API_KEY = "adb353561a7a472c893a68c27369c998"; // Replace with your API Key

const Home = () => {
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
        );
        const data = await response.json();
        
        if (response.ok) {
          setNews(data.articles);
          setFilteredNews(data.articles); // Initialize with full news list
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

  // Function to handle search
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

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top News</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Kërko Lajmin"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <FlatList
        data={filteredNews}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.newsItem}>
            {item.urlToImage ? (
              <Image source={{ uri: item.urlToImage }} style={styles.image} />
            ) : (
              <Text style={styles.noImage}>[Nuk ka foto te disponueshme]</Text>
            )}
            <Text style={styles.newsTitle}>{item.title}</Text>
            <Text>{item.source.name}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.noResults}>Nuk ka rezultat.</Text>}
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
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  newsItem: {
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  noImage: {
    fontSize: 16,
    fontStyle: "italic",
    color: "gray",
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noResults: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
    marginTop: 20,
  },
});

export default Home;
