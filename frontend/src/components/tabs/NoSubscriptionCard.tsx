import { Card, Text, RadioButton, Button, useTheme } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface NoSubscriptionCardProps {
  subscriptionType: "MESS" | "HOME_DELIVERY";
  setSubscriptionType: (type: "MESS" | "HOME_DELIVERY") => void;
  requestSubscription: (type: "MESS" | "HOME_DELIVERY") => void;
  loading: boolean;
}

export default function NoSubscriptionCard({
  subscriptionType,
  setSubscriptionType,
  requestSubscription,
  loading,
}: NoSubscriptionCardProps) {
  const theme = useTheme();

  return (
    <Card style={styles.card} mode="elevated">
      <View
        style={[
          styles.header,
          { backgroundColor: theme.colors.errorContainer },
        ]}
      >
        <View style={styles.headerLeft}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: theme.colors.onErrorContainer + "30" },
            ]}
          >
            <MaterialCommunityIcons
              name="alert-circle-outline"
              size={24}
              color={theme.colors.onErrorContainer}
            />
          </View>
          <Text
            variant="titleMedium"
            style={{
              color: theme.colors.onErrorContainer,
              fontWeight: "600",
              flex: 1,
            }}
          >
            No Active Subscription
          </Text>
        </View>
      </View>
      <Card.Content style={styles.content}>
        <Text
          variant="bodyMedium"
          style={{
            color: theme.colors.onSurface,
            marginBottom: 16,
            fontWeight: "500",
          }}
        >
          Choose a subscription type:
        </Text>

        <RadioButton.Group
          value={subscriptionType}
          onValueChange={(value) =>
            setSubscriptionType(value as "MESS" | "HOME_DELIVERY")
          }
        >
          <View style={styles.radioRow}>
            <RadioButton value="MESS" />
            <Text variant="bodyLarge">Mess</Text>
          </View>

          <View style={styles.radioRow}>
            <RadioButton value="HOME_DELIVERY" />
            <Text variant="bodyLarge">Home Delivery</Text>
          </View>
        </RadioButton.Group>

        <Button
          mode="contained"
          style={{ marginTop: 16 }}
          loading={loading}
          onPress={() => requestSubscription(subscriptionType)}
        >
          Request {subscriptionType === "MESS" ? "Mess" : "Home Delivery"}
        </Button>
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
  content: {
    paddingVertical: 16,
  },
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
});
