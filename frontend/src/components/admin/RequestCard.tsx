import { Card, List, Button } from "react-native-paper";

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
  return (
    <Card className="mx-3 my-1.5">
      <List.Item
        title={name}
        description={email}
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
