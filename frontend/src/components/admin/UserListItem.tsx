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

  const largeRadius = 20;
  const smallRadius = 4;

  return (
    <View
      style={{
        backgroundColor: theme.colors.surface,
        borderTopLeftRadius: isFirst ? largeRadius : smallRadius,
        borderTopRightRadius: isFirst ? largeRadius : smallRadius,
        borderBottomLeftRadius: isLast ? largeRadius : smallRadius,
        borderBottomRightRadius: isLast ? largeRadius : smallRadius,
        marginBottom: 4,
        overflow: "hidden",
      }}
    >
      <List.Item
        title={name}
        titleStyle={{ fontWeight: "bold" }}
        style={{ paddingHorizontal: 5, paddingVertical: 8,}}
        description={() => (
          <View className="mt-0.5 flex-row items-center">
            <Text
              variant="bodySmall"
              style={{ color: theme.colors.onSurfaceVariant }}
              numberOfLines={1}
            >
              {email}
            </Text>
            {role === "ADMIN" && (
              <View
                style={{
                  backgroundColor: theme.colors.tertiaryContainer,
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                  borderRadius: 4,
                  marginLeft: 8,
                }}
              >
                <Text
                  style={{
                    color: theme.colors.onTertiaryContainer,
                    fontSize: 10,
                    fontWeight: "bold",
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
            size={40}
            label={getInitials(name)}
            style={[
              props.style,
              {
                backgroundColor: theme.colors.primaryContainer,
                marginRight: 10,
              },
            ]}
            color={theme.colors.onPrimaryContainer}
          />
        )}
        right={(props) => (
          <List.Icon {...props} icon="chevron-right" color={theme.colors.outline} />
        )}
        onPress={() => onPress(id)}
      />
    </View>
  );
}
