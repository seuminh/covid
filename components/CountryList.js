import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function CountryList({item,navigation}){

    return(
        <TouchableOpacity style={styles.container} 
            onPress={()=>navigation.navigate('Detail',item)}
            >
           <View style={styles.listItem}>
                <View style={styles.country}>
                    <Image source={{uri:item.countryInfo.flag}} style={{width:20,height:15,borderWidth:1,borderColor:'lightgray',marginTop:2}}></Image>
                    <Text style={styles.countryName}>{item.country}</Text>
                </View>
                <Text style={styles.total}>{item.cases}</Text>
           </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal:15,
        paddingHorizontal:20,
        paddingVertical:5,
        backgroundColor:"white",
        borderRadius:8,
        elevation:5,
        shadowColor: 'darkslateblue',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        marginVertical:5
    },
    listItem: {
        // borderBottomWidth:1,
        // borderColor:'lightgray',
        paddingVertical:15,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    country: {
        flexDirection:'row'
    },
    countryName: {
        marginTop:-2,
        paddingHorizontal:10,
        fontSize:16
    },
    total: {
        color:'darkslateblue'
    }
})