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
    <View style={{ marginHorizontal: 4, marginVertical: 4 }}>
      <Card mode="elevated">
        <Card.Title title="User Information" titleVariant="titleMedium" />
        <Card.Content style={{ paddingTop: 0 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 8,
            }}
          >
            <Text
              variant="bodyMedium"
              style={{ color: theme.colors.onSurfaceVariant }}
            >
              User ID
            </Text>
            <Text
              variant="bodyMedium"
              style={{ fontWeight: "500", color: theme.colors.onSurface }}
            >
              {id}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 8,
            }}
          >
            <Text
              variant="bodyMedium"
              style={{ color: theme.colors.onSurfaceVariant }}
            >
              Email
            </Text>
            <Text
              variant="bodyMedium"
              style={{ fontWeight: "500", color: theme.colors.onSurface }}
            >
              {email}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 8,
            }}
          >
            <Text
              variant="bodyMedium"
              style={{ color: theme.colors.onSurfaceVariant }}
            >
              Role
            </Text>
            <Text
              variant="bodyMedium"
              style={{ fontWeight: "500", color: theme.colors.onSurface }}
            >
              {role}
            </Text>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}
