import { View } from "react-native";
import { Card, Button, Text, useTheme, Divider } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { formatDate } from "../../utils/formatters";

type MealType = "LUNCH" | "DINNER";

interface ActiveMealOffCardProps {
  startDate: string;
  endDate: string;
  startMeal: MealType | null;
  endMeal: MealType | null;
  isCancelling: boolean;
  onEdit: () => void;
  onCancel: () => void;
}

export default function ActiveMealOffCard({
  startDate,
  endDate,
  startMeal,
  endMeal,
  isCancelling,
  onEdit,
  onCancel,
}: ActiveMealOffCardProps) {
  const theme = useTheme();

  return (
    <Card className="mb-5 rounded-xl" mode="elevated">
      <Card.Content>
        <View className="flex-row justify-between items-center mb-4">
          <Text variant="titleMedium" className="font-bold">
            Active Meal Off
          </Text>
          <MaterialCommunityIcons
            name="calendar-check"
            size={24}
            color={theme.colors.primary}
          />
        </View>

        <Divider className="mb-4" />

        {/* Date & Meal Info */}
        <View className="flex-row justify-between items-center mb-4">
          {/* Start Section */}
          <View className="flex-1 mr-2">
            <View className="flex-row items-center mb-1">
              <MaterialCommunityIcons
                name="calendar-start"
                size={16}
                color={theme.colors.primary}
              />
              <Text
                variant="labelMedium"
                style={{ color: theme.colors.primary, marginLeft: 4 }}
              >
                FROM
              </Text>
            </View>
            <Text variant="bodyLarge" className="font-semibold">
              {formatDate(startDate)}
            </Text>
            <Text
              variant="bodySmall"
              className="capitalize text-gray-500"
              style={{ textTransform: "capitalize" }}
            >
              {startMeal?.toLowerCase()}
            </Text>
          </View>

          {/* Long Arrow Visual */}
          <View className="flex-1 flex-row items-center justify-center px-1">
            <View
              className="h-[2px] flex-1 rounded-full"
              style={{ backgroundColor: theme.colors.outlineVariant }}
            />
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color={theme.colors.outlineVariant}
              style={{ marginLeft: -4 }}
            />
          </View>

          {/* End Section */}
          <View className="flex-1 ml-2 items-end">
            <View className="flex-row items-center mb-1">
              <Text
                variant="labelMedium"
                style={{ color: theme.colors.error, marginRight: 4 }}
              >
                TO
              </Text>
              <MaterialCommunityIcons
                name="calendar-end"
                size={16}
                color={theme.colors.error}
              />
            </View>
            <Text variant="bodyLarge" className="font-semibold text-right">
              {formatDate(endDate)}
            </Text>
            <Text
              variant="bodySmall"
              className="capitalize text-gray-500 text-right"
              style={{ textTransform: "capitalize" }}
            >
              {endMeal?.toLowerCase()}
            </Text>
          </View>
        </View>
      </Card.Content>

      <Card.Actions className="pt-0 border-t border-gray-100 dark:border-gray-800 mt-2">
        <Button
          mode="text"
          onPress={onEdit}
          icon="pencil"
          textColor={theme.colors.primary}
        >
          Edit
        </Button>
        <Button
          mode="text"
          onPress={onCancel}
          loading={isCancelling}
          disabled={isCancelling}
          icon="close-circle-outline"
          textColor={theme.colors.error}
        >
          Cancel
        </Button>
      </Card.Actions>
    </Card>
  );
}
