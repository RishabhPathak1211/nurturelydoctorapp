import React from "react";
import LoginScreen from './Components/LoginScreen';
import Home from './Components/doctor_home_page/Home';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login Screen' }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Home Screen' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
