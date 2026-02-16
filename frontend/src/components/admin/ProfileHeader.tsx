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

  return (
    <View className="items-center py-8 px-5">
      <Avatar.Text
        size={100}
        label={name?.[0]?.toUpperCase() || "?"}
        style={{ backgroundColor: theme.colors.primary }}
      />
      <Text variant="headlineMedium" className="mt-4 font-bold text-center">
        {name}
      </Text>
      <Text
        variant="titleMedium"
        className="mt-1 text-center"
        style={{ color: theme.colors.onSurfaceVariant }}
      >
        {email}
      </Text>
      <Chip
        className="mt-4"
        style={{
          backgroundColor:
            role === "ADMIN"
              ? theme.colors.tertiaryContainer
              : theme.colors.secondaryContainer,
        }}
        textStyle={{
          color:
            role === "ADMIN"
              ? theme.colors.onTertiaryContainer
              : theme.colors.onSecondaryContainer,
        }}
      >
        {role}
      </Chip>
    </View>
  );
}
