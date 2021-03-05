import 'react-native-gesture-handler';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Map from './components/Map';
import ListView from './components/ListView';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {DataProvider} from './components/Context';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
       <DataProvider>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={ListView} options={{ title: 'List view' }}/>
          <Stack.Screen name="Map" component={Map} options={{ title: 'Map view' }}/>
        </Stack.Navigator>
      </DataProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },

});

