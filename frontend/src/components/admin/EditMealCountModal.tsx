import { useState, useEffect } from "react";
import { View } from "react-native";
import { Portal, Modal, TextInput, Button, HelperText, Text, useTheme } from "react-native-paper";
import { UpdateMealCountRequestDto } from "../../types/dto";
import { getErrorMessage } from "../../utils/errorHelper";

interface EditMealCountModalProps {
  visible: boolean;
  currentMeals: number;
  onDismiss: () => void;
  onSubmit: (data: UpdateMealCountRequestDto) => Promise<void>;
  isLoading: boolean;
}

export default function EditMealCountModal({
  visible,
  currentMeals,
  onDismiss,
  onSubmit,
  isLoading,
}: EditMealCountModalProps) {
  const theme = useTheme();

  const [updatedMeals, setUpdatedMeals] = useState("");
  const [reason, setReason] = useState("");
  const [mealsError, setMealsError] = useState("");
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (visible) {
      setUpdatedMeals(currentMeals?.toString() ?? "");
      setReason("");
      setMealsError("");
      setSubmitError("");
    }
  }, [visible, currentMeals]);

  const handleSubmit = async () => {
    const parsed = parseInt(updatedMeals, 10);
    if (isNaN(parsed) || parsed < 0) {
      setMealsError("Enter a valid non-negative number.");
      return;
    }
    setMealsError("");
    setSubmitError("");
    try {
      await onSubmit({
        updatedMeals: parsed,
        reason: reason.trim() || undefined,
      });
      onDismiss();
    } catch (err) {
      setSubmitError(getErrorMessage(err));
    }
  };

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
          style={{ marginBottom: 16, color: theme.colors.onSurface }}
        >
          Update Meal Count
        </Text>

        <TextInput
          label="Updated Meals"
          value={updatedMeals}
          onChangeText={(v) => {
            setUpdatedMeals(v);
            setMealsError("");
          }}
          keyboardType="numeric"
          mode="outlined"
          error={!!mealsError}
          style={{ marginBottom: 4 }}
        />
        {mealsError ? (
          <HelperText type="error" visible={!!mealsError}>
            {mealsError}
          </HelperText>
        ) : null}

        <TextInput
          label="Reason (optional)"
          value={reason}
          onChangeText={setReason}
          mode="outlined"
          style={{ marginTop: 12, marginBottom: 12 }}
          multiline
          numberOfLines={2}
        />

        {submitError ? (
          <View
            style={{
              backgroundColor: theme.colors.errorContainer,
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 8,
              marginBottom: 12,
            }}
          >
            <Text
              variant="bodySmall"
              style={{ color: theme.colors.onErrorContainer }}
            >
              {submitError}
            </Text>
          </View>
        ) : null}

        <View style={{ flexDirection: "row", justifyContent: "flex-end", gap: 8 }}>
          <Button mode="text" onPress={onDismiss} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            mode="contained"
            onPress={handleSubmit}
            loading={isLoading}
            disabled={isLoading}
          >
            Update
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}
