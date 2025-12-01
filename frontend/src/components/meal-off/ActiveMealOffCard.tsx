import { View } from "react-native";
import { Card, Button, Text, useTheme } from "react-native-paper";

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

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card className="mb-5">
      <Card.Title title="Custom Meal Off" titleVariant="headlineSmall" />
      <Card.Content>
        <View
          className="p-4 rounded-lg mb-4"
          style={{ backgroundColor: theme.colors.primaryContainer }}
        >
          <Text
            variant="titleMedium"
            className="mb-2"
            style={{ color: theme.colors.onPrimaryContainer }}
          >
            Active Meal Off
          </Text>
          <Text
            variant="bodyMedium"
            style={{ color: theme.colors.onPrimaryContainer }}
          >
            From: {formatDate(startDate)} ({startMeal})
          </Text>
          <Text
            variant="bodyMedium"
            style={{ color: theme.colors.onPrimaryContainer }}
          >
            To: {formatDate(endDate)} ({endMeal})
          </Text>
        </View>

        <View className="flex-row gap-2">
          <Button mode="outlined" onPress={onEdit} className="flex-1">
            Edit
          </Button>
          <Button
            mode="contained"
            onPress={onCancel}
            loading={isCancelling}
            disabled={isCancelling}
            className="flex-1"
            buttonColor={theme.colors.error}
          >
            Cancel Off
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
}
