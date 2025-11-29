import { View } from "react-native";
import { Text, Icon, useTheme } from "react-native-paper";

interface EmptyStateProps {
  icon?: string;
  message: string;
}

export default function EmptyState({
  icon = "inbox-outline",
  message,
}: EmptyStateProps) {
  const theme = useTheme();

  return (
    <View className="flex-1 justify-center items-center pt-24">
      <Icon source={icon} size={64} color={theme.colors.outline} />
      <Text
        className="mt-4 text-base text-center"
        style={{ color: theme.colors.outline }}
      >
        {message}
      </Text>
    </View>
  );
}
