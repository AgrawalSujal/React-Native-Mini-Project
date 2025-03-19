import {FlatList, StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';

const AllStocks = ({data}) => {
  const renderItem = ({item}) => (
    <View
      style={[
        styles.item,
        item.Quantity < 20
          ? {backgroundColor: '#ff4d4d'} // Red for low stock
          : {backgroundColor: '#4CAF50'}, // Green for sufficient stock
      ]}>
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.itemText}>{item.Quantity}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Stocks</Text>
        <Text style={styles.headerText}>Qty</Text>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default AllStocks;

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    marginBottom: 10,
  },
  headerText: {
    fontSize: width > 400 ? 18 : 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  listContainer: {
    paddingBottom: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemText: {
    fontSize: width > 400 ? 16 : 14,
    color: '#fff',
    fontWeight: 'bold',
  },
});
