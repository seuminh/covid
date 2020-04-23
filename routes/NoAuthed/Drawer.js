import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

import HomeStack from '../NoAuthed/HomeStack';
import AboutStack from '../AboutStack';
import StatisticStack from '../StatisticStack';
import GlobeStack from '../GlobeStack';
import SymptomStack from './SymptomStack';

import Sidebar from '../../components/NoAuthed/Sidebar'

import React, { Component } from 'react';
import { Feather,Ionicons,MaterialIcons } from '@expo/vector-icons';

const drawerOptions = {
    HomeStack: {
        screen: HomeStack,
        navigationOptions: {
            title: "ទំព័រដើម",
            drawerIcon:({tintColor})=><Feather name="home" size={16} color={tintColor}></Feather>
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
    AboutStack: {
        screen: AboutStack,
        navigationOptions: {
            title: "អំពីកម្មវិធី",
            drawerIcon:({tintColor})=><Feather name="info" size={16} color={tintColor}></Feather>
        }
    },
}


const Drawer = createDrawerNavigator(drawerOptions,{
    contentComponent:props=>{
        return <Sidebar {...props} toggleLoginModal={()=>props.screenProps.toggleLoginModal()}></Sidebar>
    },
    hideStatusBar:true,
    contentOptions: {
        activeBackgroundColor: 'darkslateblue',
        activeTintColor:'#fff'
    }
});

export default createAppContainer(Drawer);