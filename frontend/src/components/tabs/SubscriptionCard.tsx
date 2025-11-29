import { Card, Chip } from "react-native-paper";
import { SubscriptionDto } from "@/src/types/dto";

export default function SubscriptionCard({ subscription }: { subscription: SubscriptionDto }) {
  return (
    <Card style={{ marginBottom: 20, paddingVertical: 5 }}>
      <Card.Title title="Subscription Status" titleStyle={{ fontSize: 25, marginBottom: 10 }} />
      <Card.Content style={{ flexDirection: "row", gap: 10, flexWrap: "wrap" }}>
        {/* <Text variant="titleMedium">Status: {subscription.status}</Text> */}
        <Chip icon="check" >{subscription.status}</Chip>
        <Chip icon="food" >{subscription.type === "MESS" ? "Mess" : "Home Delivery"}</Chip>
        <Chip icon="silverware-fork-knife" >
          Meals Left: {subscription.meals}
        </Chip>
        <Chip icon="calendar" >
          {subscription.date ? new Date(subscription.date).toLocaleDateString() : "N/A"}
        </Chip>
      </Card.Content>
    </Card>
  );
}