import { createStackNavigator } from 'react-navigation-stack';

import Profile from '../../screens/Authed/Profile'

import Header from '../../components/Header';
import React from 'react';

const screens = {
    Profile:{
        screen:Profile,
        navigationOptions: ({navigation})=> {
            return({
                headerTitle:()=><Header title="Profile" navigation={navigation}></Header>
            })
        }
    }
}

const ProfileStack = createStackNavigator(screens,{
    defaultNavigationOptions:{
        headerTitleAlign:'center',
        headerStyle:{
            backgroundColor:'darkslateblue',
        },
        headerTintColor:'#fff',
    }
});

export default ProfileStack;