import { View, StyleSheet } from "react-native";
import { Text, Card, Chip } from "react-native-paper";

interface SubscriptionData {
  status: string;
  type: "MESS" | "HOME_DELIVERY";
  meals: number;
  date?: string;
}

interface UserSubscriptionCardProps {
  subscription: SubscriptionData | null | undefined;
}

const getStatusColor = (status: string | undefined) => {
  switch (status) {
    case "ACTIVE":
      return "#27ae60";
    case "REQUESTED":
      return "#f39c12";
    case "INACTIVE":
    default:
      return "#e74c3c";
  }
};

export default function UserSubscriptionCard({
  subscription,
}: UserSubscriptionCardProps) {
  return (
    <Card style={styles.card}>
      <Card.Title title="Subscription Details" />
      <Card.Content>
        {subscription ? (
          <>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Status</Text>
              <Chip
                compact
                style={{
                  backgroundColor: getStatusColor(subscription.status),
                }}
                textStyle={{ color: "#fff", fontSize: 12 }}
              >
                {subscription.status}
              </Chip>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Type</Text>
              <Text style={styles.infoValue}>
                {subscription.type === "MESS" ? "Mess" : "Home Delivery"}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Meals Remaining</Text>
              <Text style={[styles.infoValue, styles.mealsCount]}>
                {subscription.meals}
              </Text>
            </View>
            {subscription.date && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Started On</Text>
                <Text style={styles.infoValue}>
                  {new Date(subscription.date).toLocaleDateString()}
                </Text>
              </View>
            )}
          </>
        ) : (
          <Text style={styles.noSubscription}>No active subscription</Text>
        )}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 15,
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "500",
  },
  mealsCount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#27ae60",
  },
  noSubscription: {
    textAlign: "center",
    color: "#888",
    paddingVertical: 20,
  },
});
