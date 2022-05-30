import axios from "axios";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Greeting = () => {

  const [username, setUserName] = useState('');

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('token');
      const res = await axios('https://nurturely.herokuapp.com/api/v1/doctor/', {
        method: 'get',
        headers: {
          'x-access-token': token
        }
      });
      setUserName(res.data.username);
    })();
  }, []);

  // var message = "";
  // let time = new Date().getHours();
  // if (time < 12) message = "Morning";
  // else if (time < 18) message = "Afternoon";
  // else message = "Evening";

  return (
      <View>
        <Text style={styles.text}>Welcome, Dr. {username} </Text>
      </View>
    );
  };

const styles = StyleSheet.create({
  text: {
    padding: 16,
    marginTop: 11,
    borderColor: "#FFFBE7",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 25,
    backgroundColor: "#B9F8D3",
  },
});

export default Greeting;
