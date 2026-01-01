import { useState } from "react";
import { View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
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
    <View
      className="mb-5 rounded-3xl overflow-hidden"
      style={{
        backgroundColor: theme.colors.elevation.level1,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
      }}
    >
      {/* Header Section */}
      <View
        className="p-4 flex-row items-center gap-3"
        style={{ backgroundColor: theme.colors.primaryContainer }}
      >
        <View className="p-2 rounded-full bg-white/30">
          <MaterialCommunityIcons
            name="calendar-edit"
            size={35}
            color={theme.colors.onPrimaryContainer}
          />
        </View>
        <View>
          <Text
            variant="titleMedium"
            className="font-semibold text-2xl"
            style={{ color: theme.colors.onPrimaryContainer }}
          >
            {title}
          </Text>
          <Text
            variant="labelMedium"
            style={{ color: theme.colors.onPrimaryContainer, opacity: 0.8 }}
          >
            Select Dates & Meals
          </Text>
        </View>
      </View>

      <View className="p-5">
        <Text
          variant="bodyMedium"
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

        <View className="flex-row gap-2 mt-2">
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
      </View>
    </View>
  );
}
