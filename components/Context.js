// Context provides a way to pass data through the component tree 
// without having to pass props down manually at every level

import React, { useState, useEffect } from "react";
import { FOURSQUARE_CLIENT_ID, FOURSQUARE_CLIENT_SECRET} from '@env';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

// Creating the context object
export const DataContext = React.createContext();

// Here are the values for the context provider
export const DataProvider = ({children}) => {
    // Setting inital region to state
    const [region, setRegion] = useState({
        latitude: 64.9841821,
        longitude: -19.1059013,
        latitudeDelta: 5,
        longitudeDelta: 5
      });
    const [places, setPlaces] = useState([])
    
    // Connecting to the Foursquare API using the react-native-foursquare-api module
    const foursquare = require('react-native-foursquare-api')({
      clientID: FOURSQUARE_CLIENT_ID,
      clientSecret: FOURSQUARE_CLIENT_SECRET,
      style: 'foursquare', // default: 'foursquare'
      version: '20140806' //  default: '20140806'
    });
    
    // The params for the fetch from the API
    // passing in latlng from the region variable
    const params = {
      "ll": `${region.latitude}, ${region.longitude}`,
      "radius": '50000',
      "query": 'coffee, food, drinks',
      'v': '20180323',
      'limit': 50,
      "sortByDistance": 1,
    };

    // Saving the deltas which determent the zoom on the map
    const deltas = {
        latitudeDelta: 0.2,
        longitudeDelta: 0.1
    };

    useEffect(() => {
        // Get users permission and location with expo location and permission modules
        const getLocation = async () => {
            const { status } = await Permissions.askAsync(Permissions.LOCATION);
            if (status !== 'granted') {
                setRegion({
                errorMessage: 'Permission to access location was denied'
                });
            }
        
            const location = await Location.getCurrentPositionAsync({});
            setRegion ({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                ...deltas
            });
            
        }
        getLocation()

    }, [])


    useEffect(() => {
        // Fetching the data from the API and setting the results to places variable
        const getPlaces = async () => {
            const data = await foursquare.venues.explore(params)
            const items = data.response.groups[0].items
            const venues = items.map(item => {
                return {
                name: item.venue.name, 
                id: item.venue.id,
                distance: item.venue.location.distance,
                address: item.venue.location.address,
                postalCode: item.venue.location.postalCode,
                city: item.venue.location.city,
                type: item.venue.categories[0].name,
                coords: {latitude: item.venue.location.lat, 
                longitude: item.venue.location.lng},
                }
            })
            setPlaces(venues)
        }
        getPlaces()
    }, [region]) // When region changes the useEffect will render again

    // The Provider provides the value for this context
    return (
        <DataContext.Provider
        value={{places, setPlaces, region, setRegion}}>
            {children}
        </DataContext.Provider>
    )
}