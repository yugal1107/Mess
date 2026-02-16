import { View } from "react-native";
import { Text, Card, Chip, useTheme } from "react-native-paper";
import { formatDate } from "../../utils/formatters";

interface SubscriptionData {
  status: string;
  type: "MESS" | "HOME_DELIVERY";
  meals: number;
  date?: string;
}

interface UserSubscriptionCardProps {
  subscription: SubscriptionData | null | undefined;
}

const getStatusTheme = (status: string | undefined) => {
  switch (status) {
    case "ACTIVE":
      return {
        bg: "#E8F5E9",
        text: "#2E7D32",
      };
    case "REQUESTED":
      return {
        bg: "#FFF3E0",
        text: "#EF6C00",
      };
    case "INACTIVE":
    default:
      return {
        bg: "#FFEBEE",
        text: "#C62828",
      };
  }
};

export default function UserSubscriptionCard({
  subscription,
}: UserSubscriptionCardProps) {
  const theme = useTheme();
  const statusTheme = getStatusTheme(subscription?.status);

  return (
    <Card className="mx-4 my-2.5 mb-8" mode="elevated">
      <Card.Title title="Subscription Details" titleVariant="titleLarge" />
      <Card.Content>
        {subscription ? (
          <>
            <View className="flex-row justify-between items-center py-3">
              <Text variant="titleMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                Status
              </Text>
              <Chip
                compact
                style={{
                  backgroundColor: statusTheme.bg,
                }}
                textStyle={{ color: statusTheme.text, fontWeight: "bold" }}
              >
                {subscription.status}
              </Chip>
            </View>
            <View className="flex-row justify-between items-center py-3">
              <Text variant="titleMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                Type
              </Text>
              <Text variant="bodyLarge" className="font-medium">
                {subscription.type === "MESS" ? "Mess" : "Home Delivery"}
              </Text>
            </View>
            <View className="flex-row justify-between items-center py-3">
              <Text variant="titleMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                Meals Remaining
              </Text>
              <Text
                variant="headlineSmall"
                className="font-bold"
                style={{ color: theme.colors.primary }}
              >
                {subscription.meals}
              </Text>
            </View>
            {subscription.date && (
              <View className="flex-row justify-between items-center py-3">
                <Text
                  variant="titleMedium"
                  style={{ color: theme.colors.onSurfaceVariant }}
                >
                  Started On
                </Text>
                <Text variant="bodyLarge" className="font-medium">
                  {formatDate(subscription.date)}
                </Text>
              </View>
            )}
          </>
        ) : (
          <View className="items-center py-6">
            <Text
              variant="titleMedium"
              style={{ color: theme.colors.outline }}
            >
              No active subscription
            </Text>
          </View>
        )}
      </Card.Content>
    </Card>
  );
}

