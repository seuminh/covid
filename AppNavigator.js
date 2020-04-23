import React,{Component} from 'react';
import { AsyncStorage,StyleSheet, Text, View, Button, Modal, ActivityIndicator, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';

import AuthDrawer from './routes/Authed/Drawer';
import NoAuthDrawer from './routes/NoAuthed/Drawer';

import { Ionicons } from '@expo/vector-icons';

import {Form, Item, Input, Label, Spinner} from 'native-base';

class AppNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        modalLogin:false,
        isAuthed:false,
        username:null,
        id:null,
        loading:false,
        loadingSignup:false,
        modalSignUp:false,
        loginPhone:'',
        loginPassword:'',
        loginSuccess:true,
        signUpSuccess:true,
        signUpUsername:'',
        signUpPassword:'',
        signUpPhone:'',
        signUpUsernameError:false,
        signUpPasswordError:false,
        signUpPhoneError:false,
        duplicate:false
    };
    this.readStorage();
  }

  saveStorage = ()=>{
     var userObj = {
       username: this.state.username,
       id:this.state.id,
     }
     AsyncStorage.setItem('userObj',JSON.stringify(userObj));
  }

  readStorage = ()=>{
    AsyncStorage.getItem('userObj',(err,res)=>{
      if(err)
        console.log(err);
      else{
        if(res!=null){
          var obj = JSON.parse(res);
          this.setState({
            username:obj.username,
            id:obj.id,
            isAuthed:true
          })
        }else{
          this.setState({
            isAuthed:false
          })
        }
      }
    })
  }

  clearStorage = ()=>{
    AsyncStorage.removeItem('userObj')
  }

  toggleLoginModal = () =>{
    this.setState({
      modalLogin:!this.state.modalLogin,
      loginPhone:'',
      loginPassword:'',
      loginSuccess:true,
    })
  }

  toggleSignUpModal = () =>{
    this.setState({
      modalSignUp:!this.state.modalSignUp,
      signUpSuccess:true,
      duplicate:false,
      signUpUsername:'',
      signUpPassword:'',
      signUpPhone:'',
      signUpUsernameError:false,
      signUpPasswordError:false,
      signUpPhoneError:false
    })
  }

  phoneLoginChange = (value) =>{
    this.setState({loginPhone:value})
  }

  passwordLoginChange = (value) =>{
    this.setState({loginPassword:value})
  }

  usernameSignUpChange = (value) =>{
    let rjx = /^[a-zA-z0-9]+$/;
    let isValid = rjx.test(value);
    if(isValid){
      this.setState({signUpUsername:value,signUpUsernameError:false})
    }else{
      this.setState({signUpUsernameError:true})
    }
  }

  passwordSignUpChange = (value) =>{
    if(value.length<8){
      this.setState({signUpPasswordError:true})
    }else{
      this.setState({signUpPassword:value,signUpPasswordError:false})
    }
  }

  phoneSignUpChange = (value) =>{
    let rjx = /^[0-9]+$/;
    let isValid = rjx.test(value);
    if(isValid){
      this.setState({signUpPhone:value,signUpPhoneError:false})
    }else{
      this.setState({signUpPhoneError:true})
    }
  }

  signOut = () => {
     this.setState({
       isAuthed:false,
       username:null,
       id:null
     })
     this.clearStorage();
  }
  
  signUp = () => {
    const {signUpPasswordError,signUpPhoneError,signUpUsernameError,signUpUsername,signUpPassword,signUpPhone}= this.state;
    if(signUpPasswordError||signUpPhoneError||signUpUsernameError){
      this.setState({signUpSuccess:false})
    }else if(signUpUsername===null||signUpPhone===null||signUpPassword===null||signUpUsername===''||signUpPassword===''||signUpPhone===''){
      alert('Enter All blank information')
    }
    else{
      // this.setState({loadingSignup:true})
      fetch('https://hello-covidapp.herokuapp.com/signup',{
        method:'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username:this.state.signUpUsername,
          password:this.state.signUpPassword,
          phone:this.state.signUpPhone
        })
      })
      .then(res=>res.json())
      .then(data=>{
        if(data!=='duplicate'){
          this.setState({
            username:data.username,
            modalSignUp:false,
            modalLogin:false,
            // loading:false,
            signUpSuccess:true,
            loginPhone:this.state.signUpPhone,
            loginPassword:this.state.signUpPassword,
            signUpUsernameError:false,
            signUpPhoneError:false,
            signUpPasswordError:false,
            // loadingSignup:false
          })
          this.login();
        }else{
          this.setState({
            duplicate:true
          })
        }
      })
      .catch(err=>{
        this.setState({
          // modalSignUp:true,
          // loadingSignup:false,
          signUpSuccess:false,
        })
      })
    }
  }

  

  login = () => {
    this.setState({loading:true});
    fetch(`https://hello-covidapp.herokuapp.com/login?phone=${this.state.loginPhone}&password=${this.state.loginPassword}`)
      .then(res=>res.json())
      .then(data=>{
        if(data.phone===this.state.loginPhone){
          this.setState({
            loading:false,
            modalLogin:false,
            modalSignUp:false,
            isAuthed:true,
            username:data.username,
            id:data._id,
            loginSuccess:true
          })
          this.saveStorage();
        }
        else{
          this.setState({
            loading:false,
            modalLogin:true,
            modalSignUp:false,
            isAuthed:false,
            loginSuccess:false
          })
        }
      })
      .catch(err=>{
        this.setState({
          loading:false,
          loginSuccess:false
        });
      })
  }

  renderLogin() {
    const { modalSignUp,loginSuccess } = this.state;
    if(modalSignUp){
      return(
        <Modal animationType="slide" visible={modalSignUp}>
            {this.renderSignUp()}
        </Modal>
      )
    }
    return(
      <KeyboardAvoidingView style={styles.containerLogin} behavior='padding' keyboardVerticalOffset={(Platform.OS==="android")?-500:0}>
          <TouchableOpacity style={styles.btnClose} onPress={this.toggleLoginModal}>
              <Ionicons name="ios-close" size={50} style={styles.closeIcon}></Ionicons>
          </TouchableOpacity>
          <Form style={styles.formLoginContainer}>
            <Item floatingLabel>
                <Label>Phone Number</Label>
                <Input style={styles.phoneInput} keyboardType='numeric' onChangeText={this.phoneLoginChange}/>
            </Item>
            {/* <Item floatingLabel>
                <Label>Username</Label>
                <Input style={styles.phoneInput} onChangeText={this.usernameLoginChange}/>
            </Item> */}
            <Item floatingLabel>
                <Label>Password</Label>
                <Input style={styles.passwordInput} secureTextEntry={true} onChangeText={this.passwordLoginChange}/>
            </Item>
            {!loginSuccess&&<Text style={styles.loginFail}>No user found</Text>}
            <TouchableOpacity onPress={this.login} style={styles.btnLogin}>
              <Text style={styles.btnLoginText}>Login</Text>
            </TouchableOpacity>
          </Form>
          <View style={styles.btnSignUpContainer}>
              <Text style={styles.signUpLabel}>No Account?</Text>
              <TouchableOpacity onPress={this.toggleSignUpModal} style={styles.btnSignUpNow}>
                  <Text style={styles.btnSignUpTextNow}>Sign Up Now</Text>
              </TouchableOpacity>
          </View>
      </KeyboardAvoidingView>
    )
  }

  renderSignUp() {
    const { signUpSuccess,signUpUsernameError,signUpPhoneError,signUpPasswordError,duplicate } = this.state;

    if(this.state.loadingSignup){
      return(
        <View style={styles.container}>
          <Spinner color='darkslateblue'></Spinner>
        </View>
      )
    }

    return(
      <KeyboardAvoidingView style={styles.containerSignUp} behavior='padding' keyboardVerticalOffset={(Platform.OS==="android")?-500:0}>
          <TouchableOpacity style={styles.btnClose} onPress={this.toggleSignUpModal}>
              <Ionicons name="ios-close" size={50} style={styles.closeIcon}></Ionicons>
          </TouchableOpacity>
          <Form style={styles.formLoginContainer}>
            <Item floatingLabel>
                <Label>Username</Label>
                <Input style={styles.phoneInput} onChangeText={this.usernameSignUpChange}/>
            </Item>
            {signUpUsernameError&& <Text style={styles.error}>username must contain only letter and number</Text>}
            <Item floatingLabel>
                <Label>Phone Number</Label>
                <Input style={styles.phoneInput} keyboardType='numeric'  onChangeText={this.phoneSignUpChange}/>
            </Item>
            {signUpPhoneError&&<Text style={styles.error}>Phone Number must contain only number</Text>}
            <Item floatingLabel>
                <Label>Password</Label>
                <Input style={styles.passwordInput} secureTextEntry={true} onChangeText={this.passwordSignUpChange}/>
            </Item>
            {signUpPasswordError&& <Text style={styles.error}>Password must be at least 8 letter</Text>}
            <View>
                {!signUpSuccess && <Text style={styles.signUpFail}>Can not Sign Up</Text>}
            </View>
            <View>
                {duplicate && <Text style={styles.signUpFail}>Account already created</Text>}
            </View>
            <TouchableOpacity onPress={this.signUp} style={styles.btnSignUp}>
              <Text style={styles.btnSignUpText}>SignUp</Text>
            </TouchableOpacity>
          </Form>
      </KeyboardAvoidingView>
    )
  }


  render() {
    const { modalLogin,isAuthed,username,loading,id } = this.state;

    if(loading){
      return(
        <View style={styles.container}>
          <Spinner color='darkslateblue'></Spinner>
        </View>
      )
    }else{
      if(modalLogin&&!isAuthed){
        return(
          <Modal animationType="slide" visible={modalLogin}>
              {this.renderLogin()}
          </Modal>
        )
      }
      if(isAuthed){
        return <AuthDrawer screenProps={{username:username,id:id,signOut:this.signOut}}></AuthDrawer>
      }else{
        return <NoAuthDrawer screenProps={{toggleLoginModal:this.toggleLoginModal}}></NoAuthDrawer>
      }
    }
  }
}

export default AppNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    textAlign:"center",
    color:'red',
    marginTop:3,
    paddingLeft:5
  },
  containerLogin:{
    flex:1,
    backgroundColor:'#fff',
    padding:50
  },
  formLoginContainer:{
    marginVertical:20,
    flex:2
  },
  closeIcon: {
      textAlign:"center",
      color:'darkslateblue'
  },
  btnClose: {
      // flex:1
  },
  btnLogin: {
      backgroundColor:'darkslateblue',
      padding:13,
      marginVertical:20,
      width:300,
      alignSelf:'center'
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
     marginTop:15,
     fontSize:17
  },
  passwordInput: {
     marginTop:15,
     fontSize:17
  },
  phoneInput: {
    marginTop:15,
    fontSize:17
  },
  usernameLabel: {
      fontSize: 17,
  },
  formSignUpContainer: {

  },
  btnSignUp: {
    backgroundColor:'darkslateblue',
    padding:13,
    marginVertical:20,
    width:300,
    alignSelf:'center'
  },
  signUpLabel: {
      fontSize:16
  },
  btnSignUpContainer: {
      flexDirection:'row',
      justifyContent:'center',
      alignItems:"center",
      marginVertical:15
  },
  btnSignUpNow: {
      paddingLeft:20
  },
  btnSignUpTextNow: {
      color:'darkslateblue',
      fontWeight:'600',
      fontSize:16,
      textDecorationLine:'underline'
  },
  containerSignUp:{
    flex:1,
    backgroundColor:'#fff',
    padding:50
  },
  btnSignUpText: {
      color: '#fff',
      fontSize:17,
      textAlign:"center",
      fontWeight:'600'
  },
  loginFail: {
    color:'red',
    fontSize:16,
    textAlign:"center",
    marginTop:10
  },
  signUpFail: {
    color:'red',
    fontSize:16,
    textAlign:"center",
    marginTop:10
  }
});
