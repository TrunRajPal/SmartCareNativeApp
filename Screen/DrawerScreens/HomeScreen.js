import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import firebase from "../../Config/Firebase.js";
import { connect } from "react-redux";

const HomeScreen = (props) => {
  const [progressReport, setProgressreport] = useState("");

  useEffect(() => {
    try {
      const userid = props.uid;

      const userRef = firebase.database().ref("students").child(userid);
      userRef.on("value", (snapshot) => {
        const dataVal = snapshot.val();
        setProgressreport(dataVal.progressReport);
      });
    } catch (error) {
      alert("Login Session Expired");
      props.navigation.replace("Auth");
    }
  }, []);
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../../Image/logo3.png")}
          style={{ width: "70%", resizeMode: "contain", margin: 30 }}
        />
        <View style={styles.boxes}>
          <View style={styles.topics}>
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
              {progressReport === "Filled" ? (
                <Text
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Congratulations! Your Profile Is Completed
                </Text>
              ) : (
                <Text
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Your Profile Is Not Completed Please Complete Your Profile In
                  Your Profile Tab
                </Text>
              )}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  uid: state.uid,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

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
    justifyContent: "center",
    alignItems: "center",
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
});
