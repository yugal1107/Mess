import { useState } from "react";
import { View } from "react-native";
import { Button, SegmentedButtons, Text } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

type MealType = "LUNCH" | "DINNER";

interface DateMealPickerProps {
  label: string;
  date: Date;
  meal: MealType;
  minimumDate?: Date;
  onDateChange: (date: Date) => void;
  onMealChange: (meal: MealType) => void;
}

export default function DateMealPicker({
  label,
  date,
  meal,
  minimumDate,
  onDateChange,
  onMealChange,
}: DateMealPickerProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <View className="mb-4">
      <Text variant="labelMedium" className="mb-2">
        {label}
      </Text>
      <Button
        onPress={() => setShowDatePicker(true)}
        mode="outlined"
        className="mb-2"
      >
        {date.toLocaleDateString()}
      </Button>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          minimumDate={minimumDate}
          onChange={(e, d) => {
            setShowDatePicker(false);
            if (d) onDateChange(d);
          }}
        />
      )}
      <SegmentedButtons
        value={meal}
        onValueChange={(value) => onMealChange(value as MealType)}
        buttons={[
          { value: "LUNCH", label: "Lunch" },
          { value: "DINNER", label: "Dinner" },
        ]}
      />
    </View>
  );
}
