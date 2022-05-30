import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { Card } from "react-native-elements";

const PatientList = (props) => {
  
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    (async () => {
      console.log('running');
      const token = await AsyncStorage.getItem('token');
      const res = await axios('https://nurturely.herokuapp.com/api/v1/doctor/patients?type=accepted', {
        method: 'GET',
        headers: {
          'x-access-token': token
        }
      });
      console.log(res.data.patientsAcc);
      setPatients(res.data.patientsAcc);
    })();
  }, []);

  return (
    <Card>
      <Card.Title>{props.title}</Card.Title>
      <Card.Divider />
      <FlatList
        keyExtractor={(item) => item._id}
        data={patients}
        renderItem={({ item }) => (
          <View>
            <Text style={{ fontSize: 25, color: '#000000' }}>{item.name}</Text>
            <Text style={{ fontSize: 15, color: '#000000' }}>{item.email}</Text>
          </View>
        )}
      />
    </Card>
  );
};

const styles = StyleSheet.create({});

export default PatientList;
