import { View } from "react-native";
import { Button, Text, useTheme, Divider } from "react-native-paper";
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
    <View
      className="mb-5 rounded-3xl overflow-hidden"
      style={{
        backgroundColor: theme.colors.elevation.level1,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
      }}
    >
      {/* Header Section */}
      <View
        className="p-4 flex-row items-center gap-3"
        style={{ backgroundColor: theme.colors.primaryContainer }}
      >
        <View className="p-2 rounded-full bg-white/30">
          <MaterialCommunityIcons
            name="calendar-check"
            size={35}
            color={theme.colors.onPrimaryContainer}
          />
        </View>
        <View>
          <Text
            variant="titleMedium"
            className="font-semibold text-2xl"
            style={{ color: theme.colors.onPrimaryContainer }}
          >
            Active Meal Off
          </Text>
          <Text
            variant="labelMedium"
            style={{ color: theme.colors.onPrimaryContainer, opacity: 0.8 }}
          >
            Scheduled
          </Text>
        </View>
      </View>

      <View className="p-5">
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
            <Text variant="bodyLarge" className="font-bold">
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
            <Text variant="bodyLarge" className="font-bold text-right">
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

        <Divider className="mb-2" />

        <View className="flex-row justify-end pt-2 gap-2">
          <Button
            mode="contained"
            onPress={onEdit}
            icon="pencil"
          >
            Edit
          </Button>
          <Button
            mode="contained"
            onPress={onCancel}
            loading={isCancelling}
            disabled={isCancelling}
            icon="close-circle-outline"
            theme={{ colors: { primary: theme.colors.error } }}
          >
            Cancel
          </Button>
        </View>
      </View>
    </View>
  );
}
