import React from 'react';
import { ScrollView, Text, StyleSheet, View, TouchableOpacity, Linking } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const About = () => {
  const openLink = async (url) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error("Dështoi hapja e URL-së:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Rreth A.S News</Text>
      <Text style={styles.content}>
        A.S News është një aplikacion lajmesh që mblidh lajmet më të fundit nga e gjithë bota.
        Projektuar me një temë të errët, ai ofron një përvojë të pastër dhe moderne për përdoruesin – ideale për lexim në ambiente me dritë të ulët.
      </Text>
      <Text style={styles.content}>
        Qëllimi ynë është t’ju mbajmë të informuar me lajme në kohë. Pavarësisht nëse shfletoni tendencat më të fundit apo thelloni në analiza, ne jemi këtu për ju.
      </Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => openLink('https://instagram.com/yourinstagram')}>
          <Ionicons name="logo-instagram" size={32} color="#fff" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink('https://github.com/yourgithub')}>
          <Ionicons name="logo-github" size={32} color="#fff" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink('https://www.linkedin.com/in/arlind-selimi-10101010101010101010/')}>
          <Ionicons name="logo-linkedin" size={32} color="#fff" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.footer}>© 2025 A.S News</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  content: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ddd',
    lineHeight: 26,
    marginBottom: 20,
    textAlign: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  icon: {
    marginHorizontal: 20,
  },
  footer: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#888',
    textAlign: 'center',
    marginTop: 30,
  },
});

export default About;
