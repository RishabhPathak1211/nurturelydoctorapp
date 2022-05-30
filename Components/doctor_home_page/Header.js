import React from "react";
import { StyleSheet, View, Text } from "react-native";

const Header = (props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Nurturely</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginVertical: 40,
    height: 80,
    backgroundColor: "#40DFEF",
    borderRadius: 5,
  },
  title: {
    zIndex: 1,
    color: "black",
    height: 60,
    fontWeight: "bold",
    fontSize: 10,
    marginHorizontal: 120,
    marginVertical: 20,
  },
});
export default Header;
