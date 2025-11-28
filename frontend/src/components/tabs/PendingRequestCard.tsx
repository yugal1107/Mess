import { Card, Text } from "react-native-paper";
import { SubscriptionDto } from "@/src/types/dto";

export default function PendingRequestCard({ subscription }: { subscription: SubscriptionDto }) {
  return (
    <Card style={{ marginBottom: 20 }}>
      <Card.Title title="Subscription Status" />
      <Card.Content>
        <Text variant="titleMedium">Status: {subscription.status}</Text>
        <Text variant="bodyMedium">
          Type: {subscription.type === "MESS" ? "Mess" : "Home Delivery"}
        </Text>
        <Text variant="bodyMedium">Your request is pending approval.</Text>
      </Card.Content>
    </Card>
  );
}
