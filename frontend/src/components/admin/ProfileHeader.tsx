import { View } from "react-native";
import { Text, Avatar, Chip, useTheme } from "react-native-paper";

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

  const getRoleColor = (role: string) => {
    return role === "ADMIN" ? "#9b59b6" : "#3498db";
  };

  return (
    <View className="items-center py-8 px-5">
      <Avatar.Text
        size={80}
        label={name?.[0]?.toUpperCase() || "?"}
        style={{ backgroundColor: theme.colors.primary }}
      />
      <Text variant="headlineMedium" className="mt-4 font-bold">
        {name}
      </Text>
      <Text
        variant="bodyLarge"
        className="mt-1"
        style={{ color: theme.colors.outline }}
      >
        {email}
      </Text>
      <Chip
        className="mt-3"
        style={{ backgroundColor: getRoleColor(role) }}
        textStyle={{ color: "#fff" }}
      >
        {role}
      </Chip>
    </View>
  );
}
