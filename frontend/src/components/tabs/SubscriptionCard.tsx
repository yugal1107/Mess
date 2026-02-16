import { View, StyleSheet, Dimensions } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import { SubscriptionDto } from "@/src/types/dto";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { formatDate } from "../../utils/formatters";

const { width } = Dimensions.get("window");
const isSmallDevice = width < 375;

interface SubscriptionCardProps {
  subscription: SubscriptionDto;
}

export default function SubscriptionCard({ subscription }: SubscriptionCardProps) {
  const theme = useTheme();

  const isMess = subscription.type === "MESS";

  return (
    <Card style={styles.card} mode="elevated">
      {/* Header Section */}
      <View
        style={[
          styles.header,
          { backgroundColor: theme.colors.primaryContainer },
        ]}
      >
        <View style={styles.headerLeft}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: theme.colors.onPrimaryContainer + "30" },
            ]}
          >
            <MaterialCommunityIcons
              name={isMess ? "silverware-fork-knife" : "moped"}
              size={isSmallDevice ? 20 : 24}
              color={theme.colors.onPrimaryContainer}
            />
          </View>
          <Text
            variant="titleMedium"
            style={{
              color: theme.colors.onPrimaryContainer,
              fontWeight: "600",
            }}
          >
            {isMess ? "Mess Plan" : "Home Delivery"}
          </Text>
        </View>

        <View
          style={[
            styles.statusBadge,
            { backgroundColor: theme.colors.primary },
          ]}
        >
          <Text
            variant="labelSmall"
            style={{
              color: theme.colors.onPrimary,
              fontWeight: "700",
              textTransform: "uppercase",
            }}
          >
            {subscription.status}
          </Text>
        </View>
      </View>

      <Card.Content style={styles.content}>
        <View style={styles.statsRow}>
          {/* Meals Counter */}
          <View style={styles.statItem}>
            <Text
              variant={isSmallDevice ? "displaySmall" : "displayMedium"}
              style={{
                color: theme.colors.primary,
                fontWeight: "700",
              }}
            >
              {subscription.meals}
            </Text>
            <Text
              variant="labelSmall"
              style={{
                color: theme.colors.outline,
                marginTop: 4,
              }}
            >
              MEALS LEFT
            </Text>
          </View>

          {/* Vertical Divider */}
          <View
            style={[
              styles.divider,
              { backgroundColor: theme.colors.outlineVariant },
            ]}
          />

          {/* Date Info */}
          <View style={styles.statItem}>
            <MaterialCommunityIcons
              name="calendar-clock"
              size={isSmallDevice ? 24 : 28}
              color={theme.colors.secondary}
            />
            <Text
              variant="titleSmall"
              style={{
                fontWeight: "600",
                marginTop: 4,
                color: theme.colors.onSurface,
              }}
            >
              {formatDate(subscription.date)}
            </Text>
            <Text
              variant="labelSmall"
              style={{
                color: theme.colors.outline,
                marginTop: 2,
              }}
            >
              START DATE
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
  },
  header: {
    padding: isSmallDevice ? 12 : 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconContainer: {
    padding: 8,
    borderRadius: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  content: {
    paddingVertical: isSmallDevice ? 16 : 20,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  divider: {
    width: 1,
    height: 40,
    marginHorizontal: 16,
  },
});
