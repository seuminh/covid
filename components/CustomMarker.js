import { Text, View, StyleSheet } from 'react-native';
import React, { Component } from 'react';

class CustomMarker extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            cases:props.cases
        };
    }

    componentDidMount(){
        if(this.state.cases>40){
            this.setState({
                cases:40
            })
        }
    }

    render() {
        const {cases}=this.state;
        return (
            <View style={[styles.circle,{width:(cases<10)?10:cases,height:(cases<10)?10:cases}]}></View>
        );
    }
}

const styles = StyleSheet.create({
    circle: {
        borderRadius: 100/2,
        backgroundColor: '#ff726f',
        opacity:0.5,
        borderWidth:2,
        borderColor:'red'
    }
})

export default CustomMarker;