import React,{Component} from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import {MaterialCommunityIcons} from '@expo/vector-icons'

import { Spinner } from 'native-base'

class ListSymptom extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            id:props.id,
            loading:true,
            isInternetReachable:true,
            symptoms:[]
        };
    }

    fetchApi = ()=>{
        fetch(`https://hello-covidapp.herokuapp.com/userSymptom?id=${this.state.id}`)
            .then(res=>res.json())
            .then(data=>{
                this.setState({
                    symptoms:data.symptoms,
                    loading:false,
                })
            })
    }

    componentDidMount() {
        this.checkConnection();
    }

    checkConnection = () =>{
        NetInfo.fetch().then(state1 => {
            this.setState({isInternetReachable:state1.isConnected});
            this.fetchApi();
        });
    }

    render() {
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
            if(this.state.loading){
                return(
                    <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:'#fff'}}>
                        <Spinner color='darkslateblue'></Spinner>
                    </View>
                )
            }
            if(this.state.symptoms.length<=0){
                return(
                    <View style={styles.container}>
                        <Text style={{fontSize:15}}>You don't have any symptoms yet..</Text>
                    </View>
                )
            }
            return (
                <View style={styles.container}>
                   <ScrollView style={{padding:3}} showsVerticalScrollIndicator={false}>
                    <Text style={{fontSize:17,marginBottom:10,paddingLeft:5}}>Here is the list of your symptoms</Text>
                        {
                            this.state.symptoms.map((item,key)=>(
                                <View style={styles.symptom} key={key}>
                                    <Text>Date : {item.date}</Text>
                                    <Text style={styles.symptomLabel}>Symptom</Text>
                                    <Text style={{textAlign:"center"}}>{item.symptom}</Text>
                                </View>
                            ))
                        }
                   </ScrollView>
                </View>
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
    paddingVertical:10,
    backgroundColor:"white",
    borderRadius:8,
    elevation:5,
    shadowColor: 'darkslateblue',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    marginVertical:10,
    marginHorizontal:5
  },
  symptomLabel: {
      textAlign:"center",
      color:'darkslateblue',
      marginVertical:10,
      fontSize:15
  },
  btnRefresh: {
    marginVertical:10,
    backgroundColor: 'darkslateblue',
    padding:15,
  }
});

export default ListSymptom;

