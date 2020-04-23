import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, Modal } from 'react-native';

import Login from '../Login'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { modal:false };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Home Screen with No Authed</Text>
                <Button title="Login" onPress={()=>this.props.toggleLoginModal()}></Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})

export default Home;