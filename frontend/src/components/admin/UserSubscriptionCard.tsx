import { View } from "react-native";
import { Text, Card, Chip, useTheme } from "react-native-paper";

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
  const theme = useTheme();

  return (
    <Card className="mx-4 my-2.5">
      <Card.Title title="Subscription Details" />
      <Card.Content>
        {subscription ? (
          <>
            <View className="flex-row justify-between items-center py-2.5">
              <Text className="text-sm" style={{ color: theme.colors.outline }}>
                Status
              </Text>
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
            <View className="flex-row justify-between items-center py-2.5">
              <Text className="text-sm" style={{ color: theme.colors.outline }}>
                Type
              </Text>
              <Text className="text-sm font-medium">
                {subscription.type === "MESS" ? "Mess" : "Home Delivery"}
              </Text>
            </View>
            <View className="flex-row justify-between items-center py-2.5">
              <Text className="text-sm" style={{ color: theme.colors.outline }}>
                Meals Remaining
              </Text>
              <Text
                className="text-lg font-bold"
                style={{ color: theme.colors.primary }}
              >
                {subscription.meals}
              </Text>
            </View>
            {subscription.date && (
              <View className="flex-row justify-between items-center py-2.5">
                <Text
                  className="text-sm"
                  style={{ color: theme.colors.outline }}
                >
                  Started On
                </Text>
                <Text className="text-sm font-medium">
                  {new Date(subscription.date).toLocaleDateString()}
                </Text>
              </View>
            )}
          </>
        ) : (
          <Text
            className="text-center py-5"
            style={{ color: theme.colors.outline }}
          >
            No active subscription
          </Text>
        )}
      </Card.Content>
    </Card>
  );
}
