import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, FlatList, SafeAreaView } from 'react-native';
import { Spinner } from 'native-base';

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Unorderedlist from 'react-native-unordered-list';

import CustomMarker from '../../components/CustomMarker'

class Statistic extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data:null,
            loading:true,
        };
        //Blank array to store the location of each item
        this.arr = [];
    }
    
    componentDidMount(){
        fetch('http://covid19cambodia.herokuapp.com/')
            .then(res=>res.json())
            .then(data=>{
                this.setState({
                    data:data,
                    loading:false,
                })
            })
    }

    downButtonHandler = (key) => {
        // if (this.arr.length >= this.state.dynamicIndex) {
          // To Scroll to the index 5 element
          this.scrollview_ref.scrollTo({
            x: 0,
            y: this.arr[key],
            animated: true,
          });
        // }
    };

    renderNationalities = (data)=>{
        var elements = [];
        for(let i=0;i<data.length;i++){
           elements.push(
               <View style={styles.nationality} key={i}>
                   <Text>{data[i].nationality} ({data[i].cases})</Text>
                   <Text>ជាសះស្បើយ​ ({data[i].recovered})</Text>
               </View>
           )
        }
        return elements;
    }

    convertTime = (time)=>{
        var d =new Date(time);
        return d.toDateString();
    }

    render() {
        if(this.state.loading){
            return(
                <View style={styles.loadingContainer}>
                    <Spinner color='darkslateblue'></Spinner>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                    latitude: 12.5657,
                    longitude: 104.9910,
                    latitudeDelta: 5,
                    longitudeDelta: 5,
                    }}
                >
                    {this.state.data.provinces.map((province,key) => (
                        <Marker
                            coordinate={{
                                latitude:province.lat,
                                longitude:province.lng
                            }}
                            key={province.location}
                            onPress={()=>{
                                this.downButtonHandler(key)
                            }}
                            // onPress={this.indexChange(key)}
                            // title={province.location}
                            // description={`Cases: ${province.cases.toString()}`}
                            // image={require('./assets/marker.png')}
                        >
                            <CustomMarker cases={province.cases}/>
                            <MapView.Callout>
                                <View style={{height: 130, width: 150, paddingVertical:5}}>
                                    <Text style={styles.mapInfoTitle}>{province.location}</Text>
                                    <View style={styles.mapInfoTotal}>
                                         <Text>Total Case</Text>
                                         <Text>{province.cases}</Text>
                                    </View>
                                    <View style={styles.mapInfoContainer}>
                                        <View style={{flexDirection:'row'}}>
                                            <Unorderedlist bulletUnicode={0x2022} color='orange' style={{fontSize: 25,marginTop:-6}}></Unorderedlist> 
                                            <Text>Active</Text>
                                        </View>
                                         <Text style={{color:'orange'}}>{province.cases - province.recovered}</Text>
                                    </View>
                                    <View style={styles.mapInfoContainer}>
                                        <View style={{flexDirection:'row'}}>
                                            <Unorderedlist bulletUnicode={0x2022} color='green' style={{fontSize: 25,marginTop:-6}}></Unorderedlist> 
                                            <Text>Recoverd</Text>
                                        </View>
                                        <Text style={{color:'green'}}>{province.recovered}</Text>
                                    </View>
                                    <View style={styles.mapInfoContainer}>
                                        <View style={{flexDirection:'row'}}>
                                            <Unorderedlist bulletUnicode={0x2022} color='red' style={{fontSize: 25,marginTop:-6}}></Unorderedlist> 
                                            <Text>Death</Text>
                                        </View>
                                        <Text style={{color:'red'}}>{province.deaths}</Text>
                                    </View>
                                </View>
                            </MapView.Callout>
                        </Marker>
                    ))}
                </MapView>
                <View style={styles.title}>
                    <Text style={{fontSize:17,fontWeight:'600'}}>ចំនួនករណីឆ្លងជំងឺកូវីដសរុបនៅក្នុងប្រទេសកម្ពុជា</Text>
                    <Text style={styles.update}>Last Update : {this.convertTime(this.state.data.updated)}</Text>
                </View>
                <ScrollView 
                    style={{
                        marginTop:5
                    }}
                    ref={ref => {
                        this.scrollview_ref = ref;
                    }}>
                        <View style={styles.detailContainer}>       
                            <Text style={styles.detailTitle}>{this.state.data.country}</Text>
                            <View style={styles.detailInfoContainer}>
                                <Text>ចំនួនករណីឆ្លងជំងឺ COVID-19 សរុប</Text>
                                <Text> {this.state.data.cases}</Text>
                            </View>
                            <View style={styles.detailInfoContainer}>
                                <View style={{flexDirection:'row'}}>
                                    <Unorderedlist bulletUnicode={0x2022} color='orange' style={{fontSize: 25,marginTop:-8}}></Unorderedlist> 
                                    <Text>ករណីអ្នកកំពុងផ្ទុកជំងឺ</Text>
                                </View>
                                <Text style={{color:'orange'}}>{this.state.data.active}</Text>
                            </View>
                            <View style={styles.detailInfoContainer}>
                                <View style={{flexDirection:'row'}}>
                                    <Unorderedlist bulletUnicode={0x2022} color='green' style={{fontSize: 25,marginTop:-8}}></Unorderedlist> 
                                    <Text>ករណីជាសះស្បើយ</Text>
                                </View>
                                <Text style={{color:'green'}}>{this.state.data.recovered}</Text>
                            </View>
                            <View style={styles.detailInfoContainer}>
                                <View style={{flexDirection:'row'}}>
                                    <Unorderedlist bulletUnicode={0x2022} color='red' style={{fontSize: 25,marginTop:-8}}></Unorderedlist> 
                                    <Text>ករណីអ្នកជំងឺស្លាប់</Text>
                                </View>
                                <Text style={{color:'red'}}>{this.state.data.deaths}</Text>
                            </View>
                        </View>
                    {
                        this.state.data.provinces.map((item,key)=>(
                            <View 
                                style={styles.detailContainer}
                                key={key}
                                onLayout={event => {
                                    const layout = event.nativeEvent.layout;
                                    this.arr[key] = layout.y;
                                }}
                            >       
                                    <Text style={styles.detailTitle}>{item.location}</Text>
                                    <View style={styles.detailInfoContainer}>
                                        <Text>ចំនួនករណីឆ្លងជំងឺ COVID-19 សរុប</Text>
                                        <Text> {item.cases}</Text>
                                    </View>
                                    <View style={styles.detailInfoContainer}>
                                        <View style={{flexDirection:'row'}}>
                                            <Unorderedlist bulletUnicode={0x2022} color='orange' style={{fontSize: 25,marginTop:-8}}></Unorderedlist> 
                                            <Text>ករណីអ្នកកំពុងផ្ទុកជំងឺ</Text>
                                        </View>
                                        <Text style={{color:'orange'}}>{item.cases-item.recovered}</Text>
                                    </View>
                                    <View style={styles.detailInfoContainer}>
                                        <View style={{flexDirection:'row'}}>
                                            <Unorderedlist bulletUnicode={0x2022} color='green' style={{fontSize: 25,marginTop:-8}}></Unorderedlist> 
                                            <Text>ករណីជាសះស្បើយ</Text>
                                        </View>
                                        <Text style={{color:'green'}}>{item.recovered}</Text>
                                    </View>
                                    <View style={styles.detailInfoContainer}>
                                        <View style={{flexDirection:'row'}}>
                                            <Unorderedlist bulletUnicode={0x2022} color='red' style={{fontSize: 25,marginTop:-8}}></Unorderedlist> 
                                            <Text>ករណីអ្នកជំងឺស្លាប់</Text>
                                        </View>
                                        <Text style={{color:'red'}}>{item.deaths}</Text>
                                    </View>
                                    <View style={styles.moreDetail}>
                                        <Text style={styles.moreDetailTitle}>ពត័មានលំអិត</Text>
                                        {
                                            this.renderNationalities(item.nationalities)
                                        }
                                    </View>
                            </View>
                        ))
                    }
                </ScrollView>
            </View>
        );
    }
}

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#fff'
    },
    title: {
        alignItems:"center",
        marginTop:10
    },
    update: {
        marginTop:5,
        fontSize:13,
        color:'#333'
    },
    loadingContainer: {
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    map: {
        width:width,
        height:height*0.4
    },
    mapInfoTitle: {
        textAlign:"center",
        paddingBottom:5,
    },
    mapInfoContainer: {
        flexDirection:'row',
        justifyContent:'space-between',
        marginVertical:-2
    },
    mapInfoTotal: {
        flexDirection:'row',
        justifyContent:'space-between',
        marginVertical:3,
        paddingBottom:4,
        borderBottomWidth:1,
        borderBottomColor:'lightgray'
    },
    detailContainer: {
        alignSelf:'center',
        marginVertical:20,
        borderWidth:1,
        borderColor:'lightgray',
        paddingVertical:20,
        paddingHorizontal:30,
        width:"80%",
        backgroundColor:"white",
        borderRadius:8,
        elevation:5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
    },
    detailTitle: {
        textAlign:"center",
        fontSize:17,
        marginBottom:5
    },
    detailInfoContainer: {
        flexDirection:'row',
        justifyContent:'space-between',
        marginVertical:3
    },
    nationality: {
        flexDirection:'row',
        justifyContent:'space-around'
    },
    moreDetailTitle: {
        textAlign:"center",
        marginBottom:5,
        fontSize:17
    },
    moreDetail: {
        marginTop:5
    }
})

export default Statistic;

    
    
