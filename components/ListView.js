import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Button, ActivityIndicator, SafeAreaView } from 'react-native';
import {DataContext} from './Context'

export default function ListView({ navigation }) {
    // useContext reads the context and subscribes to its changes
    const {places, setPlaces, region, setRegion} = useContext(DataContext)
    
    // Constructing each item for the FlatList
    const Item = ({ item }) => (
      <View style={styles.item}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.address}>
          <Text style={styles.address}>{item.address}</Text>
          <Text style={styles.city}>{item.postalCode} {item.city}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.type}>Type: {item.type}</Text>
          <Text style={styles.distance}>Distance: {Math.round(item.distance / 100) / 10} km</Text>
        </View>
      </View>
    );

    // Rendering the item
    const renderItem = ({ item }) => (
      <Item 
        item={item}
        title={item.name} />
    );
    
    // Returning the list if the places array does exist and its 
    // lenght is larger then 0, else returning the activity indicator.
    return (
      <SafeAreaView style={styles.container}>
         <Button
            color='#3b3a3a'
            title="Go to Map view"
            onPress={() => navigation.navigate('Map')}
          />
          {places && places.length > 0 ?
            <FlatList
            data={places}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        : <View style={styles.loadingIndicatorContainer}>
            <ActivityIndicator size="large" color="#fff" />
          </View>}
        <StatusBar style="auto" />
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    loadingIndicatorContainer: {
      flex: 1,
      backgroundColor: '#3b3a3a',
      justifyContent: 'center',
      alignItems: 'center'
    },
    item: {
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
          },
      name: {
        fontSize: 28,
        marginBottom: 8,
      },
      info: {
        alignSelf: 'flex-end',
        marginTop: 12
      },
      type: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'right'
      },
      distance: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'right'
      },
  });
  