import { View } from "react-native";
import { List, Avatar, useTheme, Text } from "react-native-paper";
import { getInitials } from "../../utils/formatters";

interface UserListItemProps {
  id: string;
  name: string;
  email: string;
  role: string;
  isFirst?: boolean;
  isLast?: boolean;
  onPress: (userId: string) => void;
}

export default function UserListItem({
  id,
  name,
  email,
  role,
  isFirst,
  isLast,
  onPress,
}: UserListItemProps) {
  const theme = useTheme();

  const largeRadius = 16;
  const smallRadius = 4;

  return (
    <View
      style={{
        backgroundColor: theme.colors.surface,
        borderTopLeftRadius: isFirst ? largeRadius : smallRadius,
        borderTopRightRadius: isFirst ? largeRadius : smallRadius,
        borderBottomLeftRadius: isLast ? largeRadius : smallRadius,
        borderBottomRightRadius: isLast ? largeRadius : smallRadius,
        marginBottom: isLast ? 0 : 2,
        overflow: "hidden",
        elevation: 0.5,
      }}
    >
      <List.Item
        title={name}
        titleStyle={{
          fontWeight: "600",
          fontSize: 16,
          color: theme.colors.onSurface,
        }}
        style={{
          paddingHorizontal: 16,
          paddingVertical: 12,
        }}
        description={() => (
          <View className="mt-1 flex-row items-center flex-wrap">
            <Text
              variant="bodyMedium"
              style={{ color: theme.colors.onSurfaceVariant }}
              numberOfLines={1}
            >
              {email}
            </Text>
            {role === "ADMIN" && (
              <View
                style={{
                  backgroundColor: theme.colors.tertiaryContainer,
                  paddingHorizontal: 8,
                  paddingVertical: 3,
                  borderRadius: 6,
                  marginLeft: 8,
                }}
              >
                <Text
                  style={{
                    color: theme.colors.onTertiaryContainer,
                    fontSize: 10,
                    fontWeight: "700",
                    letterSpacing: 0.5,
                  }}
                >
                  ADMIN
                </Text>
              </View>
            )}
          </View>
        )}
        left={(props) => (
          <Avatar.Text
            {...props}
            size={44}
            label={getInitials(name)}
            style={[
              props.style,
              {
                backgroundColor: theme.colors.primaryContainer,
                marginRight: 12,
              },
            ]}
            color={theme.colors.onPrimaryContainer}
          />
        )}
        right={(props) => (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: theme.colors.surfaceVariant,
            }}
          >
            <List.Icon
              {...props}
              icon="chevron-right"
              color={theme.colors.onSurfaceVariant}
              style={{ margin: 0 }}
            />
          </View>
        )}
        onPress={() => onPress(id)}
      />
    </View>
  );
}
