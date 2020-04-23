import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Spinner } from 'native-base'
import NetInfo from '@react-native-community/netinfo';

import {MaterialCommunityIcons} from '@expo/vector-icons'

import HomeCard from '../../components/HomeCard';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data:null,
            loading:true,
            isInternetReachable:false
        };
    }

    componentDidMount(){
        this.checkConnection();
    }

    checkConnection = () =>{
        NetInfo.fetch().then(state1 => {
            this.setState({isInternetReachable:state1.isConnected});
            this.fetchApi();
        });
    }

    fetchApi = ()=>{
        fetch('https://hello-covidapp.herokuapp.com/video')
            .then(res=>res.json())
            .then(data=>{
                this.setState({
                    data:data,
                    loading:false,
                })
            })
    }

    goDetail=()=>{
        this.props.navigation.navigate('Detail')
    }

    render() {
        const {loading,data} = this.state;

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
                    <View style={styles.loadingContainer}>
                        <Spinner color='darkslateblue'></Spinner>
                    </View>
                )
            }
            return (
                <View style={styles.container}> 
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={styles.title}>Video related to Covid 19</Text>
                        <View style={styles.cardContainer}>
                           {
                                data.map((item,key)=>(
                                    <View style={{width:width*0.45}} key={key}>
                                        <HomeCard item={item}></HomeCard>
                                    </View>
                                ))
                           }
                        </View>
                        {/* <Text>Home Screen with Authed</Text>
                        <Button onPress={this.goDetail} title="Go Detail"></Button> */}
                    </ScrollView>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#fff',
        padding:15
    },
    loadingContainer: {
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:'#fff'
    },
    cardContainer: {
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-around'
    },
    title: {
        paddingLeft:5,
        fontSize:17,
        marginBottom:5
    },
    btnRefresh: {
        marginVertical:10,
        backgroundColor: 'darkslateblue',
        padding:15,
    }
})

export default Home;