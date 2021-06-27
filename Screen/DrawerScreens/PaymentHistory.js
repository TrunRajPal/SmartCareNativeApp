// Import React and Component
import React from "react";
import {
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import firebase from "../../Config/Firebase.js";
class PaymentHistory extends React.Component {
  constructor() {
    super();
    this.state = {
      requests: [],
    };
  }

  componentDidMount() {
    const userid = firebase.auth().currentUser.uid;

    const userRef = firebase.database().ref("requests");
    userRef.on("value", (snapshot) => {
      let newUsersState = [];
      snapshot.forEach((data) => {
        const dataVal = data.val();
        if (dataVal.requester === userid) {
          newUsersState.push({
            key: data.key,
            servicename: dataVal.service_name,
            ratepersession: dataVal.ratepersession,
            instructor: dataVal.instructor,
            payment: dataVal.payment,
          });
        }
        this.setState({
          requests: newUsersState,
        });
      });
    });
  }

  render() {
    if (this.state.requests.length > 0) {
      return (
        <View style={{ flex: 1 }}>
          <ScrollView>
            <View style={styles.boxes}>
              {this.state.requests.map((v, i) => {
                return (
                  <View
                    key={i}
                    style={
                      v.payment === "Paid"
                        ? styles.topicsGreen
                        : styles.topicsRed
                    }
                  >
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
                          fontSize: 14,
                          fontWeight: "bold",
                          marginTop: 10,
                          color: "#a9a9a9",
                        }}
                      >
                        Session Rate :
                      </Text>
                      <Text style={{ fontWeight: "bold" }}>
                        {v.ratepersession}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "bold",
                          marginTop: 10,
                          color: "#a9a9a9",
                        }}
                      >
                        Instructor :
                      </Text>
                      <Text style={{ fontWeight: "bold" }}>{v.instructor}</Text>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "bold",
                          marginTop: 10,
                          color: "#a9a9a9",
                        }}
                      >
                        Payment:
                      </Text>
                      <Text style={{ fontWeight: "bold" }}>{v.payment}</Text>
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
              It Looks Like You Didnt Have Any Payment Report Yet
            </Text>
          </View>
        </View>
      );
    }
  }
}

export default PaymentHistory;

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
    justifyContent: "center",
    height: 200,
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
  topicsRed: {
    backgroundColor: "#f8d7da",
    width: "90%",
    justifyContent: "center",
    height: 200,
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
  topicsGreen: {
    backgroundColor: "#d4edda",
    width: "90%",
    justifyContent: "center",
    height: 200,
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
