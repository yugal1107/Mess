import { Pressable } from "react-native";
import { Card, List, Avatar } from "react-native-paper";
import { getInitials } from "../../utils/formatters";
import { useTheme } from "react-native-paper";

interface UserListItemProps {
  id: string;
  name: string;
  email: string;
  role: string;
  onPress: (userId: string) => void;
}

export default function UserListItem({
  id,
  name,
  email,
  role,
  onPress,
}: UserListItemProps) {
  const theme = useTheme();
  return (
    <Pressable onPress={() => onPress(id)}>
      <Card className="mx-1 px-3 my-1.5">
        <List.Item
          title={name}
          description={`Email: ${email}\nRole: ${role}`}
          descriptionNumberOfLines={2}
          left={(props) => (
            <Avatar.Text
              {...props}
              size={40}
              label={getInitials(name)}
              style={{ backgroundColor: theme.colors.primaryContainer }}
              color={theme.colors.onPrimaryContainer}
            />
          )}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
        />
      </Card>
    </Pressable>
  );
}
