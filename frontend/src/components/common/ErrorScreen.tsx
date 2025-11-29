import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Button, Icon, useTheme } from "react-native-paper";

interface ErrorScreenProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorScreen({ message, onRetry }: ErrorScreenProps) {
  const theme = useTheme();

  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <View className="items-center p-5">
        <Icon
          source="alert-circle-outline"
          size={64}
          color={theme.colors.error}
        />
        <Text
          variant="titleMedium"
          className="mt-4 text-center"
          style={{ color: theme.colors.outline }}
        >
          {message || "Something went wrong"}
        </Text>
        {onRetry && (
          <Button mode="contained" onPress={onRetry} className="mt-5">
            Try Again
          </Button>
        )}
      </View>
    </SafeAreaView>
  );
}
