import { Card, Text, useTheme } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { SubscriptionDto } from "@/src/types/dto";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface PendingRequestCardProps {
  subscription: SubscriptionDto;
}

export default function PendingRequestCard({ subscription }: PendingRequestCardProps) {
  const theme = useTheme();

  return (
    <Card style={styles.card} mode="elevated">
      <View
        style={[
          styles.header,
          { backgroundColor: theme.colors.secondaryContainer },
        ]}
      >
        <View style={styles.headerLeft}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: theme.colors.onSecondaryContainer + "30" },
            ]}
          >
            <MaterialCommunityIcons
              name="clock-outline"
              size={24}
              color={theme.colors.onSecondaryContainer}
            />
          </View>
          <Text
            variant="titleMedium"
            style={{
              color: theme.colors.onSecondaryContainer,
              fontWeight: "600",
            }}
          >
            Pending Request
          </Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: theme.colors.secondary },
          ]}
        >
          <Text
            variant="labelSmall"
            style={{
              color: theme.colors.onSecondary,
              fontWeight: "700",
              textTransform: "uppercase",
            }}
          >
            {subscription.status}
          </Text>
        </View>
      </View>
      <Card.Content style={styles.content}>
        <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
          Type: {subscription.type === "MESS" ? "Mess" : "Home Delivery"}
        </Text>
        <Text
          variant="bodyMedium"
          style={{ color: theme.colors.onSurfaceVariant, marginTop: 8 }}
        >
          Your request is pending approval from the admin.
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
  },
  header: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconContainer: {
    padding: 8,
    borderRadius: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  content: {
    paddingVertical: 16,
  },
});
