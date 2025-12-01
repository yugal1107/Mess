import { useState } from "react";
import { View } from "react-native";
import { Card, Button, Text, useTheme } from "react-native-paper";
import DateMealPicker from "./DateMealPicker";

type MealType = "LUNCH" | "DINNER";

export interface MealOffFormData {
  startDate: Date;
  endDate: Date;
  startMeal: MealType;
  endMeal: MealType;
}

interface MealOffFormProps {
  title: string;
  initialData?: MealOffFormData;
  isLoading: boolean;
  submitLabel: string;
  onSubmit: (data: MealOffFormData) => void;
  onCancel: () => void;
}

export default function MealOffForm({
  title,
  initialData,
  isLoading,
  submitLabel,
  onSubmit,
  onCancel,
}: MealOffFormProps) {
  const theme = useTheme();

  // Form state
  const [startDate, setStartDate] = useState(
    initialData?.startDate || new Date()
  );
  const [endDate, setEndDate] = useState(initialData?.endDate || new Date());
  const [startMeal, setStartMeal] = useState<MealType>(
    initialData?.startMeal || "LUNCH"
  );
  const [endMeal, setEndMeal] = useState<MealType>(
    initialData?.endMeal || "DINNER"
  );

  const handleSubmit = () => {
    onSubmit({ startDate, endDate, startMeal, endMeal });
  };

  return (
    <Card className="mb-5">
      <Card.Title title={title} titleVariant="headlineSmall" />
      <Card.Content>
        <Text
          variant="bodySmall"
          className="mb-4"
          style={{ color: theme.colors.outline }}
        >
          Select the start and end dates along with the meal type for each.
        </Text>

        <DateMealPicker
          label="Start"
          date={startDate}
          meal={startMeal}
          minimumDate={new Date()}
          onDateChange={setStartDate}
          onMealChange={setStartMeal}
        />

        <DateMealPicker
          label="End"
          date={endDate}
          meal={endMeal}
          minimumDate={startDate}
          onDateChange={setEndDate}
          onMealChange={setEndMeal}
        />

        <View className="flex-row gap-2">
          <Button mode="outlined" onPress={onCancel} className="flex-1">
            Cancel
          </Button>
          <Button
            mode="contained"
            onPress={handleSubmit}
            loading={isLoading}
            disabled={isLoading}
            className="flex-1"
          >
            {submitLabel}
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
}
