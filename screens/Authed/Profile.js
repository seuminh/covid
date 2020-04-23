import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontSize:17,marginBottom:25}}>This screen is under maintenance</Text>
                <Image source={{uri:'https://cdn.dribbble.com/users/2085072/screenshots/4963880/routine-maintenance-2.gif'}} style={styles.image}></Image>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:"center",
        backgroundColor:'#fff',
        paddingVertical:100
    },
    image: {
        width:300,
        height:300
    }
})

export default Profile;