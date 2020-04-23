import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    
    goDetail=()=>{
        this.props.navigation.navigate('Detail')
    }

    render() {

        return (
            <View style={styles.container}>
                <Text>HomePage</Text>
                {/* <Text>Home Screen with Authed</Text>
                <Button onPress={this.goDetail} title="Go Detail"></Button> */}
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