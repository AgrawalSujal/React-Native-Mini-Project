import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import AllStocks from './AllStocks';
import FewStock from './FewStock';
import CreateStock from './CreateStock';

const Home = () => {
  const [stocks, setStocks] = useState(0);
  const [data, setData] = useState([
    {id: 1, name: 'Wheat', unit: 'kg', Quantity: 100},
    {id: 2, name: 'Barley', unit: 'kg', Quantity: 20},
    {id: 3, name: 'Rice', unit: 'kg', Quantity: 50},
    {id: 4, name: 'Millet', unit: 'kg', Quantity: 10},
    {id: 5, name: 'Bajri', unit: 'kg', Quantity: 60},
    {id: 6, name: 'Jowar', unit: 'kg', Quantity: 90},
  ]);
  //   const data = [
  //     {id: 1, name: 'Wheat', unit: 'kg', Quantity: 100},
  //     {id: 2, name: 'Barley', unit: 'kg', Quantity: 20},
  //     {id: 3, name: 'Rice', unit: 'kg', Quantity: 50},
  //     {id: 4, name: 'Millet', unit: 'kg', Quantity: 10},
  //     {id: 5, name: 'Bajri', unit: 'kg', Quantity: 60},
  //     {id: 6, name: 'Jowar', unit: 'kg', Quantity: 90},
  //   ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, stocks === 0 && styles.activeButton]}
            onPress={() => setStocks(0)}>
            <Text style={styles.buttonText}>All Stocks</Text>
          </Pressable>

          <Pressable
            style={[styles.button, stocks === 1 && styles.activeButton]}
            onPress={() => setStocks(1)}>
            <Text style={styles.buttonText}>Few Stock</Text>
          </Pressable>

          <Pressable
            style={[styles.button, stocks === 2 && styles.activeButton]}
            onPress={() => setStocks(2)}>
            <Text style={styles.buttonText}>Create Stocks</Text>
          </Pressable>
        </View>

        {/* Render components conditionally */}
        {stocks === 0 && <AllStocks data={data} />}
        {stocks === 1 && (
          <FewStock data={data.filter(item => item.Quantity < 20)} />
        )}
        {stocks === 2 && <CreateStock data={data} setData={setData} />}
      </View>
    </ScrollView>
  );
};

export default Home;

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    marginRight: 16,
    marginLeft: 0,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
    // backgroundColor: 'red',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: width / 3.5,
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
  },
  activeButton: {
    backgroundColor: '#4CAF50',
  },
});
