import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  Card,
  Switch,
  Button,
  SegmentedButtons,
  Snackbar,
  ActivityIndicator,
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  useTodayMealOff,
  useCustomMealOff,
  useToggleMeal,
  useSetCustomMealOff,
} from "../../src/hooks/useMealOff";
import { getErrorMessage } from "../../src/utils/errorHelper";

export default function MealOffScreen() {
  // --- UI State ---
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // --- Form Input State ---
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startMeal, setStartMeal] = useState<"LUNCH" | "DINNER">("LUNCH");
  const [endMeal, setEndMeal] = useState<"LUNCH" | "DINNER">("DINNER");

  // --- Custom Hooks for Data Fetching & Mutations ---
  const { data: todayMealOff, isLoading: isLoadingToday } = useTodayMealOff();
  const { data: customMealOff, isLoading: isLoadingCustom } =
    useCustomMealOff();
  const { mutate: toggleMeal, isPending: isToggling } = useToggleMeal();
  const { mutate: setCustomMealOff, isPending: isSettingCustom } =
    useSetCustomMealOff();

  const isLoading = isLoadingToday || isLoadingCustom;

  // --- Sync local form state with server data ---
  useEffect(() => {
    if (todayMealOff) {
      // The switches are directly controlled by the query data to avoid flickering
    }
    if (customMealOff) {
      if (customMealOff.startDate) {
        setStartDate(new Date(customMealOff.startDate));
        setEndDate(new Date(customMealOff.endDate));
        setStartMeal(customMealOff.startMeal);
        setEndMeal(customMealOff.endMeal);
      }
    }
  }, [todayMealOff, customMealOff]);

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  const handleToggle = (meal: "lunch" | "dinner", newValue: boolean) => {
    // newValue is the NEW switch state the user wants
    // If newValue is true, user wants to turn meal OFF
    // If newValue is false, user wants to turn meal back ON (reverse)
    const currentlyOff =
      meal === "lunch" ? todayMealOff?.lunch : todayMealOff?.dinner;

    toggleMeal(
      { meal, currentlyOff: currentlyOff || false },
      {
        onSuccess: (data: any) => showSnackbar(data.data.data.message),
        onError: (error: any) =>
          showSnackbar(getErrorMessage(error, "An error occurred")),
      }
    );
  };

  const handleCustomSubmit = () => {
    if (startDate > endDate) {
      showSnackbar("Start date must be before or equal to end date.");
      return;
    }
    setCustomMealOff(
      {
        startDate: startDate.toLocaleDateString("en-CA"), // YYYY-MM-DD
        endDate: endDate.toLocaleDateString("en-CA"),
        startMeal,
        endMeal,
      },
      {
        onSuccess: () =>
          showSnackbar("Custom meal off range set successfully!"),
        onError: (error: any) =>
          showSnackbar(getErrorMessage(error, "Failed to set custom range")),
      }
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator animating={true} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text variant="headlineMedium" style={styles.header}>
        Meal Off Management
      </Text>
      <Card style={styles.card}>
        <Card.Title title="Today's Meal" />
        <Card.Content>
          <Text variant="bodySmall" style={styles.deadlineText}>
            Lunch deadline: 8:00 AM • Dinner deadline: 4:00 PM
          </Text>
          <View style={styles.row}>
            <Text variant="bodyLarge">Lunch Off</Text>
            <Switch
              disabled={isToggling}
              value={todayMealOff?.lunch || false}
              onValueChange={(val) => handleToggle("lunch", val)}
            />
          </View>
          <View style={styles.row}>
            <Text variant="bodyLarge">Dinner Off</Text>
            <Switch
              disabled={isToggling}
              value={todayMealOff?.dinner || false}
              onValueChange={(val) => handleToggle("dinner", val)}
            />
          </View>
        </Card.Content>
      </Card>
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
                if (d) setStartDate(d);
              }}
            />
          )}
          <SegmentedButtons
            value={startMeal}
            onValueChange={setStartMeal}
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
                if (d) setEndDate(d);
              }}
            />
          )}
          <SegmentedButtons
            value={endMeal}
            onValueChange={setEndMeal}
            buttons={[
              { value: "LUNCH", label: "Lunch" },
              { value: "DINNER", label: "Dinner" },
            ]}
            style={styles.segmentedButtons}
          />
          <Button
            mode="contained"
            style={styles.submitButton}
            onPress={handleCustomSubmit}
            loading={isSettingCustom}
          >
            Submit Custom Off
          </Button>
        </Card.Content>
      </Card>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        {snackbarMessage}
      </Snackbar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    marginBottom: 20,
  },
  deadlineText: {
    color: "#666",
    marginBottom: 10,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
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
