import { View } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import { SubscriptionDto } from "@/src/types/dto";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { formatDate } from "../../utils/formatters";

export default function SubscriptionCard({
  subscription,
}: {
  subscription: SubscriptionDto;
}) {
  const theme = useTheme();

  const isMess = subscription.type === "MESS";

  return (
    <View>
      <Card
        className="mb-5 rounded-3xl overflow-hidden"
        mode="elevated"
        elevation={2}
      >
        {/* Header Section */}
        <View
          className="p-5 flex-row justify-between items-center"
          style={{ backgroundColor: theme.colors.primaryContainer }}
        >
          <View className="flex-row items-center gap-3">
            <View className="p-2 rounded-full bg-white/30">
              <MaterialCommunityIcons
                name={isMess ? "silverware-fork-knife" : "moped"}
                size={24}
                color={theme.colors.onPrimaryContainer}
              />
            </View>
            <View>
              <Text
                variant="titleMedium"
                className="font-semibold text-2xl"
                style={{ color: theme.colors.onPrimaryContainer }}
              >
                {isMess ? "Mess Plan" : "Home Delivery Plan"}
              </Text>
            </View>
          </View>

          <View className="px-3 py-1 rounded-full bg-green-400">
            <Text
              variant="labelLarge"
              className="font-bold uppercase tracking-wider"
              style={{ color: theme.colors.onPrimaryContainer }}
            >
              {subscription.status}
            </Text>
          </View>
        </View>

        <Card.Content className="pt-6 pb-6">
          <View className="flex-row justify-between items-center">
            {/* Meals Counter */}
            <View className="items-center flex-1">
              <Text
                variant="displayMedium"
                className="font-bold"
                style={{ color: theme.colors.primary }}
              >
                {subscription.meals}
              </Text>
              <Text variant="bodySmall" className="text-gray-500 font-medium">
                MEALS LEFT
              </Text>
            </View>

            {/* Vertical Divider */}
            <View
              className="w-[1px] h-12 mx-4"
              style={{ backgroundColor: theme.colors.outlineVariant }}
            />

            {/* Date Info */}
            <View className="items-center flex-1">
              <MaterialCommunityIcons
                name="calendar-clock"
                size={28}
                color={theme.colors.secondary}
                className="mb-1"
              />
              <Text variant="titleMedium" className="font-semibold mt-1">
                {formatDate(subscription.date)}
              </Text>
              <Text variant="bodySmall" className="text-gray-500 font-medium">
                START DATE
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}
