import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";

interface LoadingScreenProps {
  message?: string;
}

export default function LoadingScreen({ message }: LoadingScreenProps) {
  const theme = useTheme();

  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <ActivityIndicator animating={true} size="large" />
      {message && (
        <Text
          variant="bodyMedium"
          className="mt-4"
          style={{ color: theme.colors.outline }}
        >
          {message}
        </Text>
      )}
    </SafeAreaView>
  );
}
