import { View } from "react-native";
import { Text, Avatar, useTheme } from "react-native-paper";

interface ProfileHeaderProps {
  name: string;
  email: string;
  role: string;
}

export default function ProfileHeader({
  name,
  email,
  role,
}: ProfileHeaderProps) {
  const theme = useTheme();

  return (
    <View className="flex-row items-center py-4 px-5">
      <Avatar.Text
        size={60}
        label={name?.[0]?.toUpperCase() || "?"}
        style={{ backgroundColor: theme.colors.primaryContainer }}
        color={theme.colors.onPrimaryContainer}
      />
      <View className="ml-4 flex-1">
        <Text variant="titleLarge" style={{ fontWeight: "600", color: theme.colors.onSurface }}>
          {name}
        </Text>
        <Text
          variant="bodyMedium"
          style={{ color: theme.colors.onSurfaceVariant, marginTop: 2 }}
        >
          {email}
        </Text>
        <Text
          variant="bodySmall"
          style={{
            color: role === "ADMIN" ? theme.colors.tertiary : theme.colors.secondary,
            marginTop: 4,
            fontWeight: "600",
          }}
        >
          {role}
        </Text>
      </View>
    </View>
  );
}
