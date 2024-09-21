import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';

export default function Screen_02({ navigation }){
    const [data, setData] = useState([
        {key: '1', type: 'Vegetable', name: 'Apple', price: "28.00", image: require('../assets/Data/Image_101.png'), quantity: 1},
        {key: '2', type: 'Vegetable', name: 'Peach', price: "28.00", image: require('../assets/Data/Image_102.png'), quantity: 1},
        {key: '3', type: 'Vegetable', name: 'Avocado', price: "28.00", image: require('../assets/Data/Image_103.png'), quantity: 1},
        {key: '4', type: 'Vegetable', name: 'Coconut', price: "28.00", image: require('../assets/Data/Image_105.png'), quantity: 1},
        {key: '5', type: 'Vegetable', name: 'Orange', price: "28.00", image: require('../assets/Data/Image_106.png'), quantity: 1},
        {key: '6', type: 'Vegetable', name: 'Pear', price: "28.00", image: require('../assets/Data/Image_107.png'), quantity: 1},
        {key: '7', type: 'Seafood', name: 'Seafood 1', price: "100.00", image: require('../assets/Data/Image_95.png'), quantity: 1},
        {key: '8', type: 'Seafood', name: 'Seafood 2', price: "28.00", image: require('../assets/Data/Image_95.png'), quantity: 1},
        {key: '9', type: 'Seafood', name: 'Seafood 3', price: "28.00", image: require('../assets/Data/Image_95.png'), quantity: 1},
        {key: '10', type: 'Drink', name: 'Drink 1', price: "15.00", image: require('../assets/Data/Image_96.png'), quantity: 1},
        {key: '11', type: 'Drink', name: 'Drink 2', price: "15.00", image: require('../assets/Data/Image_96.png'), quantity: 1},
        {key: '12', type: 'Drink', name: 'Drink 3', price: "15.00", image: require('../assets/Data/Image_96.png'), quantity: 1}
    ]);
    const [type, setType] = useState("Vegetable");
    const [searchQuery, setSearchQuery] = useState('');
    const [initialItemCount, setInitialItemCount] = useState(6);
    const filteredData = data.filter((item) => 
        item.type == type && item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return(
        <ScrollView stickyHeaderIndices={[0]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { navigation.navigate("Screen_01")}}>
                    <Image source={require('../assets/Data/Image_183.png')} style={styles.icon}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate("Screen_03")}}>
                    <Image source={require('../assets/Data/Image_182.png')} style={styles.icon}/>
                </TouchableOpacity>
            </View>
            <View style={styles.searchContainer}>
                <TextInput 
                    style={styles.searchInput}
                    placeholder='Search'
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)}
                />
            </View>
            <View style={styles.categoryContainer}>
                <TouchableOpacity 
                    style={[styles.categoryButton, {backgroundColor: type == 'Vegetable' ? 'green' : 'white'}]}
                    onPress={() => {setType('Vegetable'); setInitialItemCount(6);}}
                >
                    <Text style={styles.categoryText}>Vegetable</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.categoryButton, {backgroundColor: type == 'Seafood' ? 'green' : 'white'}]}
                    onPress={() => {setType('Seafood'); setInitialItemCount(6);}}
                >
                    <Text style={styles.categoryText}>Seafood</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.categoryButton, {backgroundColor: type == 'Drink' ? 'green' : 'white'}]}
                    onPress={() => {setType('Drink'); setInitialItemCount(6);}}
                >
                    <Text style={styles.categoryText}>Drinks</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.orderHeader}>
                <Text style={styles.orderTitle}>Order your favorite</Text>
                <TouchableOpacity onPress={()=> setInitialItemCount(filteredData.length)}>
                    <Text style={styles.seeAllText}>See all</Text>
                </TouchableOpacity>
            </View>
            <FlatList 
                data={(filteredData.slice(0, initialItemCount))}
                renderItem={({item}) => (
                    <View style={styles.itemContainer}>
                        <TouchableOpacity onPress={() => {navigation.navigate("Screen_03")}}>
                            <Image source={item.image} style={styles.itemImage} resizeMode='contain'/>
                        </TouchableOpacity>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemPrice}>${item.price}</Text>
                    </View>
                )}
                numColumns={2}
                keyExtractor={(item) => item.key}
            />
            <StatusBar style='auto'/>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'white',
    },
    icon: {
        width: 25,
        height: 25,
    },
    searchContainer: {
        width: '100%',
        marginTop: 20,
        alignItems: 'center',
    },
    searchInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        width: '90%',
        height: 50,
        paddingLeft: 20,
        fontSize: 20,
    },
    categoryContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        paddingHorizontal: 20,
    },
    categoryButton: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
    categoryText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'blue',
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    orderTitle: {
        fontSize: 25,
        color: 'green'
    },
    seeAllText: {
        fontSize: 20,
        color: 'green',
    },
    itemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '45%',
        marginHorizontal: '3%',
        marginVertical: 10,
        padding: 15,
    },
    itemImage: {
        width: 150,
        height: 150,
    },
    itemName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    itemPrice: {
        fontSize: 20,
        color: 'gray'
    }
});