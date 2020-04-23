import { createStackNavigator } from 'react-navigation-stack';

import React from 'react';
import Header from '../../components/Header';

import Symptom from '../../screens/NoAuthed/Symptom/Symptom';
import ListSymptom from '../../screens/NoAuthed/Symptom/ListSymptom';

const screens = {
    Symptom: {
        screen: Symptom,
        navigationOptions: ({navigation})=> {
            return({
                headerTitle:()=><Header title="អាការះ" navigation={navigation}></Header>
            })
        }
    },
    ListSymptom: {
        screen: ListSymptom,
        navigationOptions: {
            title:'អាការះ',
        }
    },
}

const SymptomStack = createStackNavigator(screens,{
    defaultNavigationOptions:{
        headerTitleAlign:'center',
        headerStyle:{
            backgroundColor:'darkslateblue',
        },
        headerTintColor:'#fff',
    }
});

export default SymptomStack;