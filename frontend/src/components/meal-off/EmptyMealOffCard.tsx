import { View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface EmptyMealOffCardProps {
  onSetMealOff: () => void;
}

export default function EmptyMealOffCard({
  onSetMealOff,
}: EmptyMealOffCardProps) {
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
        style={{ backgroundColor: theme.colors.surfaceVariant }}
      >
        <View className="p-2 rounded-full bg-white/30">
          <MaterialCommunityIcons
            name="calendar-plus"
            size={35}
            color={theme.colors.onSurfaceVariant}
          />
        </View>
        <View>
          <Text
            variant="titleMedium"
            className="font-semibold text-2xl"
            style={{ color: theme.colors.onSurfaceVariant }}
          >
            Custom Meal Off
          </Text>
          <Text
            variant="labelSmall"
            style={{ color: theme.colors.onSurfaceVariant, opacity: 0.8 }}
          >
            Plan Ahead
          </Text>
        </View>
      </View>

      <View className="p-5">
        <View
          className="p-4 rounded-xl mb-4 items-center border border-dashed"
          style={{
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.outline,
          }}
        >
          <Text
            variant="bodyLarge"
            className="text-center mb-2 font-medium"
            style={{ color: theme.colors.onSurface }}
          >
            No custom meal off set
          </Text>
          <Text
            variant="bodySmall"
            className="text-center"
            style={{ color: theme.colors.outline }}
          >
            Set a date range to skip meals for multiple days
          </Text>
        </View>

        <Button
          mode="contained"
          onPress={onSetMealOff}
          className="rounded-full"
        >
          Set Custom Meal Off
        </Button>
      </View>
    </View>
  );
}
