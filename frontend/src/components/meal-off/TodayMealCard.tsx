import { View } from "react-native";
import { Card, Text, Switch, useTheme } from "react-native-paper";

interface TodayMealCardProps {
  lunchOff: boolean;
  dinnerOff: boolean;
  isToggling: boolean;
  onToggle: (meal: "lunch" | "dinner", newValue: boolean) => void;
}

export default function TodayMealCard({
  lunchOff,
  dinnerOff,
  isToggling,
  onToggle,
}: TodayMealCardProps) {
  const theme = useTheme();

  return (
    <Card className="mb-5">
      <Card.Title title="Today&apos;s Meal Off" titleVariant="headlineSmall" />
      <Card.Content>
        <Text
          variant="bodySmall"
          className="mb-2.5"
          style={{ color: theme.colors.error }}
        >
          Lunch deadline: 8:00 AM • Dinner deadline: 4:00 PM
        </Text>
        <View className="flex-row justify-between items-center py-2.5">
          <Text variant="bodyLarge">Lunch Off</Text>
          <Switch
            disabled={isToggling}
            value={lunchOff}
            onValueChange={(val) => onToggle("lunch", val)}
          />
        </View>
        <View className="flex-row justify-between items-center py-2.5">
          <Text variant="bodyLarge">Dinner Off</Text>
          <Switch
            disabled={isToggling}
            value={dinnerOff}
            onValueChange={(val) => onToggle("dinner", val)}
          />
        </View>
      </Card.Content>
    </Card>
  );
}
