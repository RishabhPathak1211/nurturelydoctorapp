import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { FlatList, View, Text, StyleSheet, Button } from "react-native";
import { Card } from "react-native-elements";

const RequestList = (props) => {
  
  const [requests, setRequests] = useState([]);
  
  useEffect(() => {
    (async () => {
      console.log('running');
      const token = await AsyncStorage.getItem('token');
      const res = await axios('https://nurturely.herokuapp.com/api/v1/doctor/patients?type=pending', {
        method: 'GET',
        headers: {
          'x-access-token': token
        }
      });
      console.log(res.data.patientsPen);
      setRequests(res.data.patientsPen);
    })();
  }, []);

  const updateList = async (id, method) => {
      try {
          const token = await AsyncStorage.getItem('token');
          await axios(`https://nurturely.herokuapp.com/api/v1/doctor/patients/${id}?method=${method}`, {
              method: 'put',
              headers: {
                  'x-access-token': token
              } 
          });
          const res = await axios('https://nurturely.herokuapp.com/api/v1/doctor/patients?type=pending', {
              method: 'GET',
              headers: {
                'x-access-token': token
              }
          });
          console.log(res.data.patientsPen);
          setRequests(res.data.patientsPen);
      } catch (err) {
        console.log(err);
      }
  }

  return (
    <Card>
      <Card.Title>{props.title}</Card.Title>
      <Card.Divider />
      <FlatList
        keyExtractor={(item) => item._id}
        data={requests}
        renderItem={({ item }) => (
          <View>
            <Text style={{ fontSize: 25, color: '#000000' }}>{item.name}</Text>
            <Text style={{ fontSize: 15, color: '#000000' }}>{item.email}</Text>
            <Button color="green" title="accept" onPress={async () => await updateList(item._id, 'accept')}></Button>
            <Button color="red" title="reject" onPress={async () => await updateList(item._id, 'reject')}></Button>
          </View>
        )}
      />
    </Card>
  );
};

const styles = StyleSheet.create({});

export default RequestList;
