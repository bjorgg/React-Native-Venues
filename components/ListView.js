import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Button, ActivityIndicator, SafeAreaView } from 'react-native';
import {DataContext} from './Context'

export default function ListView({ navigation }) {
 
    const {places, setPlaces, region, setRegion} = useContext(DataContext)
    
    const Item = ({ item }) => (
      <View style={styles.item}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.address}>
          <Text style={styles.address}>{item.address}</Text>
          <Text style={styles.city}>{item.postalCode} {item.city}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.type}>Type: {item.type}</Text>
          <Text style={styles.distance}>Distance: {Math.round(item.distance * 10) / 10} km</Text>
        </View>
      </View>
    );
    
    const renderItem = ({ item }) => (
      <Item 
        item={item}
        title={item.name} />
    );
  
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
            fontSize: 32,
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
  