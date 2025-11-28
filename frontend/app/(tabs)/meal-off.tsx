import { useState, useEffect } from "react";
import { Text, Snackbar, ActivityIndicator } from "react-native-paper";
import {
  useTodayMealOff,
  useCustomMealOff,
  useToggleMeal,
  useSetCustomMealOff,
} from "../../src/hooks/useMealOff";
import { getErrorMessage } from "../../src/utils/errorHelper";
import {
  TodayMealCard,
  CustomRangeMealCard,
} from "../../src/components/meal-off";
import Loading from "@/src/components/common/Loading";
import Container from "@/src/components/common/Container";

export default function MealOffScreen() {
  // --- UI State ---
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
    if (customMealOff?.startDate) {
      setStartDate(new Date(customMealOff.startDate));
      setEndDate(new Date(customMealOff.endDate));
      setStartMeal(customMealOff.startMeal);
      setEndMeal(customMealOff.endMeal);
    }
  }, [customMealOff]);

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  const handleToggle = (meal: "lunch" | "dinner", newValue: boolean) => {
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
        startDate: startDate.toLocaleDateString("en-CA"),
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
      return <Loading size="large" />;
  }

  return (
    <Container>
      <Text variant="headlineMedium" className="text-center mb-5">
        Meal Off Management
      </Text>

      <TodayMealCard
        lunchOff={todayMealOff?.lunch || false}
        dinnerOff={todayMealOff?.dinner || false}
        isToggling={isToggling}
        onToggle={handleToggle}
      />

      <CustomRangeMealCard
        startDate={startDate}
        endDate={endDate}
        startMeal={startMeal}
        endMeal={endMeal}
        isLoading={isSettingCustom}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onStartMealChange={setStartMeal}
        onEndMealChange={setEndMeal}
        onSubmit={handleCustomSubmit}
      />

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        {snackbarMessage}
      </Snackbar>
    </Container>
  );
}
