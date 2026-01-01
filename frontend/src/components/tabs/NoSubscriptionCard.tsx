import { Card, Text, RadioButton, Button } from "react-native-paper";
import { View, StyleSheet } from "react-native";

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
  return (
    <Card style={{ marginBottom: 20, paddingVertical: 10 }}>
      <Card.Title
        title="You do not have an Active Subscription"
        titleVariant="titleLarge"
        titleStyle={{
          paddingBottom: 10,
          fontWeight: "bold",
          padding: 0
        }}
      />
      <Card.Content>
        <Text variant="titleMedium" style={{ marginBottom: 10 }}>
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
            <Text>Mess</Text>
          </View>

          <View style={styles.radioRow}>
            <RadioButton value="HOME_DELIVERY" />
            <Text>Home Delivery</Text>
          </View>
        </RadioButton.Group>

        <Button
          mode="contained"
          style={{ marginTop: 12 }}
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
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
});
