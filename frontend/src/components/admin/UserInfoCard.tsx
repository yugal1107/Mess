import { View } from "react-native";
import { Text, Card, useTheme } from "react-native-paper";

interface UserInfoCardProps {
  id: string;
  email: string;
  role: string;
  contact?: string;
  address?: string;
}

export default function UserInfoCard({ id, email, role, contact, address }: UserInfoCardProps) {
  const theme = useTheme();

  const InfoRow = ({ label, value }: { label: string; value?: string }) => (
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
        {label}
      </Text>
      <Text
        variant="bodyMedium"
        style={{ fontWeight: "500", color: theme.colors.onSurface }}
      >
        {value || "N/A"}
      </Text>
    </View>
  );

  return (
    <View style={{ marginHorizontal: 4, marginVertical: 4 }}>
      <Card mode="elevated">
        <Card.Title title="User Information" titleVariant="titleMedium" />
        <Card.Content style={{ paddingTop: 0 }}>
          <InfoRow label="User ID" value={id} />
          <InfoRow label="Email" value={email} />
          <InfoRow label="Role" value={role} />
          <InfoRow label="Contact" value={contact} />
          <InfoRow label="Address" value={address} />
        </Card.Content>
      </Card>
    </View>
  );
}
