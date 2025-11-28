import { useState } from "react";
import { StyleSheet } from "react-native";
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
    <Card style={styles.card}>
      <List.Item
        title={name}
        description={email}
        right={() => (
          <Button
            mode="contained"
            onPress={() => onApprove(id)}
            loading={isLoading}
            style={styles.approveButton}
          >
            Approve
          </Button>
        )}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  approveButton: {
    justifyContent: "center",
  },
});
