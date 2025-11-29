import React from "react";
import { TextInput, TextInputProps } from "react-native-paper";
import { StyleSheet } from "react-native";

const StyledTextInput: React.FC<TextInputProps> = (props) => {
  return (
    <TextInput {...props} mode="outlined" style={[styles.input, props.style]} />
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 15,
  },
});

export default StyledTextInput;
