import { StyleSheet, View } from "react-native";
import { Text, Icon } from "react-native-paper";

interface EmptyStateProps {
  icon?: string;
  message: string;
}

export default function EmptyState({
  icon = "inbox-outline",
  message,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Icon source={icon} size={64} color="#ccc" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  message: {
    marginTop: 16,
    color: "#888",
    fontSize: 16,
    textAlign: "center",
  },
});
