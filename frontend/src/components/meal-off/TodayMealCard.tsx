import { StyleSheet, View } from "react-native";
import { Card, Text, Switch } from "react-native-paper";

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
  return (
    <Card style={styles.card}>
      <Card.Title title="Today's Meal" />
      <Card.Content>
        <Text variant="bodySmall" style={styles.deadlineText}>
          Lunch deadline: 8:00 AM • Dinner deadline: 4:00 PM
        </Text>
        <View style={styles.row}>
          <Text variant="bodyLarge">Lunch Off</Text>
          <Switch
            disabled={isToggling}
            value={lunchOff}
            onValueChange={(val) => onToggle("lunch", val)}
          />
        </View>
        <View style={styles.row}>
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

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
  },
  deadlineText: {
    color: "#666",
    marginBottom: 10,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
});
