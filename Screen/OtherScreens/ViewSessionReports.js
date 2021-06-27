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
const ViewSessionReports = (props) => {
  
    const [requester,setRequester] = useState("");
    const [childmotivation,setChildmotivation] = useState("");
    const [guardianmotivation,setGuardianmotivation] = useState("");
    const [finalstatus,setfinalStatus] = useState("");
    const [comments,setComments] = useState("");


    useEffect(()=>{
    
        
        const userRef = firebase.database().ref('sessionreports').child(props.route.params.reportid);
        userRef.on('value', (snapshot) => {
            const dataVal = snapshot.val()
            setRequester(dataVal.requester)
            setChildmotivation(dataVal.childmotivation)
            setGuardianmotivation(dataVal.guardianmotivation)
            setfinalStatus(dataVal.finalstatus)
            setComments(dataVal.comments)
        })


  
    },[])

  return (
    <View style={{flex:1}}>
    <ScrollView>
  <View style={styles.boxes}>
   
        <View style={styles.topics}>
          <View style={{justifyContent:"center",paddingLeft:20,paddingRight:10,marginTop:10}}>
            <Text style={{fontSize:20,fontWeight:"bold"}}>{props.route.params.name}</Text>
            <Text style={{fontSize:16,fontWeight:"bold",paddingLeft:20,marginTop:10}}>Child Motivation :<Text style={styles.normal}> {childmotivation}</Text></Text> 
            <Text style={{fontSize:16,fontWeight:"bold",paddingLeft:20}}>Guardian Motivation :<Text style={styles.normal}>{guardianmotivation}</Text></Text> 
            <Text style={{fontSize:16,fontWeight:"bold",paddingLeft:20}}>Final Status:<Text style={styles.normal}> {finalstatus}</Text></Text> 
            <Text style={{fontSize:16,fontWeight:"bold",paddingLeft:20}}>Comments:<Text style={styles.normal}>{comments}</Text></Text> 

          </View>
        </View>
      
   
  </View>
  </ScrollView>

  </View>
  );
};


  
  export default ViewSessionReports;

  
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
      height:150,
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
  },
  normal:{
    fontWeight:'normal'
  }
  
  });
  
  