import { View } from "react-native";
import { Text, Card, useTheme } from "react-native-paper";

interface UserInfoCardProps {
  id: string;
  email: string;
  role: string;
}

export default function UserInfoCard({ id, email, role }: UserInfoCardProps) {
  const theme = useTheme();

  return (
    <Card className="mx-4 my-2.5" mode="elevated">
      <Card.Title title="User Information" titleVariant="titleLarge" />
      <Card.Content>
        <View className="flex-row justify-between items-center py-3">
          <Text variant="titleMedium" style={{ color: theme.colors.onSurfaceVariant }}>
            User ID
          </Text>
          <Text variant="bodyLarge" className="font-medium">{id}</Text>
        </View>
        <View className="flex-row justify-between items-center py-3">
          <Text variant="titleMedium" style={{ color: theme.colors.onSurfaceVariant }}>
            Email
          </Text>
          <Text variant="bodyLarge" className="font-medium">{email}</Text>
        </View>
        <View className="flex-row justify-between items-center py-3">
          <Text variant="titleMedium" style={{ color: theme.colors.onSurfaceVariant }}>
            Role
          </Text>
          <Text variant="bodyLarge" className="font-medium">{role}</Text>
        </View>
      </Card.Content>
    </Card>
  );
}
