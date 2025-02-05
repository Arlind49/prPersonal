import React from "react";
import { StyleSheet, View, Text } from "react-native-web";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from '@react-navigation/elements';


const Favorites = ({ navigation}) => {

    return (
        <View style={styles.container}>  {/* Use `View` instead of `view` */}
            <Text style={styles.title}>
                Welcomte to Your Favorites
            </Text>
            <Text>Ska sen niherrrr</Text>
            {/* <Button title="Preke" onPress={() => navigation.navigate("Products")} /> */}

        </View>
    );
};

const styles = StyleSheet.create({  // Correct the spelling of `StyleSheet`
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
});

export default Favorites;
