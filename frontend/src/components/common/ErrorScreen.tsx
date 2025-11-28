import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Button, Icon } from "react-native-paper";

interface ErrorScreenProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorScreen({ message, onRetry }: ErrorScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Icon source="alert-circle-outline" size={64} color="#e74c3c" />
        <Text variant="titleMedium" style={styles.message}>
          {message || "Something went wrong"}
        </Text>
        {onRetry && (
          <Button mode="contained" onPress={onRetry} style={styles.retryButton}>
            Try Again
          </Button>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    padding: 20,
  },
  message: {
    marginTop: 16,
    color: "#666",
    textAlign: "center",
  },
  retryButton: {
    marginTop: 20,
  },
});
