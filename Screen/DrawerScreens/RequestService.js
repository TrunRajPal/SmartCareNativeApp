// Import React and Component
import React from "react";
import firebase from "../../Config/Firebase.js";
import {
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  Button,
  Platform,
  Text,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

class RequestService extends React.Component {
  constructor() {
    super();
    this.state = {
      currentdate: new Date(),
      isTimePickerVisible: false,
      isDatePickerVisible: false,
      date: "",
      time: "",
      requests: [],
      hasAccess: false,
      status: false,
      taken: false,
      requester: "",
      sname: "",
      ratepersession: "",
      instructoremail: "",
      payment: "",
      pdate: "",
      ptime: "",
      requestid: "",
    };
  }

  componentDidMount() {
    this._isMounted = true;

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
            date: dataVal.date,
            time: dataVal.time,
            status: dataVal.status,
            taken: dataVal.taken,
          });
        }
        this.setState({
          requests: newUsersState,
          isTimePickerVisible: false,
          isDatePickerVisible: false,
        });
      });
    });

    this.setState({
      isTimePickerVisible: false,
      isDatePickerVisible: false,
    });

    const ccheck = firebase.database().ref("adminprogrssreport").child(userid);
    ccheck.on("value", (snapshot) => {
      if (snapshot.val()) {
        this.setState({
          hasAccess: "true",
          status: snapshot.val().finalstatus,
        });
      } else {
        this.setState({
          hasAccess: "false",
        });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.setState({
      isTimePickerVisible: false,
      isDatePickerVisible: false,
    });
  }

  ondateChange = (event, value) => {
    if (event.type == "set") {
      const dates = moment(value).format("YYYY-MM-DD");

      console.log("value:", dates);
      this.setState({
        date: dates,
      });

      this.setState({
        isDatePickerVisible: false,
        isTimePickerVisible: true,
      });
    } else {
      return null;
    }
  };

  ontimeChange = (event, value) => {
    if (event.type == "set") {
      const times = moment(value).format("HH:mm");

      console.log("value:", times);

      this.setState({
        time: times,
        isTimePickerVisible: false,
      });

      var checkedNew = this.state.instructoremail.split(".").join("");
      firebase
        .database()
        .ref("sessions/" + checkedNew + this.state.pdate + this.state.ptime)
        .set({
          requestid: this.state.requestid,
          service_name: this.state.sname,
          ratepersession: this.state.ratepersession,
          requester: this.state.requester,
          instructor: this.state.instructoremail,
          date: this.state.pdate,
          time: this.state.ptime,
          status: "Cancelled",
          payment: this.state.payment,
          taken: "no",
        });

      firebase.database().ref("requests").push({
        requester: firebase.auth().currentUser.uid,
        service_name: this.state.sname,
        ratepersession: this.state.ratepersession,
        instructor: this.state.instructoremail,
        date: this.state.date,
        time: times,
        status: "Requested",
        payment: this.state.payment,
      });

      firebase
        .database()
        .ref("requests/" + this.state.requestid)
        .set({
          service_name: this.state.sname,
          ratepersession: this.state.ratepersession,
          instructor: this.state.instructoremail,
          requester: this.state.requester,
          date: this.state.pdate,
          time: this.state.ptime,
          payment: this.state.payment,
          status: "Cancelled",
          taken: "no",
        });

      this.setState({
        isTimePickerVisible: false,
        isDatePickerVisible: false,
      });
    } else {
      return null;
    }
  };

  setdate = (key) => {
    const userRef = firebase.database().ref("requests").child(key);
    userRef.on("value", (snapshot) => {
      const dataVal = snapshot.val();
      this.setState({
        requestid: key,
        requester: dataVal.requester,
        sname: dataVal.service_name,
        instructoremail: dataVal.instructor,
        ratepersession: dataVal.ratepersession,
        date: dataVal.date,
        time: dataVal.time,
        pdate: dataVal.date,
        ptime: dataVal.time,
        payment: dataVal.payment,
        isDatePickerVisible: true,
        isTimePickerVisible: false,
      });
      console.log(this.state);
    });
  };

  render() {
    let customStyles = {
      dateInput: {
        width: 0,
        height: 0,
        borderWidth: 0,
      },
    };

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
                      v.status === "Accepted"
                        ? styles.topicsGreen
                        : styles.topicsYellow
                    }
                  >
                    <View style={{ justifyContent: "center", paddingLeft: 20 }}>
                      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                        {v.servicename}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          marginTop: 10,
                          fontWeight: "bold",
                          color: "#a9a9a9",
                        }}
                      >
                        Session Rate :
                      </Text>
                      <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
                        {v.ratepersession}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "bold",
                          color: "#a9a9a9",
                        }}
                      >
                        Instructor :
                      </Text>
                      <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
                        {v.instructor}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "bold",
                          color: "#a9a9a9",
                        }}
                      >
                        Date :
                      </Text>
                      <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
                        {v.date}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "bold",
                          color: "#a9a9a9",
                        }}
                      >
                        Time :
                      </Text>
                      <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
                        {v.time}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "bold",
                          color: "#a9a9a9",
                        }}
                      >
                        Status :
                      </Text>
                      <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
                        {v.status}
                      </Text>
                      {v.status === "Accepted" && v.taken === "no" ? (
                        <View>
                          <TouchableOpacity
                            style={styles.btn}
                            onPress={() => this.setdate(v.key)}
                          >
                            <Text
                              style={{ color: "white", fontWeight: "bold" }}
                            >
                              Re-Schedual Session
                            </Text>
                          </TouchableOpacity>
                          {this.state.isDatePickerVisible && (
                            <DateTimePicker
                              testID="dateTimePicker"
                              value={this.state.currentdate}
                              mode="date"
                              minimumDate={this.state.currentdate}
                              display="default"
                              onChange={(event, date) =>
                                this.ondateChange(event, date)
                              }
                            />
                          )}

                          {this.state.isTimePickerVisible && (
                            <DateTimePicker
                              testID="dateTimePicker"
                              value={this.state.currentdate}
                              mode="time"
                              is24Hour={false}
                              display="default"
                              onChange={(event, time) =>
                                this.ontimeChange(event, time)
                              }
                            />
                          )}
                        </View>
                      ) : (
                        <View></View>
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
              It Looks Like You Didnt Request Any Service Yet
            </Text>
          </View>
        </View>
      );
    }
  }
}

export default RequestService;

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
  topicsYellow: {
    backgroundColor: "#fff3cd",
    width: "90%",
    height: 350,
    justifyContent: "center",
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
    height: 350,
    justifyContent: "center",
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
  btn: {
    backgroundColor: "#307ecc",
    width: "92%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    padding: 7,
    borderRadius: 20,
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
