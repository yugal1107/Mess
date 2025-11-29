import { useState, useEffect } from "react";
import { Text, Snackbar } from "react-native-paper";
import { AxiosError, AxiosResponse } from "axios";
import { ApiResponse, TodayMealOffDto } from "../../src/types/dto";
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
import EmptyState from "@/src/components/common/EmptyState";

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
  const {
    data: todayMealOff,
    isLoading: isLoadingToday,
    error: todayError,
  } = useTodayMealOff();
  const {
    data: customMealOff,
    isLoading: isLoadingCustom,
    error: customError,
  } = useCustomMealOff();
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

  // Handle 400 Error (Not Subscribed)
  const error = todayError || customError;
  if (error) {
    const status = (error as AxiosError)?.response?.status;
    if (status === 400) {
      return (
        <Container className="p-5">
          {/* <Text variant="headlineMedium" className="text-center mb-5">
            Meal Off Management
          </Text> */}
          <EmptyState
            icon="account-off-outline"
            message="You do not have an active subscription. Please subscribe to manage meal offs."
          />
        </Container>
      );
    }
  }

  const handleToggle = (meal: "lunch" | "dinner", newValue: boolean) => {
    const currentlyOff =
      meal === "lunch" ? todayMealOff?.lunch : todayMealOff?.dinner;

    toggleMeal(
      { meal, currentlyOff: currentlyOff || false },
      {
        onSuccess: (response: AxiosResponse<ApiResponse<TodayMealOffDto>>) =>
          showSnackbar(response.data.data.message || "Meal updated!"),
        onError: (error: Error) =>
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
        onError: (error: Error) =>
          showSnackbar(getErrorMessage(error, "Failed to set custom range")),
      }
    );
  };

  if (isLoading) {
    return <Loading size="large" />;
  }

  return (
    <Container className="px-5">
      {/* <Text variant="headlineMedium" className="text-center mb-5">
        Meal Off Management
      </Text> */}
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
