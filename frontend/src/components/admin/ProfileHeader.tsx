import { View, StyleSheet } from "react-native";
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
    <View style={styles.container}>
      <Avatar.Text
        size={80}
        label={name?.[0]?.toUpperCase() || "?"}
        style={{ backgroundColor: theme.colors.primary }}
      />
      <Text variant="headlineMedium" style={styles.name}>
        {name}
      </Text>
      <Text variant="bodyLarge" style={styles.email}>
        {email}
      </Text>
      <Chip
        style={[styles.roleChip, { backgroundColor: getRoleColor(role) }]}
        textStyle={{ color: "#fff" }}
      >
        {role}
      </Chip>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  name: {
    marginTop: 15,
    fontWeight: "bold",
  },
  email: {
    color: "#666",
    marginTop: 5,
  },
  roleChip: {
    marginTop: 10,
  },
});
