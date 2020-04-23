import { createStackNavigator } from 'react-navigation-stack';

import React from 'react';
import Header from '../../components/Header';

import Symptom from '../../screens/Authed/Symptom/Symptom';
import ListSymptom from '../../screens/Authed/Symptom/ListSymptom';
import NoteSymptom from '../../screens/Authed/Symptom/NoteSymptom';

const screens = {
    Symptom: {
        screen: Symptom,
        navigationOptions: ({navigation})=> {
            return({
                headerTitle:()=><Header title="អាការះ" navigation={navigation}></Header>
            })
        }
    },
    NoteSymptom: {
        screen: props=><NoteSymptom {...props} id={props.screenProps.id} username={props.screenProps.username}></NoteSymptom>,
        navigationOptions: {
            title:'អាការះ',
        }
    },
    ListSymptom: {
        screen: props=><ListSymptom {...props} id={props.screenProps.id}></ListSymptom>,
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