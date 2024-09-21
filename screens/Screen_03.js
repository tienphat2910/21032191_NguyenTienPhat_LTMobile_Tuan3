import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';

export default function Screen_03({ navigation }) {
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

  const [type, setType] = useState('Vegetable');

  const clearBasket = () => {
    setData([]);
  };

  const calculateTotalByType = (type) => {
    return data
      .filter((item) => item.type === type)
      .reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0)
      .toFixed(2);
  };

  const updateQuantity = (key, delta) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.key === key ? { ...item, quantity: Math.max(item.quantity + delta, 1) } : item
      )
    );
  };

  const removeItem = (key) => {
    setData((prevData) => {
      const newData = prevData.filter((item) => item.key !== key);
      return newData;
    });
  };

  const handlePayment = () => {
    if (data.length === 0) {
      return;
    } else {
      navigation.navigate("Screen_04", {
        data: data,
        type: type,
        total: data.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0).toFixed(2),
      });
    }
  };

  return (
    <ScrollView stickyHeaderIndices={[0]}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate("Screen_02")}>
          <Image source={require('../assets/Data/Image_183.png')} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.title}>My Basket</Text>

        <FlatList
          data={data}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Image source={item.image} style={styles.itemImage} resizeMode='contain' />
              <View style={styles.itemDetails}>
                <Text style={styles.itemPrice}>{item.price}</Text>
                <Text style={styles.itemName}>{item.name}</Text>
                <View style={styles.ratingContainer}>
                  {[...Array(5)].map((_, index) => (
                    <Image
                      key={index}
                      source={require('../assets/Data/Image_180.png')}
                      style={styles.starImage}
                    />
                  ))}
                </View>
              </View>
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => updateQuantity(item.key, -1)}>
                  <Image source={require('../assets/Data/Image_176.png')} style={styles.quantityButton} />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => updateQuantity(item.key, 1)}>
                  <Image source={require('../assets/Data/Image_175.png')} style={styles.quantityButton} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeItem(item.key)}>
                  <Image source={require('../assets/Data/Image_179.png')} style={styles.removeButton} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

        <View style={styles.totalContainer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Grand Total</Text>
            <Text style={styles.totalText}>${data.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0).toFixed(2)}</Text>
          </View>

          <TouchableOpacity style={[styles.button, data.length === 0 && styles.disabledButton]} onPress={handlePayment} disabled={data.length === 0}>
            <Text style={styles.buttonText}>Payment</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clearButton} onPress={clearBasket}>
            <Text style={styles.clearButtonText}>Clear Basket</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 20,
  },
  icon: {
    width: 25,
    height: 25,
    marginBottom: 20,
  },
  title: {
    fontSize: 25,
    color: 'green',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    width: '90%',
    marginVertical: 5,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemImage: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
  },
  itemName: {
    fontSize: 16,
    color: 'silver',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  starImage: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 25,
    height: 25,
    marginHorizontal: 5,
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  removeButton: {
    width: 25,
    height: 25,
    marginLeft: 10,
  },
  totalContainer: {
    width: '90%',
    marginTop: 20,
    alignItems: 'center',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'green',
    borderRadius: 25,
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  clearButton: {
    backgroundColor: 'red',
    borderRadius: 25,
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  clearButtonText: {
    fontSize: 20,
    color: 'white',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
});
