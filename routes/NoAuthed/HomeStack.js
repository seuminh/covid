import { createStackNavigator } from 'react-navigation-stack';

import Home from '../../screens/NoAuthed/Home';

import Header from '../../components/Header';
import React from 'react';

const screens = {
    Home: {
        screen:props=><Home {...props} toggleLoginModal={props.screenProps.toggleLoginModal}></Home> ,
        navigationOptions: ({navigation})=> {
            return{
                headerTitle:()=><Header title="ទំព័រដើម" navigation={navigation}></Header>
            }
        }
    },
}

const HomeStack = createStackNavigator(screens,{
    defaultNavigationOptions:{
      headerTitleAlign:'center',
      headerStyle:{
          backgroundColor:'darkslateblue',
      },
      headerTintColor:'#fff',
    }
});

export default HomeStack;