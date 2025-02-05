import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, Button } from "react-native"; // Removed incorrect import
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Home = ({ navigation }) => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        // Fetch data from the Fake News API
        fetch('https://fakenews.squirro.com/news/sport')
            .then((response) => response.json())
            .then((data) => setNews(data))
            .catch((error) => console.error('Error fetching news:', error));
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome</Text>
            <Text>This is a sports news app</Text>

            <FlatList
                data={news}
                keyExtractor={(item, index) => index.toString()} // Use index if `id` is missing
                renderItem={({ item }) => (
                    <View style={styles.newsItem}>
                        <Text style={styles.newsTitle}>{item.title}</Text>
                        <Button title="Read More" onPress={() => alert(`Opening: ${item.title}`)} />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 80,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: "center",
    },
    newsItem: {
        padding: 15,
        marginVertical: 8,
        backgroundColor: "#f0f0f0",
        borderRadius: 5,
    },
    newsTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default Home;
