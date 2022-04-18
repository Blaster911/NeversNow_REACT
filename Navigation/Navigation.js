import * as React from 'react';
import Map from '../Components/Map'
import Home from '../Home/Home';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

const Nav = createDrawerNavigator({
  Home: {
    screen: Home,
  },
    Map: {
      screen: Map
    },
});

 export default createAppContainer(Nav);
