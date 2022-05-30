import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import axios from "axios";

export default function LoginScreen({ navigation }) {

    const [user, setUser] = useState({});

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '317430959381-e7p26s11f2b7s5hdma6bm2ucpbf0kst8.apps.googleusercontent.com',
            offlineAccess: true,
        })
    }, [])

    const signInHandler = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            if (await GoogleSignin.isSignedIn()) {
                const userInfo = await GoogleSignin.getCurrentUser()
                navigation.navigate('Home', { name: userInfo.user.name });
                return
            }
            const userInfo = await GoogleSignin.signIn();
            setUser(userInfo);
            const res = await axios('https://nurturely.herokuapp.com/api/v1/doctor/authenticate', {
                method: 'post',
                data: { username: userInfo.user.name, email: userInfo.user.email },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(res.data.token);
            await AsyncStorage.setItem('token', res.data.token);
            navigation.navigate('Home', { name: userInfo.user.name });
        } catch (err) {
            console.log('idhar aa gaye bc');
            console.log(err);
            if (err.code === statusCodes.SIGN_IN_CANCELLED)
                console.log(1);
            else if (err.code === statusCodes.IN_PROGRESS)
                console.log(2);
            else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE)
                console.log(3);
        }
    };

    const testLogin = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const res = await axios('https://nurturely.herokuapp.com/api/v1/doctor', {
                method: 'get',
                headers: {
                    'x-access-token': token
                }
            });
            console.log(res.data);
        } catch (e) {
            console.log(e);
        }
    }

    const singOutHandler = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            setUser({});
            await AsyncStorage.removeItem('token');
            console.log('Logged out');
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <GoogleSigninButton 
                style={{ width: 192, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={signInHandler}
            />
            <Button onPress={testLogin} title='Click karke to dekho :)'/>
            <Button onPress={singOutHandler} title='Logout'/>
        </View>
    )
}