import { View } from "react-native";
import { Portal, Modal, Button, Text, useTheme } from "react-native-paper";

interface CancelMealOffModalProps {
  visible: boolean;
  mealType: "lunch" | "dinner";
  onDismiss: () => void;
  onConfirm: () => Promise<void>;
  isLoading: boolean;
  error?: string;
}

export default function CancelMealOffModal({
  visible,
  mealType,
  onDismiss,
  onConfirm,
  isLoading,
  error,
}: CancelMealOffModalProps) {
  const theme = useTheme();

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={() => {
          if (!isLoading) onDismiss();
        }}
        dismissable={!isLoading}
        contentContainerStyle={{
          backgroundColor: theme.colors.surface,
          marginHorizontal: 24,
          borderRadius: 16,
          padding: 24,
        }}
      >
        <Text
          variant="titleMedium"
          style={{ marginBottom: 12, color: theme.colors.onSurface }}
        >
          Cancel Meal Off
        </Text>

        <Text
          variant="bodyMedium"
          style={{ marginBottom: 20, color: theme.colors.onSurfaceVariant }}
        >
          Are you sure you want to cancel this user&apos;s {mealType} meal off? This
          action cannot be reversed.
        </Text>

        {error ? (
          <View
            style={{
              backgroundColor: theme.colors.errorContainer,
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 8,
              marginBottom: 16,
            }}
          >
            <Text
              variant="bodySmall"
              style={{ color: theme.colors.onErrorContainer }}
            >
              {error}
            </Text>
          </View>
        ) : null}

        <View style={{ flexDirection: "row", justifyContent: "flex-end", gap: 8 }}>
          <Button mode="text" onPress={onDismiss} disabled={isLoading}>
            Go Back
          </Button>
          <Button
            mode="contained"
            buttonColor={theme.colors.error}
            onPress={async () => {
              try {
                await onConfirm();
                onDismiss();
              } catch {
                // Error is handled by parent
              }
            }}
            loading={isLoading}
            disabled={isLoading}
          >
            Cancel Meal Off
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}
