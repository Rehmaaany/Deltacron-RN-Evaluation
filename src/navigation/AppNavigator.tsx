import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home/Home';
import Products from '../screens/Products/Products';
import ProductDetails from '../screens/ProductDetails/ProductDetails';
import Favorites from '../screens/Favorites/Favorites';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Products" component={Products} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="Favorites" component={Favorites} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
