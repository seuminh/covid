import { Text, View, StyleSheet, ScrollView, ImageBackground, Image, Button, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import {DrawerItems} from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons'


function Sidebar(props){
    return (
        <ScrollView style={styles.container}>
           <View style={styles.topSidebar}>
                <Text style={styles.topSidebarText}>Login as {props.username}</Text>
           </View>
           <View style={{marginTop:-5}}>
                <DrawerItems {...props}></DrawerItems>
           </View>
           <View style={styles.bottomSidebar}>
                <TouchableOpacity style={styles.btnSignOut} onPress={()=>props.signOut()}>
                    <Text style={styles.btnSignOutText}>SignOut</Text>
                </TouchableOpacity>
           </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
    },
    topSidebar: {
        paddingVertical:40,
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        backgroundColor:'lightgray',
    },
    topSidebarText: {
        color: '#000',
        fontSize:16,
        fontWeight:'500',
        marginTop:10
    },
    bottomSidebar:{
    },
    image: {
        width:100,
        height:100,
        borderRadius:50,
        borderWidth:2,
        borderColor:'darkslateblue'
    },
    btnSignOut: {
        backgroundColor:'red',
        padding:10,
        marginHorizontal:5,
        flex: 1,
    },
    btnSignOutText: {
        textAlign:'center',
        color:'#fff',
        fontSize:16,
    }
})

export default Sidebar;

