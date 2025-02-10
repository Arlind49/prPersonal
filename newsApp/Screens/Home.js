import React, { useEffect, useState } from "react";
import { 
  View, Text, FlatList, Image, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity, Linking 
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
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.newsItem,styles.center}
            onPress={() => handleArticlePress(item.url)} // Open article on press
          >
            {item.urlToImage ? (
              <Image source={{ uri: item.urlToImage }} style={styles.image} />
            ) : (
              <Text style={styles.noImage}>[Nuk ka foto te disponueshme]</Text>
            )}
            <Text style={styles.newsTitle}>{item.title}</Text>
            <Text style={styles.srcName}>{item.source.name}</Text>
          </TouchableOpacity>
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
    textAlign: "center",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBar: {
    height: 50,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    textAlign:'center',
    width: '47%',
    marginLeft:470

  },
  newsItem: {
    marginBottom: 20,
  },
  image: {
    
    width: "45%",
    height: 400,
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
  srcName:{
    fontWeight:"italic",
    fontFamily: 'Roboto-Regular' 

  }
});

export default Home;
