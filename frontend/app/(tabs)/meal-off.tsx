import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
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
import apiClient from "../../src/api/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TodayMealOffDto, CustomMealOffDto } from "../../src/types/dto"; // Import DTOs

// --- API Functions ---
const fetchTodayMealOff = async (): Promise<TodayMealOffDto> => {
  const response = await apiClient.get("/mealoff/today");
  return response.data.data;
};

const fetchCustomMealOff = async (): Promise<CustomMealOffDto> => {
  const response = await apiClient.get("/mealoff/custom");
  return response.data.data;
};

const toggleMeal = (meal: "lunch" | "dinner") =>
  apiClient.post(`/mealoff/${meal}`);
const setCustomMealOff = (data: Omit<CustomMealOffDto, "id" | "userId">) =>
  apiClient.post("/mealoff", data);

export default function MealOffScreen() {
  const queryClient = useQueryClient();

  // --- State for UI that doesn't come from the server ---
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // --- Local state for form inputs, to be synced with server data ---
  const [isLunchOff, setIsLunchOff] = useState(false);
  const [isDinnerOff, setIsDinnerOff] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startMeal, setStartMeal] = useState<"LUNCH" | "DINNER">("LUNCH");
  const [endMeal, setEndMeal] = useState<"LUNCH" | "DINNER">("DINNER");

  // --- Data Fetching ---
  const {
    data: todayMealOff,
    isLoading: isLoadingToday,
    isError: isErrorToday,
    error: errorToday,
  } = useQuery({
    queryKey: ["todayMealOff"],
    queryFn: fetchTodayMealOff,
  });

  const {
    data: customMealOff,
    isLoading: isLoadingCustom,
    isError: isErrorCustom,
    error: errorCustom,
  } = useQuery({
    queryKey: ["customMealOff"],
    queryFn: fetchCustomMealOff,
  });

  const isLoading = isLoadingToday || isLoadingCustom;
  const isError = isErrorToday || isErrorCustom;
  const error = errorToday || errorCustom;

  // --- Sync local state with server data ---
  useEffect(() => {
    if (todayMealOff) {
      setIsLunchOff(todayMealOff.lunch);
      setIsDinnerOff(todayMealOff.dinner);
    }
    if (customMealOff) {
      if (
        customMealOff.startDate &&
        customMealOff.endDate &&
        customMealOff.startMeal &&
        customMealOff.endMeal
      ) {
        setStartDate(new Date(customMealOff.startDate));
        setEndDate(new Date(customMealOff.endDate));
        setStartMeal(customMealOff.startMeal);
        setEndMeal(customMealOff.endMeal);
      }
    }
  }, [todayMealOff, customMealOff]);

  // --- Mutations ---
  const mealToggleMutation = useMutation({
    mutationFn: toggleMeal,
    onSuccess: (data) => {
      showSnackbar(data.data.data.message);
      queryClient.invalidateQueries({ queryKey: ["todayMealOff"] });
    },
    onError: (error: any) => {
      showSnackbar(error.response?.data?.error?.error || "An error occurred");
      queryClient.invalidateQueries({ queryKey: ["todayMealOff"] });
    },
  });

  const customMealOffMutation = useMutation({
    mutationFn: setCustomMealOff,
    onSuccess: () => {
      showSnackbar("Custom meal off range set successfully!");
      queryClient.invalidateQueries({ queryKey: ["customMealOff"] });
    },
    onError: (error: any) => {
      showSnackbar(
        error.response?.data?.error?.error || "Failed to set custom range"
      );
    },
  });

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  const handleToggle = (meal: "lunch" | "dinner", value: boolean) => {
    if (value === false) {
      showSnackbar("To re-enable a meal, please contact the admin for now.");
      return;
    }
    mealToggleMutation.mutate(meal);
  };

  const handleCustomSubmit = () => {
    if (startDate > endDate) {
      showSnackbar("Start date must be before or equal to end date.");
      return;
    }
    if (
      startDate.toDateString() === endDate.toDateString() &&
      startMeal === "DINNER" &&
      endMeal === "LUNCH"
    ) {
      showSnackbar(
        "End meal must be after or equal to start meal on the same day."
      );
      return;
    }
    customMealOffMutation.mutate({
      startDate: startDate.toLocaleDateString("en-CA"),
      endDate: endDate.toLocaleDateString("en-CA"),
      startMeal,
      endMeal,
    });
  };

  if (isLoading) {
    return <ActivityIndicator animating={true} style={styles.container} />;
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <Text variant="bodyLarge" style={styles.errorText}>
          Failed to load meal off status: {error?.message || "Unknown error"}
        </Text>
        <Button
          mode="outlined"
          onPress={() => {
            queryClient.invalidateQueries({ queryKey: ["todayMealOff"] });
            queryClient.invalidateQueries({ queryKey: ["customMealOff"] });
          }}
          style={styles.retryButton}
        >
          Retry
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.header}>
        Meal Off Management
      </Text>

      <Card style={styles.card}>
        <Card.Title title="Today's Meal" />
        <Card.Content>
          <View style={styles.row}>
            <Text variant="bodyLarge">Lunch Off</Text>
            <Switch
              disabled={mealToggleMutation.isPending}
              value={isLunchOff}
              onValueChange={(val) => handleToggle("lunch", val)}
            />
          </View>
          <View style={styles.row}>
            <Text variant="bodyLarge">Dinner Off</Text>
            <Switch
              disabled={mealToggleMutation.isPending}
              value={isDinnerOff}
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
            loading={customMealOffMutation.isPending}
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
    </View>
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
  errorText: {
    color: "red",
    marginBottom: 20,
    textAlign: "center",
  },
  retryButton: {
    marginTop: 10,
  },
});
