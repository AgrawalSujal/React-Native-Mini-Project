import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Home from './android/app/src/components/Home';

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>DashBoard</Text>
      <Home />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    margin: 20,
    // padding: 20,
    height: '100%',
    width: '100%',
    gap: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: '500',
    marginTop: 30,
  },
});
