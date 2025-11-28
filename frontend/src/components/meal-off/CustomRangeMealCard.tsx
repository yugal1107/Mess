import { useState } from "react";
import { StyleSheet } from "react-native";
import { Card, Button, SegmentedButtons } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

type MealType = "LUNCH" | "DINNER";

interface CustomRangeMealCardProps {
  startDate: Date;
  endDate: Date;
  startMeal: MealType;
  endMeal: MealType;
  isLoading: boolean;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
  onStartMealChange: (meal: MealType) => void;
  onEndMealChange: (meal: MealType) => void;
  onSubmit: () => void;
}

export default function CustomRangeMealCard({
  startDate,
  endDate,
  startMeal,
  endMeal,
  isLoading,
  onStartDateChange,
  onEndDateChange,
  onStartMealChange,
  onEndMealChange,
  onSubmit,
}: CustomRangeMealCardProps) {
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  return (
    <Card style={styles.card}>
      <Card.Title title="Custom Date Range" />
      <Card.Content>
        <Button
          onPress={() => setShowStartDatePicker(true)}
          mode="outlined"
          style={styles.dateButton}
        >
          Start Date: {startDate.toLocaleDateString()}
        </Button>
        {showStartDatePicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={(e, d) => {
              setShowStartDatePicker(false);
              if (d) onStartDateChange(d);
            }}
          />
        )}
        <SegmentedButtons
          value={startMeal}
          onValueChange={(value) => onStartMealChange(value as MealType)}
          buttons={[
            { value: "LUNCH", label: "Lunch" },
            { value: "DINNER", label: "Dinner" },
          ]}
          style={styles.segmentedButtons}
        />
        <Button
          onPress={() => setShowEndDatePicker(true)}
          mode="outlined"
          style={styles.dateButton}
        >
          End Date: {endDate.toLocaleDateString()}
        </Button>
        {showEndDatePicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            onChange={(e, d) => {
              setShowEndDatePicker(false);
              if (d) onEndDateChange(d);
            }}
          />
        )}
        <SegmentedButtons
          value={endMeal}
          onValueChange={(value) => onEndMealChange(value as MealType)}
          buttons={[
            { value: "LUNCH", label: "Lunch" },
            { value: "DINNER", label: "Dinner" },
          ]}
          style={styles.segmentedButtons}
        />
        <Button
          mode="contained"
          style={styles.submitButton}
          onPress={onSubmit}
          loading={isLoading}
        >
          Submit Custom Off
        </Button>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
  },
  dateButton: {
    marginBottom: 10,
  },
  segmentedButtons: {
    marginBottom: 20,
  },
  submitButton: {
    marginTop: 10,
  },
});
