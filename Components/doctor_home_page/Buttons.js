import React, { useState } from "react";
import { StyleSheet, View, Button } from "react-native";
import PatientList from "./PatientList";
import RequestList from "./RequestList";

const Buttons = () => {
  const [displayParent, setDisplayParent] = useState(true);
  const [displayRequest, setDisplayRequest] = useState(false);
  const displayParentHandler = () => {
    setDisplayParent(true);
    setDisplayRequest(false);
  };
  const displayRequestHandler = () => {
    setDisplayParent(false);
    setDisplayRequest(true);
  };
  return (
    <View>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button
            title="Patient List"
            color="green"
            onPress={displayParentHandler}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Request List"
            color="#ff0000"
            onPress={displayRequestHandler}
          />
        </View>
      </View>
      {displayParent && <PatientList title={"Patient List"} />}
      {displayRequest && <RequestList title={"Request List"} />}
    </View>
  );
};
const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    marginVertical: 50,
    margin: 30,
  },
});
export default Buttons;
