import { createStackNavigator } from 'react-navigation-stack';

import Home from '../../screens/Authed/Home';
import Detail from '../../screens/Authed/Detail';

import Header from '../../components/Header';
import React from 'react';


const screens = {
    Home: {
        screen: Home,
        navigationOptions: ({navigation})=> {
            return({
                headerTitle:()=><Header title="ទំព័រដើម" navigation={navigation}></Header>
            })
        }
    },
    Detail: {
        screen: Detail,
    }
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