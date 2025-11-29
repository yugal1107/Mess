import { Pressable } from "react-native";
import { Card, List } from "react-native-paper";

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
  return (
    <Pressable onPress={() => onPress(id)}>
      <Card className="mx-3 my-1.5">
        <List.Item
          title={name}
          description={`Email: ${email}\nRole: ${role}`}
          descriptionNumberOfLines={2}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
        />
      </Card>
    </Pressable>
  );
}
