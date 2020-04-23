import { createStackNavigator } from 'react-navigation-stack';

import Statistic from '../screens/Statistics/Statistic';
import React from 'react';
import Header from '../components/Header';

const screens = {
    Statistic: {
        screen: Statistic,
        navigationOptions: ({navigation})=> {
            return({
                headerTitle:()=><Header title="ស្ថិតិ" navigation={navigation}></Header>
            })
        }
    },
}

const StatisticStack = createStackNavigator(screens,{
    defaultNavigationOptions:{
        headerTitleAlign:'center',
        headerStyle:{
            backgroundColor:'darkslateblue',
        },
        headerTintColor:'#fff',
    }
});

export default StatisticStack;