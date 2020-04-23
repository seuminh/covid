import React,{Component} from 'react';
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity } from 'react-native';

import Unorderedlist from 'react-native-unordered-list';

class Symptom extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <Text style={styles.explain}>COVID-19 affects different people in different ways. Most infected people will develop mild to moderate symptoms.</Text>
                <View style={styles.commonSymptoms}>
                    <Text>Common symptoms :</Text>
                    <View style={{flexDirection:'row',marginVertical:5}}>
                        <Unorderedlist bulletUnicode={0x2022} style={styles.point}></Unorderedlist> 
                        <Text style={{fontSize:15}}>Fever</Text>
                    </View>
                    <View style={{flexDirection:'row',marginVertical:5}}>
                        <Unorderedlist bulletUnicode={0x2022} style={styles.point}></Unorderedlist> 
                        <Text style={{fontSize:15}}>Tiredness</Text>
                    </View>
                    <View style={{flexDirection:'row',marginVertical:5}}>
                        <Unorderedlist bulletUnicode={0x2022} style={styles.point}></Unorderedlist> 
                        <Text style={{fontSize:15}}>Dry cough</Text>
                    </View>
                </View>
                <View style={styles.unCommonSymptoms}>
                    <Text>Some people may experience :</Text>
                    <View style={{flexDirection:'row',marginVertical:5}}>
                        <Unorderedlist bulletUnicode={0x2022} style={styles.point}></Unorderedlist> 
                        <Text style={{fontSize:15}}>Aches and pains</Text>
                    </View>
                    <View style={{flexDirection:'row',marginVertical:5}}>
                        <Unorderedlist bulletUnicode={0x2022} style={styles.point}></Unorderedlist> 
                        <Text style={{fontSize:15}}>Nasal congestion</Text>
                    </View>
                    <View style={{flexDirection:'row',marginVertical:5}}>
                        <Unorderedlist bulletUnicode={0x2022} style={styles.point}></Unorderedlist> 
                        <Text style={{fontSize:15}}>Runny nose</Text>
                    </View>
                    <View style={{flexDirection:'row',marginVertical:5}}>
                        <Unorderedlist bulletUnicode={0x2022} style={styles.point}></Unorderedlist> 
                        <Text style={{fontSize:15}}>Sore throat</Text>
                    </View>
                    <View style={{flexDirection:'row',marginVertical:5}}>
                        <Unorderedlist bulletUnicode={0x2022} style={styles.point}></Unorderedlist> 
                        <Text style={{fontSize:15}}>Diarrhoea</Text>
                    </View>
                </View>
                <Text style={{ fontSize:15,marginVertical:5}}>On average it takes 5–6 days from when someone is infected with the virus for symptoms to show, however it can take up to 14 days.</Text>
                <Text style={{ fontSize:15,marginVertical:5}}>People with mild symptoms who are otherwise healthy should self-isolate. Seek medical attention if you have a fever, a cough, and difficulty breathing. Call ahead.</Text>
                <TouchableOpacity>
                    <Text style={styles.button} onPress={()=>this.props.navigation.navigate('NoteSymptom')}>Click Here to note your symptoms</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.button} onPress={()=>this.props.navigation.navigate('ListSymptom')}>Click Here to view all your symptoms</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding:15
  },
  button: {
    textAlign:"center",
    color:'darkslateblue',
    fontSize:15,
    marginVertical:10
  },
  explain: {
      fontSize:15,
      borderBottomColor:'lightgray',
      borderBottomWidth:1,
      paddingBottom:15,
  },
  commonSymptoms: {
      marginVertical:15,
  },
  point: {
      fontSize: 25,
      marginTop: -6,
      paddingLeft:20,
  }
});

export default Symptom;

