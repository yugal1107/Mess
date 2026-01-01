import { View } from "react-native";
import { Text, useTheme, Card } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function MealMenu() {
  const theme = useTheme();
  return (
    <Card className="flex-1 aspect-square rounded-3xl" mode="elevated">
      <Card.Content className="justify-center items-center">
        <View
          className="p-3 rounded-full mb-2"
          style={{ backgroundColor: theme.colors.secondaryContainer }}
        >
          <MaterialCommunityIcons
            name="food-variant"
            size={35}
            color={theme.colors.onSecondaryContainer}
          />
        </View>
        <Text variant="titleMedium" className="font-bold mt-1">
          Today&apos;s Meal Menu
        </Text>
        <Text variant="labelMedium" className="text-center mt-1 opacity-60">
          Coming Soon
        </Text>
      </Card.Content>
    </Card>
  );
}
