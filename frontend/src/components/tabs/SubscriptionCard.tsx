import { Card, Text } from "react-native-paper";
import { SubscriptionDto } from "@/src/types/dto";

export default function SubscriptionCard({ subscription }: { subscription: SubscriptionDto }) {
  return (
    <Card style={{ marginBottom: 20 }}>
      <Card.Title title="Subscription Status" titleStyle={{ fontSize: 25 }} />
      <Card.Content>
        <Text variant="titleMedium">Status: {subscription.status}</Text>
        <Text variant="bodyMedium">
          Type: {subscription.type === "MESS" ? "Mess" : "Home Delivery"}
        </Text>
        <Text variant="bodyMedium">Meals Left: {subscription.meals}</Text>
      </Card.Content>
    </Card>
  );
}
