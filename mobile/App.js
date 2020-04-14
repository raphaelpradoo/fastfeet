import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcome}>Welcome to React Native</Text>
    </SafeAreaView>
  );
}
