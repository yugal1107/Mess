import { View, StyleSheet } from "react-native";
import { Card, Text, useTheme, ActivityIndicator } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface StatCardProps {
  title: string;
  count: number;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  onPress?: () => void;
  loading?: boolean;
  variant?: "full" | "half";
}

export default function StatCard({
  title,
  count,
  icon,
  onPress,
  loading,
  variant = "half",
}: StatCardProps) {
  const theme = useTheme();
  const isFullWidth = variant === "full";

  return (
    <Card
      style={[
        styles.card,
        { backgroundColor: theme.colors.surface },
        isFullWidth && styles.cardFull,
      ]}
      mode="elevated"
      onPress={onPress}
    >
      <Card.Content
        style={[styles.content, isFullWidth && styles.contentFull]}
      >
        <View
          style={[
            styles.iconWrapper,
            { backgroundColor: theme.colors.primaryContainer },
            isFullWidth && styles.iconWrapperFull,
          ]}
        >
          <MaterialCommunityIcons
            name={icon}
            size={isFullWidth ? 32 : 24}
            color={theme.colors.primary}
          />
        </View>
        <View
          style={[
            styles.textContainer,
            isFullWidth && styles.textContainerFull,
          ]}
        >
          {loading ? (
            <ActivityIndicator
              size="small"
              color={theme.colors.primary}
              style={{ marginVertical: 4 }}
            />
          ) : (
            <Text
              variant={isFullWidth ? "displaySmall" : "headlineMedium"}
              style={[styles.number, { color: theme.colors.primary }]}
            >
              {count}
            </Text>
          )}
          <Text
            variant={isFullWidth ? "titleMedium" : "bodySmall"}
            style={{ color: theme.colors.onSurfaceVariant }}
          >
            {title}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "47%",
    borderRadius: 16,
  },
  cardFull: {
    width: "100%",
  },
  content: {
    alignItems: "center",
    paddingVertical: 16,
  },
  contentFull: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  iconWrapper: {
    padding: 10,
    borderRadius: 12,
    marginBottom: 8,
  },
  iconWrapperFull: {
    padding: 12,
    borderRadius: 14,
    marginBottom: 0,
    marginRight: 16,
  },
  textContainer: {
    alignItems: "center",
  },
  textContainerFull: {
    alignItems: "flex-start",
  },
  number: {
    fontWeight: "700",
    marginBottom: 4,
  },
});
