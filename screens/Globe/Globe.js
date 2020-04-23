import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, TouchableOpacity, ActivityIndicator, ScrollView, SafeAreaView, } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import CountryList from  '../../components/CountryList';

import { Spinner } from 'native-base';

class Globe extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            countries:null,
            filterCountires:null,
            earth:null,
            isLoading:true,
            isInternetReachable:false
        };
    }

    componentDidMount() {
        this.checkConnection();
    }

    handleSearch = (value)=>{
        if(value!=''){
            this.setState({
                filterCountires:this.state.countries.filter(c=>c.country.startsWith(value.charAt(0).toUpperCase() + value.substring(1)))
            })
            return;
        }
        this.setState({filterCountires:this.state.countries});
    }

    fetchApi = ()=>{
        fetch('https://corona.lmao.ninja/v2/countries')
            .then(res=>res.json())
            .then(data=>{
                fetch('https://corona.lmao.ninja/v2/all')
                    .then(res1=>res1.json())
                    .then(data1=>{
                        data1.country='Earth';
                        data1.countryInfo={
                            flag:'https://i.pinimg.com/originals/23/3e/50/233e5045c7a0032c322e3706a81bf192.jpg'
                        };
                        data1.active=data1.cases-data1.recovered;
                        this.setState({
                            countries:data,
                            filterCountires:data,
                            isLoading:false,
                            earth:data1,
                        })
                    })
        })
    }

    checkConnection = () =>{
        NetInfo.fetch().then(state1 => {
            this.setState({isInternetReachable:state1.isConnected});
            this.fetchApi();
            console.log(this.state.isInternetReachable);
        });
    }

    render() {
        const { filterCountires,earth,isLoading,isInternetReachable } = this.state;

        if(!isInternetReachable){
            return(
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'darkslateblue',fontSize:17}}>No Internet Connection</Text>
                    <TouchableOpacity onPress={this.checkConnection} style={styles.btnRefresh}>
                        <Text style={{color:'#fff',fontSize:17}}>Refresh</Text>
                    </TouchableOpacity>    
                </View>
            )
        }else{
            if(isLoading){
                return(
                   <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#fff'}}>
                        <Spinner color='darkslateblue'></Spinner>
                   </View>
                )
            }else{
                return (
                    <SafeAreaView style={styles.container}>
                        <TextInput style={styles.inputText} placeholder='Search for a Country...' onChangeText={this.handleSearch}></TextInput>
                        <View style={styles.label}>
                            <Text style={{fontSize:16}}>ប្រទេស</Text>
                            <Text style={{fontSize:16}}>ចំនួនសរុប</Text>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <CountryList item={earth} navigation={this.props.navigation}></CountryList>
                            {
                                filterCountires.map((item,key)=>(
                                    <CountryList item={item} key={key} navigation={this.props.navigation}></CountryList>
                                ))
                            }
                        </ScrollView>
                    </SafeAreaView>
                );
            }
        }

      
    }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding:10,
    flex:1
  },
  inputText: {
    padding:10,
    paddingHorizontal:20,
    paddingVertical:15,
    borderBottomWidth:1,
    borderColor:'#ccc',
    fontSize:15
  },
  label: {
    marginVertical:20,
    flexDirection:'row',
    paddingHorizontal:20,
    justifyContent:'space-between',
  },
  btnRefresh: {
      marginVertical:10,
      backgroundColor: 'darkslateblue',
      padding:15,
  }
});

export default Globe;