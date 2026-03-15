import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useAppTheme } from "../../hooks/ThemeContext";

export default function FestivalGreeting() {
  const { festivalTheme } = useAppTheme();
  const theme = useTheme();

  if (!festivalTheme || !festivalTheme.greeting) return null;

  const iconName =
    (festivalTheme.greetingIcon as React.ComponentProps<
      typeof MaterialCommunityIcons
    >["name"]) ?? "party-popper";

  return (
    <View
      style={{
        backgroundColor: theme.colors.primaryContainer,
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        borderWidth: 1,
        borderColor: theme.colors.primary,
      }}
    >
      {/* Icon */}
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: theme.colors.primary,
          justifyContent: "center",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <MaterialCommunityIcons
          name={iconName}
          size={26}
          color={theme.colors.onPrimary}
        />
      </View>

      {/* Text */}
      <View style={{ flex: 1 }}>
        <Text
          variant="titleLarge"
          style={{
            color: theme.colors.onPrimaryContainer,
            fontWeight: "700",
            marginBottom: festivalTheme.greetingSubtext ? 2 : 0,
          }}
        >
          {festivalTheme.greeting}
        </Text>
        {festivalTheme.greetingSubtext && (
          <Text
            variant="bodySmall"
            style={{ color: theme.colors.onPrimaryContainer, opacity: 0.85 }}
          >
            {festivalTheme.greetingSubtext}
          </Text>
        )}
      </View>
    </View>
  );
}
