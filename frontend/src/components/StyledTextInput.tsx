import React from "react";
import { TextInput, TextInputProps } from "react-native-paper";
import { StyleSheet } from "react-native";

interface StyledTextInputProps extends TextInputProps {
  // Add any custom props here if needed
}

const StyledTextInput: React.FC<StyledTextInputProps> = (props) => {
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
