import React, {useState} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { MaterialCommunityIcons, AntDesign, } from '@expo/vector-icons';

export default function Detail({navigation}) {

    const [item,setItem] = useState(navigation.state.params)

    return (
        <View style={styles.container}>
            <Image style={styles.flag} source={{uri:item.countryInfo.flag}}></Image>
            <View style={styles.detail}>
                <Text style={styles.country}>{item.country}</Text> 
                <View style={styles.eachDetail}>
                    <View style={styles.label}>
                        <Text style={{fontSize:16}}>ចំនួនករណីឆ្លងជំងឺសរុប</Text>
                    </View>
                    <Text style={{color:'darkslateblue'}}>{item.cases}</Text>
                </View>
                <View style={styles.eachDetail}>
                    <View style={styles.label}>
                        <MaterialCommunityIcons style={{color:'green',paddingRight:3}} name='pill' size={20}></MaterialCommunityIcons>
                        <Text style={{fontSize:16}}>ករណីជាសះស្បើយ</Text>
                    </View>
                    <Text style={{paddingLeft:20,color:'green'}}>{item.recovered}</Text>
                </View>
                <View style={styles.eachDetail}>
                    <View style={styles.label}>
                        <MaterialCommunityIcons style={{color:'red',paddingRight:3}} name='skull' size={20}></MaterialCommunityIcons>
                        <Text style={{fontSize:16}}>ករណីអ្នកជំងឺស្លាប់</Text>
                    </View>
                    <Text style={{color:'red'}}>{item.deaths}</Text>
                </View>
                <View style={styles.eachDetail}>
                    <View style={styles.label}>
                        <AntDesign style={{color:'orange',paddingRight:3}} name='warning' size={20}></AntDesign>
                        <Text style={{fontSize:16}}>ករណីអ្នកកំពុងផ្ទុកជំងឺ</Text>
                    </View>
                    <Text style={{color:'orange'}}>{item.active}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingVertical: 40,
  },
  flag: {
        width:250,
        height:150,
        borderWidth:1,
        borderColor:'#aaa'
  },
  detail: {
        marginTop: 40,
        width:'70%'
  },
  country: {
      fontSize:20,
      fontWeight:"bold",
      textAlign:'center',
      marginBottom:15
  },
  eachDetail: {
      flexDirection:'row',
      justifyContent:'space-between',
      paddingVertical:10
  },
  label: {
      flexDirection:'row',
  }
});
