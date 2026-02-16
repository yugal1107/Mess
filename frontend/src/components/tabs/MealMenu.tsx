import { View, StyleSheet } from "react-native";
import { Text, useTheme, Card } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface MealMenuProps {
  title?: string;
  subtitle?: string;
  icon?: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
}

export default function MealMenu({
  title = "Today's Meal Menu",
  subtitle = "Coming Soon",
  icon = "food-variant",
}: MealMenuProps) {
  const theme = useTheme();

  return (
    <Card style={styles.card} mode="elevated">
      <Card.Content style={styles.content}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: theme.colors.secondaryContainer },
          ]}
        >
          <MaterialCommunityIcons
            name={icon}
            size={28}
            color={theme.colors.onSecondaryContainer}
          />
        </View>
        <Text
          variant="titleSmall"
          style={{
            fontWeight: "600",
            marginTop: 12,
            textAlign: "center",
            color: theme.colors.onSurface,
          }}
        >
          {title}
        </Text>
        <Text
          variant="labelSmall"
          style={{
            textAlign: "center",
            marginTop: 4,
            color: theme.colors.outline,
          }}
        >
          {subtitle}
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 16,
    minHeight: 140,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  iconContainer: {
    padding: 12,
    borderRadius: 16,
  },
});
