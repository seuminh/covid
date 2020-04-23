import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import {CheckBox, Form, Item, Label, Input, Spinner} from 'native-base'

import {MaterialCommunityIcons} from '@expo/vector-icons'

class NoteSymptom extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username:props.username,
            id:props.id,
            loading:false,
            dizzy:false,
            fever:false,
            dryCough:false,
            runnyNose:false,
            soreThroat:false,
            diarrhoea:false,
            headache:false,
            musclePain:false,
            diffBreath:false,
            other:null,
            isInternetReachable:false,
        };
    }

    componentDidMount(){
        this.checkConnection()
    }

    checkConnection = () =>{
        NetInfo.fetch().then(state1 => {
            this.setState({isInternetReachable:state1.isConnected,loading:false});
        });
    }

    toggleSymptom = (symptom,bool)=>{
        this.setState({
            [symptom]:!bool
        })
    }

    otherSymptomChange = (value)=>{
        this.setState({
            other:value
        })
    }

    saveSymptom = ()=>{
        this.setState({loading:true});
        NetInfo.fetch().then(state1 => {
            if(!state1.isConnected){
                this.setState({isInternetReachable:state1.isConnected,loading:false});
                return;
            }
        });
        const { id,username,dizzy,fever,dryCough,runnyNose,soreThroat,diarrhoea,headache,musclePain,diffBreath,other } = this.state;
        var symptoms = '';
        if(other!=null){
            symptoms+=other+', ';
        }
        if(dizzy){
            symptoms+='Dizzy, '
        }
        if(fever){
            symptoms+='Fever, '
        }
        if(dryCough){
            symptoms+='Dry Cough, '
        }
        if(runnyNose){
            symptoms+='Runny Nose, '
        }
        if(soreThroat){
            symptoms+='Sore Throat, '
        }
        if(diarrhoea){
            symptoms+='Diarrhoea, '
        }
        if(headache){
            symptoms+='Headache, '
        }
        if(musclePain){
            symptoms+='Muscle Pain, '
        }
        if(diffBreath){
            symptoms+='Difficult Breathing, '
        }

        this.setState({
            dizzy:false,
            fever:false,
            dryCough:false,
            runnyNose:false,
            soreThroat:false,
            diarrhoea:false,
            headache:false,
            musclePain:false,
            diffBreath:false,
            other:null,
        })

        if(symptoms.length<=0)
            symptoms='Well, '

        fetch(`https://hello-covidapp.herokuapp.com/userSymptom`,{
            method:'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id:id,
              username:username,
              symptom:symptoms.slice(0,-2),
              phone:this.state.signUpPhone
            })
          })
            .then(res=>res.json())
            .then(data=>{
                // console.log(data);
                this.setState({
                    loading:false,
                })
                this.props.navigation.navigate('ListSymptom')
            })
    }

    render() {
        const { dizzy,fever,dryCough,runnyNose,soreThroat,diarrhoea,headache,musclePain,diffBreath,loading } = this.state;

        if(!this.state.isInternetReachable){
            return(
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{color:'darkslateblue',fontSize:17}}>No data available</Text>
                        <MaterialCommunityIcons name='file-document-outline' style={{fontSize:30,color:'darkslateblue',paddingLeft:5,marginTop:-3}}></MaterialCommunityIcons>
                    </View>
                    <TouchableOpacity onPress={this.checkConnection} style={styles.btnRefresh}>
                        <Text style={{color:'#fff',fontSize:17}}>Refresh</Text>
                    </TouchableOpacity>    
                </View>
            )
        }else{
            if(loading){
                return(
                    <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:'#fff'}}>
                        <Spinner color='darkslateblue'></Spinner>
                    </View>
                )
            }
            return (
                <KeyboardAvoidingView  style={styles.container}  behavior='padding' keyboardVerticalOffset={(Platform.OS==="android")?-500:0}>
                    <ScrollView style={{padding:5}} showsVerticalScrollIndicator={false}>
                        <Text style={{fontSize:17,marginBottom:10,paddingLeft:5}}>How do you feel today?</Text>
                        <TouchableOpacity style={styles.symptom} onPress={()=>this.toggleSymptom('dizzy',dizzy)}>
                            <View style={{paddingVertical:10,flexDirection:'row'}}>
                                <CheckBox checked={dizzy} style={styles.checkbox} color='darkslateblue' onPress={()=>this.toggleSymptom('dizzy',dizzy)}/>
                                <Text style={{fontSize:15}}>Dizzy</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.symptom} onPress={()=>this.toggleSymptom('fever',fever)}>
                            <View style={{paddingVertical:10,flexDirection:'row'}}>
                                <CheckBox checked={fever} style={styles.checkbox} color='darkslateblue' onPress={()=>this.toggleSymptom('fever',fever)}/>
                                <Text style={{fontSize:15}}>Fever</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.symptom} onPress={()=>this.toggleSymptom('dryCough',dryCough)}>
                            <View style={{paddingVertical:10,flexDirection:'row'}}>
                                <CheckBox checked={dryCough} style={styles.checkbox} color='darkslateblue' onPress={()=>this.toggleSymptom('dryCough',dryCough)}/>
                                <Text style={{fontSize:15}}>Dry Cough</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.symptom} onPress={()=>this.toggleSymptom('headache',headache)}>
                            <View style={{paddingVertical:10,flexDirection:'row'}}>
                                <CheckBox checked={headache} style={styles.checkbox} color='darkslateblue' onPress={()=>this.toggleSymptom('headache',headache)}/>
                                <Text style={{fontSize:15}}>Headache</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.symptom} onPress={()=>this.toggleSymptom('runnyNose',runnyNose)}>
                            <View style={{paddingVertical:10,flexDirection:'row'}}>
                                <CheckBox checked={runnyNose} style={styles.checkbox} color='darkslateblue' onPress={()=>this.toggleSymptom('runnyNose',runnyNose)}/>
                                <Text style={{fontSize:15}}>Runny Nose</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.symptom} onPress={()=>this.toggleSymptom('soreThroat',soreThroat)}>
                            <View style={{paddingVertical:10,flexDirection:'row'}}>
                                <CheckBox checked={soreThroat} style={styles.checkbox} color='darkslateblue' onPress={()=>this.toggleSymptom('soreThroat',soreThroat)}/>
                                <Text style={{fontSize:15}}>Sore Throat</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.symptom} onPress={()=>this.toggleSymptom('diarrhoea',diarrhoea)}>
                            <View style={{paddingVertical:10,flexDirection:'row'}}>
                                <CheckBox checked={diarrhoea} style={styles.checkbox} color='darkslateblue' onPress={()=>this.toggleSymptom('diarrhoea',diarrhoea)}/>
                                <Text style={{fontSize:15}}>Diarrhoea</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.symptom} onPress={()=>this.toggleSymptom('musclePain',musclePain)}>
                            <View style={{paddingVertical:10,flexDirection:'row'}}>
                                <CheckBox checked={musclePain} style={styles.checkbox} color='darkslateblue' onPress={()=>this.toggleSymptom('musclePain',musclePain)}/>
                                <Text style={{fontSize:15}}>Muscle Pain</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.symptom} onPress={()=>this.toggleSymptom('diffBreath',diffBreath)}>
                            <View style={{paddingVertical:10,flexDirection:'row'}}>
                                <CheckBox checked={diffBreath} style={styles.checkbox} color='darkslateblue' onPress={()=>this.toggleSymptom('diffBreath',diffBreath)}/>
                                <Text style={{fontSize:15}}>Difficult Breathing</Text>
                            </View>
                        </TouchableOpacity>
                        <Form style={{marginTop:-20}}>
                            <Item floatingLabel>
                                <Label>Other symptom</Label>
                                <Input style={styles.otherInput} onChangeText={this.otherSymptomChange}/>
                            </Item>
                        </Form>
                        {/* <Button title='check' onPress={()=>alert(this.state.other)}></Button> */}
                        <TouchableOpacity style={styles.btnSave} onPress={this.saveSymptom}>
                            <Text style={styles.btnSaveText}>Save</Text>
                        </TouchableOpacity>
                        <View style={{paddingBottom:70}}>
    
                        </View>
    
                    </ScrollView>
                </KeyboardAvoidingView>
            );
        }
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding:15,
  },
  symptom: {
    paddingHorizontal:20,
    paddingVertical:5,
    backgroundColor:"white",
    borderRadius:8,
    elevation:5,
    shadowColor: 'darkslateblue',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    marginVertical:10,
    marginHorizontal:5
  },
  checkbox: {
      marginRight:25
  },
  otherInput: {
    marginTop:10,
    fontSize:17
  },
  btnSave: {
      backgroundColor:'darkslateblue',
      padding:15,
      borderRadius:8,
      marginVertical:15
  },
  btnSaveText: {
      textAlign:"center",
      color:'#fff',
      fontSize:17
  },
  btnRefresh: {
    marginVertical:10,
    backgroundColor: 'darkslateblue',
    padding:15,
  }
});

export default NoteSymptom;

