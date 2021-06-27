// Import React and Component
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import firebase from "../../Config/Firebase.js";
const AddSession = (props) => {
  const [services, setServices] = useState([]);
  const [hasAccess, setHasaccess] = useState("");
  const [status, setStatus] = useState("");
  useEffect(() => {
    const userid = firebase.auth().currentUser.uid;

    const ccheck = firebase.database().ref("adminprogrssreport").child(userid);
    ccheck.on("value", (snapshot) => {
      if (snapshot.val()) {
        setHasaccess("true");
        setStatus(snapshot.val().finalstatus);
      } else {
        setHasaccess("false");
      }
    });
    const userRef = firebase.database().ref("/").child("services");
    userRef.on("value", (snapshot) => {
      let newUsersState = [];
      snapshot.forEach((data) => {
        const dataVal = data.val();
        newUsersState.push({
          key: data.key,
          servicename: dataVal.service_name,
          ratepersession: dataVal.ratepersession,
        });
      });
      setServices(newUsersState);
    });
  }, []);

  const add = (servicename, rate) => {
    const userid = firebase.auth().currentUser.uid;

    firebase.database().ref("requests").push({
      requester: userid,
      service_name: servicename,
      ratepersession: rate,
      instructor: "Requested",
      date: "Requested",
      time: "Requested",
      status: "Requested",
      payment: "Requested",
    });

    alert("Service Requested Successfully");
  };

  if (hasAccess === "true" && status == "Accepted")
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={styles.boxes}>
            {services.map((v, i) => {
              return (
                <View key={i} style={styles.topics}>
                  <View
                    style={{
                      justifyContent: "center",
                      paddingLeft: 20,
                      marginTop: 10,
                    }}
                  >
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                      {v.servicename}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "normal",
                      }}
                    >
                      Session Rate : {v.ratepersession}
                    </Text>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#307ecc",
                        width: "92%",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 20,
                        padding: 7,
                        borderRadius: 20,
                      }}
                      onPress={() => add(v.servicename, v.ratepersession)}
                    >
                      <Text style={{ color: "white", fontWeight: "bold" }}>
                        Request This Service
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  else {
    return (
      <View style={styles.b}>
        <View style={styles.n}>
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              justifyContent: "center",
              fontWeight: "bold",
              display: "flex",
              marginBottom: 16,
            }}
          >
            You Cant request a service untill admin accepts your Profile
          </Text>
        </View>
      </View>
    );
  }
};

export default AddSession;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f4f4f4",
    flex: 1,
  },
  boxes: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  topics: {
    backgroundColor: "white",
    width: "90%",
    height: 125,
    marginBottom: 20,
    borderColor: "black",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
    borderRadius: 10,
  },
  ico: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  n: {
    backgroundColor: "white",
    width: "90%",
    height: 150,
    marginTop: 10,
    marginBottom: 20,
    borderColor: "black",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    justifyContent: "center",
    alignItems: "center",
    elevation: 9,
    borderRadius: 10,
  },
  b: {
    marginTop: "50%",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    alignItems: "center",
  },
});
