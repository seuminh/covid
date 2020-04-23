import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.aboutText}>This App is ..........</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
       padding:15,
    },
    aboutText: {
        fontSize:16
    }
})

export default About;