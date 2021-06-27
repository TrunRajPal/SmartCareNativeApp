// Import React and Component
import React,{useState,useEffect} from 'react';
import {
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  Text
  } from 'react-native';
  import firebase from '../../Config/Firebase.js'
const EditSession = (props) => {
 
  return (
    <View style={{flex:1}}>
        <Text>Edit Session</Text>

  </View>
  );
};


  export default EditSession;

  
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f4',
    flex: 1,
  },
  boxes:{
      marginTop:10,
      flexDirection:'row',
      justifyContent:'space-around',
      flexWrap:'wrap'
  },
  topics:{
      backgroundColor:'white',
      width:'90%',
      height:125,
      marginBottom:20,
      borderColor:'black',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.32,
      shadowRadius: 5.46,
  
      elevation: 9,
      borderRadius:10
  },
  ico:{
    width:30,
    height:30,
    resizeMode:"contain"
  }
  
  });
  
  