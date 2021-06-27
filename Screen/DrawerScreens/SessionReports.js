// Import React and Component
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  Image,
} from "react-native";

import firebase from "../../Config/Firebase.js";

class SessionReports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
      modalVisible: false,
      name: "",
      requester: "",
      childmotivation: "",
      guardianmotivation: "",
      finalstatus: "",
      comments: "",
    };
  }

  edittopic = (e) => {
    console.log(e);
  };

  gotoreport = (e, name) => {
    console.log(e);

    const userRef = firebase.database().ref("sessionreports").child(e);
    userRef.on("value", (snapshot) => {
      const dataVal = snapshot.val();
      this.setState({
        modalVisible: true,
        name: name,
        requester: dataVal.requester,
        childmotivation: dataVal.childmotivation,
        guardianmotivation: dataVal.guardianmotivation,
        finalstatus: dataVal.finalstatus,
        comments: dataVal.comments,
      });
    });
  };

  componentDidMount() {
    const userid = firebase.auth().currentUser.uid;

    const userRef = firebase.database().ref("sessionreports");
    userRef.on("value", (snapshot) => {
      snapshot.forEach((data) => {
        const dataVal = data.val();
        const kkey = data.key;
        if (dataVal.requester === userid) {
          firebase
            .database()
            .ref("sessions")
            .on("value", (snapshot) => {
              let newUsersState = [];
              snapshot.forEach((data) => {
                const dataVal = data.val();
                if (dataVal.requester === userid && dataVal.taken === "yes") {
                  newUsersState.push({
                    key: data.key,
                    servicename: dataVal.service_name,
                    ratepersession: dataVal.ratepersession,
                    instructor: dataVal.instructor,
                    date: dataVal.date,
                    time: dataVal.time,
                    status: dataVal.status,
                    taken: dataVal.taken,
                  });
                }
                this.setState({
                  requests: newUsersState,
                });
              });
            });
        }
      });
    });
  }

  render() {
    if (this.state.requests.length > 0) {
      return (
        <View style={{ flex: 1 }}>
          <ScrollView>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View
                    style={{
                      justifyContent: "center",
                      paddingRight: 10,
                      marginTop: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        textDecorationLine: "underline",
                      }}
                    >
                      {this.state.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                        marginTop: 10,
                        color: "#a9a9a9",
                      }}
                    >
                      Child Motivation :
                    </Text>
                    <Text style={styles.normal}>
                      {this.state.childmotivation}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                        marginTop: 10,
                        color: "#a9a9a9",
                      }}
                    >
                      Guardian Motivation :
                    </Text>
                    <Text style={styles.normal}>
                      {this.state.guardianmotivation}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                        marginTop: 10,
                        color: "#a9a9a9",
                      }}
                    >
                      Final Status:
                    </Text>
                    <Text style={styles.normal}>{this.state.finalstatus}</Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                        marginTop: 10,
                        color: "#a9a9a9",
                      }}
                    >
                      Comments:
                    </Text>
                    <Text style={styles.normal}>{this.state.comments}</Text>
                  </View>

                  <TouchableHighlight
                    style={{
                      ...styles.openButton,
                      backgroundColor: "#ff4500",
                      marginTop: 10,
                    }}
                    onPress={() => {
                      this.setState({
                        modalVisible: !this.state.modalVisible,
                      });
                    }}
                  >
                    <Text style={styles.textStyle}>Close Report</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
            <View style={styles.boxes}>
              {this.state.requests.map((v, i) => {
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
                          marginTop: 10,
                        }}
                      >
                        Date : {v.date}
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "normal",
                        }}
                      >
                        Time : {v.time}
                      </Text>
                      {v.taken === "no" ? (
                        <TouchableOpacity onPress={() => this.edittopic(v.key)}>
                          <Text>Add Session Report</Text>
                        </TouchableOpacity>
                      ) : (
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
                          onPress={() => this.gotoreport(v.key, v.servicename)}
                        >
                          <Text style={{ color: "white", fontWeight: "bold" }}>
                            View Report
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      );
    } else {
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
              It Looks Like You Didnt Have Any Session Report Yet
            </Text>
          </View>
        </View>
      );
    }
  }
}

export default SessionReports;

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
    height: 160,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  normal: {
    fontWeight: "normal",
    fontSize: 18,
  },

  n: {
    backgroundColor: "white",
    width: "90%",
    height: 150,
    padding: 5,
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
