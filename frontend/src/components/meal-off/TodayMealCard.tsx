import { View } from "react-native";
import { Text, Switch, useTheme } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface TodayMealCardProps {
  lunchOff: boolean;
  dinnerOff: boolean;
  isToggling: boolean;
  onToggle: (meal: "lunch" | "dinner") => void;
}

export default function TodayMealCard({
  lunchOff,
  dinnerOff,
  isToggling,
  onToggle,
}: TodayMealCardProps) {
  const theme = useTheme();

  return (
    <View
      className="mb-5 rounded-3xl overflow-hidden"
      style={{
        backgroundColor: theme.colors.elevation.level1,
        elevation: 2, // Android shadow
        shadowColor: "#000", // iOS shadow
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
            name="calendar-today"
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
            Today&apos;s Meal Off
          </Text>
          {/* <Text
            variant="labelSmall"
            style={{ color: theme.colors.onSecondaryContainer, opacity: 0.8 }}
          >
            Quick Actions
          </Text> */}
        </View>
      </View>

      {/* Content Section */}
      <View className="p-5">
        {/* Deadline Warning */}
        <View className="flex-row items-center mb-4 bg-red-50 dark:bg-red-900/20 p-2 rounded-full">
          <MaterialCommunityIcons
            name="clock-alert-outline"
            size={18}
            color={theme.colors.error}
            style={{ marginRight: 6 }}
          />
          <Text
            variant="labelSmall"
            style={{ color: theme.colors.error, flex: 1 }}
          >
            Lunch by 8:00 AM • Dinner by 4:00 PM
          </Text>
        </View>

        {/* Lunch Toggle */}
        <View className="flex-row justify-between items-center py-2">
          <View className="flex-row items-center gap-3">
            <View
              className="p-2 rounded-full"
              style={{ backgroundColor: theme.colors.surfaceVariant }}
            >
              <MaterialCommunityIcons
                name="weather-sunny"
                size={25}
                color={theme.colors.primary}
              />
            </View>
            <Text variant="bodyLarge" className="font-semibold">
              Lunch
            </Text>
          </View>
          <Switch
            disabled={isToggling}
            value={lunchOff}
            onValueChange={() => onToggle("lunch")}
          />
        </View>

        {/* Divider */}
        <View
          className="h-[1px] my-2"
          style={{ backgroundColor: theme.colors.outlineVariant, opacity: 0.5 }}
        />

        {/* Dinner Toggle */}
        <View className="flex-row justify-between items-center py-2">
          <View className="flex-row items-center gap-3">
            <View
              className="p-2 rounded-full"
              style={{ backgroundColor: theme.colors.surfaceVariant }}
            >
              <MaterialCommunityIcons
                name="weather-night"
                size={25}
                color={theme.colors.primary}
              />
            </View>
            <Text variant="bodyLarge" className="font-semibold">
              Dinner
            </Text>
          </View>
          <Switch
            disabled={isToggling}
            value={dinnerOff}
            onValueChange={() => onToggle("dinner")}
          />
        </View>
      </View>
    </View>
  );
}
