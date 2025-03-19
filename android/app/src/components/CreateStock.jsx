import React, {useState} from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Alert,
} from 'react-native';

const CreateStock = ({data, setData}) => {
  const [stock, setStock] = useState('');
  const [stockQty, setStockQty] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // ✅ Add New Stock or Update Existing Stock
  const handleSave = () => {
    if (!stock || !stockQty) {
      Alert.alert('Error', 'Both stock name and quantity are required.');
      return;
    }

    const quantity = parseInt(stockQty);

    if (isNaN(quantity) || quantity <= 0) {
      Alert.alert('Error', 'Please enter a valid quantity greater than 0.');
      return;
    }

    if (isEditing) {
      // Update Existing Stock
      const updatedData = data.map(item =>
        item.id === editId ? {...item, name: stock, Quantity: quantity} : item,
      );
      setData(updatedData);
      setIsEditing(false);
      setEditId(null);
    } else {
      // Add New Stock
      const newStock = {
        id: data.length > 0 ? data[data.length - 1].id + 1 : 1,
        name: stock,
        Quantity: quantity,
      };
      setData([...data, newStock]);
    }

    // Reset Fields
    setStock('');
    setStockQty('');
  };

  // ✅ Handle Edit Stock
  const handleEdit = item => {
    setIsEditing(true);
    setStock(item.name);
    setStockQty(item.Quantity.toString());
    setEditId(item.id);
  };

  // ✅ Handle Delete Stock
  const handleDelete = id => {
    setData(data.filter(item => item.id !== id));
  };

  // ✅ Render Stock Items
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

      <View style={styles.actionContainer}>
        <Pressable onPress={() => handleEdit(item)} style={styles.actionButton}>
          <Text style={styles.actionText}>Edit</Text>
        </Pressable>

        <Pressable
          onPress={() => handleDelete(item.id)}
          style={[styles.actionButton, styles.deleteButton]}>
          <Text style={styles.actionText}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isEditing ? 'Edit Stock' : 'Create Stock'}
      </Text>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Stock Name"
          value={stock}
          onChangeText={setStock}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Stock Qty"
          value={stockQty}
          onChangeText={setStockQty}
          keyboardType="numeric"
        />
      </View>

      {/* Add / Edit Button */}
      <Pressable style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>
          {isEditing ? 'Update Stock' : 'Add Stock'}
        </Text>
      </Pressable>

      {/* Stock List */}
      <View style={styles.listContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Stocks</Text>
          <Text style={styles.headerText}>Qty</Text>
        </View>

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.flatList}
        />
      </View>
    </View>
  );
};

export default CreateStock;

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: width > 400 ? 16 : 14,
    color: 'black',
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
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
  flatList: {
    paddingBottom: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  actionContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: '#3498db',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
