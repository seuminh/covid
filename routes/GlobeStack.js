import { createStackNavigator } from 'react-navigation-stack';

import React from 'react';
import Header from '../components/Header';

import Globe from '../screens/Globe/Globe';
import Detail from '../screens/Globe/Detail';

const screens = {
    Globe: {
        screen: Globe,
        navigationOptions: ({navigation})=> {
            return({
                headerTitle:()=><Header title="ពិភពលោក" navigation={navigation}></Header>
            })
        }
    },
    Detail: {
        screen: Detail
    }
}

const GlobeStack = createStackNavigator(screens,{
    defaultNavigationOptions:{
        headerTitleAlign:'center',
        headerStyle:{
            backgroundColor:'darkslateblue',
        },
        headerTintColor:'#fff',
    }
});

export default GlobeStack;