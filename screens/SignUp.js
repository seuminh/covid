import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, TextInput } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = { 
           username:''
        };
    }

    usernameTextChange = (value) =>{
        this.setState({username:value})
    }

    handleSignUp = async ()=>{
        this.props.signUp1(this.state.username)
            .then(res=>{
                // alert('Sign Up successful')
            })
            .catch(err=>{
                alert('Can not Sign Up')
            })
    }
    

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.btnClose} onPress={()=>this.props.toggle()}>
                    <Ionicons name="ios-close" size={50} style={styles.closeIcon}></Ionicons>
                </TouchableOpacity>
                <View>
                    <View style={styles.usernameContainer}>
                        <Text style={styles.usernameLabel}>Username: </Text>
                        <TextInput onChangeText={this.usernameTextChange} style={styles.usernameInput}></TextInput>
                    </View>
                </View>
                <TouchableOpacity onPress={this.handleSignUp} style={styles.btnSignUp}>
                    <Text style={styles.btnSignUpText}>SignUp</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        padding:50
    },
    closeIcon: {
        textAlign:"center",
        color:'red'
    },
    btnSignUp: {
        backgroundColor:'darkslateblue',
        padding:13
    },
    btnSignUpText: {
        color: '#fff',
        fontSize:17,
        textAlign:"center",
        fontWeight:'600'
    },
    usernameContainer: {
        flexDirection:'row',
        justifyContent:'space-between',
        marginVertical:20
    },
    usernameInput: {
        backgroundColor: 'lightblue',
        width:200,
        padding:15,
        marginTop:-10,
        color:'darkslateblue'
    },
    usernameLabel: {
        fontSize: 17
    },
})

export default SignUp;