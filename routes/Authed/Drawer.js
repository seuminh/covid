import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

import HomeStack from '../Authed/HomeStack';
import ProfileStack from '../Authed/ProfileStack';
import AboutStack from '../AboutStack';
import StatisticStack from '../StatisticStack';
import GlobeStack from '../GlobeStack';
import SymptomStack from './SymptomStack';

import Sidebar from '../../components/Authed/Sidebar';

import { Feather,Ionicons,MaterialIcons } from '@expo/vector-icons';
import React, { Component } from 'react';


const drawerOptions = {
    HomeStack: {
        screen: HomeStack,
        navigationOptions: {
            title: "ទំព័រដើម",
            drawerIcon:({tintColor})=><Feather name="home" size={16} color={tintColor}></Feather>
        }
    },
    AboutStack: {
        screen: AboutStack,
        navigationOptions: {
            title: "អំពីកម្មវិធី",
            drawerIcon:({tintColor})=><Feather name="info" size={16} color={tintColor}></Feather>
        }
    },
    ProfileStack: {
        screen: ProfileStack,
        navigationOptions: {
            title: "Profile",
            drawerIcon:({tintColor})=><Feather name="user" size={16} color={tintColor}></Feather>
        }
    },
    StatisticStack: {
        screen: StatisticStack,
        navigationOptions: {
            title: "ស្ថិតិ",
            drawerIcon:({tintColor})=><Ionicons name="ios-stats" size={16} color={tintColor}></Ionicons>
        }
    },
    GlobeStack: {
        screen: GlobeStack,
        navigationOptions: {
            title: "ពិភពលោក",
            drawerIcon:({tintColor})=><Ionicons name="md-globe" size={16} color={tintColor}></Ionicons>
        }
    },
    SymptomStack: {
        screen: SymptomStack,
        navigationOptions: {
            title: "អាការះ",
            drawerIcon:({tintColor})=><MaterialIcons name="mood-bad" size={16} color={tintColor}></MaterialIcons>
        }
    },
}

const Drawer = createDrawerNavigator(drawerOptions,{
    contentComponent:props=>{
        return <Sidebar {...props} signOut={()=>props.screenProps.signOut()} username={props.screenProps.username}></Sidebar>
    },
    hideStatusBar:true,
    contentOptions: {
        activeBackgroundColor: 'darkslateblue',
        activeTintColor:'#fff'
    }
});

export default createAppContainer(Drawer);