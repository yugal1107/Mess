import { View } from "react-native";
import { Text, Card, useTheme } from "react-native-paper";
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

const getStatusTheme = (status: string | undefined, theme: any) => {
  switch (status) {
    case "ACTIVE":
      return {
        bg: theme.colors.primaryContainer,
        text: theme.colors.onPrimaryContainer,
      };
    case "REQUESTED":
      return {
        bg: theme.colors.secondaryContainer,
        text: theme.colors.onSecondaryContainer,
      };
    case "INACTIVE":
    default:
      return {
        bg: theme.colors.errorContainer,
        text: theme.colors.onErrorContainer,
      };
  }
};

export default function UserSubscriptionCard({
  subscription,
}: UserSubscriptionCardProps) {
  const theme = useTheme();
  const statusTheme = getStatusTheme(subscription?.status, theme);

  return (
    <View style={{ marginHorizontal: 4, marginVertical: 4, marginBottom: 16 }}>
      <Card mode="elevated">
        <Card.Title title="Subscription Details" titleVariant="titleMedium" />
        <Card.Content style={{ paddingTop: 0 }}>
          {subscription ? (
            <>
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
                  Status
                </Text>
                <View
                  style={{
                    backgroundColor: statusTheme.bg,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    borderRadius: 8,
                  }}
                >
                  <Text
                    variant="bodySmall"
                    style={{
                      color: statusTheme.text,
                      fontWeight: "700",
                    }}
                  >
                    {subscription.status}
                  </Text>
                </View>
              </View>
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
                  Type
                </Text>
                <Text
                  variant="bodyMedium"
                  style={{ fontWeight: "500", color: theme.colors.onSurface }}
                >
                  {subscription.type === "MESS" ? "Mess" : "Home Delivery"}
                </Text>
              </View>
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
                  Meals Remaining
                </Text>
                <Text
                  variant="titleMedium"
                  style={{ fontWeight: "700", color: theme.colors.primary }}
                >
                  {subscription.meals}
                </Text>
              </View>
              {subscription.date && (
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
                    Started On
                  </Text>
                  <Text
                    variant="bodyMedium"
                    style={{ fontWeight: "500", color: theme.colors.onSurface }}
                  >
                    {formatDate(subscription.date)}
                  </Text>
                </View>
              )}
            </>
          ) : (
            <View
              style={{ alignItems: "center", paddingVertical: 16 }}
            >
              <Text
                variant="bodyMedium"
                style={{ color: theme.colors.outline }}
              >
                No active subscription
              </Text>
            </View>
          )}
        </Card.Content>
      </Card>
    </View>
  );
}

