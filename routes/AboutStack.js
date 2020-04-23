import { createStackNavigator } from 'react-navigation-stack';

import About from '../screens/About';
import React from 'react';
import Header from '../components/Header';

const screens = {
    About: {
        screen: About,
        navigationOptions: ({navigation})=> {
            return({
                headerTitle:()=><Header title="អំពីកម្មវិធី" navigation={navigation}></Header>
            })
        }
    },
}

const AboutStack = createStackNavigator(screens,{
    defaultNavigationOptions:{
        headerTitleAlign:'center',
        headerStyle:{
            backgroundColor:'darkslateblue',
        },
        headerTintColor:'#fff',
    }
});

export default AboutStack;