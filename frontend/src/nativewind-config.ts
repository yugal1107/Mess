import { cssInterop } from "nativewind";
import {
  Button,
  TextInput,
  Text,
  Card,
  Chip,
  ActivityIndicator,
} from "react-native-paper";

// Map className to style for React Native Paper components
cssInterop(Button, { className: "style" });
cssInterop(TextInput, { className: "style" });
cssInterop(Text, { className: "style" });
cssInterop(Card, { className: "style" });
cssInterop(Chip, { className: "style" });
cssInterop(ActivityIndicator, { className: "style" });
