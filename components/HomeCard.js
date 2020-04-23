import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Dimensions, Linking, TouchableOpacity } from 'react-native';

export default function HomeCard(props){

    function trimString(str){
        if(str.length<30)
            return str;
        else
            return str.slice(0,30)+'...'
    }

    var text='វិធីការពារខ្លួនអ្នកពី covid';

    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>Linking.openURL(`${props.item.link}`)}>
                <Image resizeMode='cover' style={styles.thumnail} source={{uri:`${props.item.thumbnail}`}}></Image>
                <View style={styles.body}>
                    <Text style={styles.title}>{trimString(props.item.title)}</Text>
                    <Text style={styles.owner}>{props.item.owner}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const styles = StyleSheet.create({
    container: {
        // paddingHorizontal:20,
        // paddingVertical:10,
        backgroundColor:"white",
        // borderRadius:8,
        elevation:5,
        shadowColor: 'darkslateblue',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        marginVertical:10,
        marginHorizontal:5,
    },
    thumnail: {
        width:'100%',
        height:height*0.15,
    },
    body: {
        paddingHorizontal:15,
        paddingVertical:10
    },
    title: {
        fontSize:15,
        fontWeight:'600'
    },
    owner: {
        fontSize:12,
        color:'#888',
        paddingTop:4
    }
})