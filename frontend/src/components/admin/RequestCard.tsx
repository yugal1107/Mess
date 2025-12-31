import { Card, List, Button, Avatar } from "react-native-paper";
import { getInitials } from "../../utils/formatters";
import { useTheme } from "react-native-paper";
import { use } from "react";

interface RequestCardProps {
  id: string;
  name: string;
  email: string;
  onApprove: (userId: string) => void;
  isLoading: boolean;
}

export default function RequestCard({
  id,
  name,
  email,
  onApprove,
  isLoading,
}: RequestCardProps) {
  const theme = useTheme();
  return (
    <Card className="mx-1 px-3 my-1.5">
      <List.Item
        title={name}
        description={email}
        left={(props) => (
          <Avatar.Text
            {...props}
            size={40}
            label={getInitials(name)}
            style={{ backgroundColor: theme.colors.primaryContainer }}
            color={theme.colors.onPrimaryContainer}
          />
        )}
        right={() => (
          <Button
            mode="contained"
            onPress={() => onApprove(id)}
            loading={isLoading}
            className="justify-center"
          >
            Approve
          </Button>
        )}
      />
    </Card>
  );
}
