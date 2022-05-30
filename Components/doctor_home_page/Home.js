import React from "react";
import { StyleSheet, View } from "react-native";
import Buttons from "./Buttons";
import Header from "./Header";
import Greeting from "./Greeting";

export default function Home() {
  return (
    <View style={styles.body}>
      <Header />
      <Greeting />
      <View>
        <Buttons />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#FFFBE7",
  },
});
