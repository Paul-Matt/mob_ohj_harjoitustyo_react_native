import React, { Component } from 'react';
//import { Text, View, StyleSheet } from 'react-native';
//import LisaaTreeni from './pages/LisaaTreeni';
//import TreeniListaus from './pages/TreeniListaus'
import StackPerus from './Navigation/StackPerus';


export default class App extends Component {
  render() {
    return (
      <StackPerus />
    );
  }
}

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});*/
