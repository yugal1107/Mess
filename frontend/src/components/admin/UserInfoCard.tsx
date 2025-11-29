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
    <Card className="mx-4 my-2.5">
      <Card.Title title="User Information" />
      <Card.Content>
        <View className="flex-row justify-between items-center py-2.5">
          <Text className="text-sm" style={{ color: theme.colors.outline }}>
            User ID
          </Text>
          <Text className="text-sm font-medium">{id}</Text>
        </View>
        <View className="flex-row justify-between items-center py-2.5">
          <Text className="text-sm" style={{ color: theme.colors.outline }}>
            Email
          </Text>
          <Text className="text-sm font-medium">{email}</Text>
        </View>
        <View className="flex-row justify-between items-center py-2.5">
          <Text className="text-sm" style={{ color: theme.colors.outline }}>
            Role
          </Text>
          <Text className="text-sm font-medium">{role}</Text>
        </View>
      </Card.Content>
    </Card>
  );
}
