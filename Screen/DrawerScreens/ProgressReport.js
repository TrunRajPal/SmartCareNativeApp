import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import firebase from "../../Config/Firebase.js";

const ProgressReport = (props) => {
  const [name, setName] = useState("");
  const [expectation, setExpectation] = useState("");
  const [childmotivation, setChildmotivation] = useState("");
  const [guardianmotivation, setGuardianmotivation] = useState("");
  const [finalstatus, setfinalStatus] = useState("");
  const [comments, setComments] = useState("");

  const [hasAccess, setHasaccess] = useState("");

  useEffect(() => {
    const userid = firebase.auth().currentUser.uid;
    const userRef = firebase.database().ref("students").child(userid);
    userRef.on("value", (snapshot) => {
      const dataVal = snapshot.val();
      setName(dataVal.name);
    });

    const ccheck = firebase.database().ref("adminprogrssreport").child(userid);
    ccheck.on("value", (snapshot) => {
      if (snapshot.val()) {
        const dataVal = snapshot.val();
        setExpectation(dataVal.expectation);
        setChildmotivation(dataVal.childmotivation);
        setGuardianmotivation(dataVal.guardianmotivation);
        setfinalStatus(dataVal.finalstatus);
        setComments(dataVal.comments);
        setHasaccess(true);
      } else {
        setHasaccess(false);
      }
      console.log(hasAccess);
    });
  }, []);

  return (
    <View>
      <View style={styles.header}></View>
      <Image
        style={styles.avatar}
        source={{ uri: "https://bootdey.com/img/Content/avatar/avatar6.png" }}
      />
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.name}>{name}</Text>
          {hasAccess === true ? (
            <View style={styles.boxes}>
              <View style={styles.topics}>
                <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                  <Text style={styles.heading}>Guardian Expectation :</Text>
                  <Text style={styles.normal}>{expectation}</Text>
                  <Text style={styles.heading}>Child Motivation :</Text>
                  <Text style={styles.normal}>{childmotivation}</Text>
                  <Text style={styles.heading}>Guardian Motivation :</Text>
                  <Text style={styles.normal}>{guardianmotivation}</Text>
                  <Text style={styles.heading}>Final Status :</Text>
                  <Text style={styles.normal}>{finalstatus}</Text>
                  <Text style={styles.heading}>Comments :</Text>
                  <Text style={styles.normal}>{comments}</Text>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.boxes}>
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
                  You Profile Is Not Viewed By Admin Yet
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default ProgressReport;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#307ecc",
    height: 150,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 70,
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600",
  },
  boxes: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  topics: {
    justifyContent: "center",
    backgroundColor: "white",
    width: "100%",
    height: 300,
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

    elevation: 9,
    borderRadius: 10,
  },
  heading: {
    paddingLeft: 10,
    fontSize: 14,
    fontWeight: "bold",
    color: "#a9a9a9",
  },
  normal: {
    fontWeight: "normal",
    fontSize: 18,
    paddingLeft: 10,
    marginBottom: 10,
  },
  n: {
    backgroundColor: "white",
    width: "100%",
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
});
