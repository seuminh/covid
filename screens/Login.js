import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, TextInput, Modal } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import SignUpScreen from '../screens/SignUp'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username:null,
            modalSignUp: false,
        };
    }

    usernameTextChange = (value) =>{
        this.setState({username:value})
    }

    handleLogin =async ()=>{
        // if(this.props.login(this.state.username));
        // else alert('Fail')
        this.props.login(this.state.username)
            .then(res=>{
               if(res==='success');
               else if(res==='not found');
            })
            .catch(err=>{
                alert('Can not Log in')
            })
    }

    toggleSignUpModal = ()=>{
        this.setState({modalSignUp:!this.state.modalSignUp})
    }

    render() {
        const {username,modalSignUp,success} = this.state;

        if(modalSignUp){
            return(
                <Modal animationType="slide" visible={modalSignUp}>
                    <SignUpScreen toggle={this.toggleSignUpModal} login={this.login} signUp1={this.props.signUp}></SignUpScreen>
                </Modal>
            )
        }

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
                <TouchableOpacity onPress={this.handleLogin} style={styles.btnLogin}>
                    <Text style={styles.btnLoginText}>Login</Text>
                </TouchableOpacity>
                <View style={styles.btnSignUpContainer}>
                    <Text style={styles.signUpLabel}>No Account?</Text>
                    <TouchableOpacity onPress={this.toggleSignUpModal} style={styles.btnSignUp}>
                        <Text style={styles.btnSignUpText}>Sign Up Now</Text>
                    </TouchableOpacity>
                </View>
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
        color:'darkslateblue'
    },
    btnLogin: {
        backgroundColor:'darkslateblue',
        padding:13
    },
    btnLoginText: {
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
    btnSignUpContainer: {
        flexDirection:'row',
        justifyContent:'center',
        alignItems:"center",
        paddingTop:200
    },
    btnSignUp: {
        paddingLeft:20
    },
    btnSignUpText: {
        color:'darkslateblue',
        fontWeight:'600',
        fontSize:16,
        textDecorationLine:'underline'
    },
})

export default Login;