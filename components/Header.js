import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Header({navigation,title}){

    const openDrawer = ()=>{
        navigation.openDrawer()
    }

    const call = ()=>{
        Linking.openURL(`tel:115`)
    }

    return(
        <View style={styles.header}>
            <MaterialIcons onPress={openDrawer} name='menu' size={30} style={styles.iconLeft}></MaterialIcons>
            <Text style={styles.headerText}>{title}</Text>
            <MaterialIcons  onPress={call} name='phone'  size={25} style={styles.iconRight}></MaterialIcons>
        </View>
    )
}
const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
    header: {
        flex:1,
        width:screenWidth,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    headerText: {
        color:'#fff',
        fontSize:17,
        letterSpacing:1,
    },
    iconLeft : {
        color:'#fff',
        position:"absolute",
        left:17
    },
    iconRight: {
        color:'#fff',
        position:"absolute",
        right:17
    }
})