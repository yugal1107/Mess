import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Text } from "react-native-paper";

interface LoadingScreenProps {
  message?: string;
}

export default function LoadingScreen({ message }: LoadingScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator animating={true} size="large" />
      {message && (
        <Text variant="bodyMedium" style={styles.message}>
          {message}
        </Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    marginTop: 16,
    color: "#666",
  },
});
