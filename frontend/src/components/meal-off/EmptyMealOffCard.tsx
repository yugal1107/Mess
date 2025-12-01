import { View } from "react-native";
import { Card, Button, Text, useTheme } from "react-native-paper";

interface EmptyMealOffCardProps {
  onSetMealOff: () => void;
}

export default function EmptyMealOffCard({
  onSetMealOff,
}: EmptyMealOffCardProps) {
  const theme = useTheme();

  return (
    <Card className="mb-5">
      <Card.Title title="Custom Meal Off" titleVariant="headlineSmall" />
      <Card.Content>
        <View
          className="p-4 rounded-lg mb-4 items-center"
          style={{ backgroundColor: theme.colors.surfaceVariant }}
        >
          <Text
            variant="bodyLarge"
            className="text-center mb-2"
            style={{ color: theme.colors.onSurfaceVariant }}
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

        <Button mode="contained" onPress={onSetMealOff}>
          Set Custom Meal Off
        </Button>
      </Card.Content>
    </Card>
  );
}
