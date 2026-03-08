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
  badge?: { label: string; finalized: boolean };
}

export default function StatCard({
  title,
  count,
  icon,
  onPress,
  loading,
  variant = "half",
  badge,
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
          {badge && (
            <View
              style={[
                styles.badge,
                {
                  backgroundColor: badge.finalized
                    ? (theme.colors as any).successContainer
                    : theme.colors.errorContainer,
                },
              ]}
            >
              <MaterialCommunityIcons
                name={badge.finalized ? "check-circle" : "clock-outline"}
                size={10}
                color={
                  badge.finalized
                    ? (theme.colors as any).onSuccessContainer
                    : theme.colors.onErrorContainer
                }
              />
              <Text
                variant="labelSmall"
                style={{
                  color: badge.finalized
                    ? (theme.colors as any).onSuccessContainer
                    : theme.colors.onErrorContainer,
                  marginLeft: 3,
                  fontWeight: "600",
                }}
              >
                {badge.label}
              </Text>
            </View>
          )}
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
  badge: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
});
