import { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import { Snackbar, useTheme } from "react-native-paper";
import { AxiosError, AxiosResponse } from "axios";
import { ApiResponse, TodayMealOffDto } from "../../src/types/dto";
import {
  useTodayMealOff,
  useCustomMealOff,
  useToggleMeal,
  useSetCustomMealOff,
  useCancelCustomMealOff,
} from "../../src/hooks/useMealOff";
import { getErrorMessage } from "../../src/utils/errorHelper";
import {
  TodayMealCard,
  CustomRangeMealCard,
} from "../../src/components/meal-off";
import Loading from "@/src/components/common/Loading";
import Container from "@/src/components/common/Container";
import EmptyState from "@/src/components/common/EmptyState";
import ErrorScreen from "@/src/components/common/ErrorScreen";

/**
 * Render the Meal Off screen for viewing and managing today's and custom meal-off periods.
 *
 * Fetches today's meal-off and any custom meal-off range, displays loading and error states
 * (including a special "not subscribed" empty state), and provides UI to:
 * - toggle lunch or dinner off for today,
 * - create a custom meal-off date range,
 * - cancel an existing custom range.
 *
 * The screen supports pull-to-refresh and shows user feedback via a snackbar.
 *
 * @returns The JSX element for the Meal Off screen.
 */
export default function MealOffScreen() {
  const theme = useTheme();
  // --- UI State ---
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // --- Custom Hooks for Data Fetching & Mutations ---
  const {
    data: todayMealOff,
    isLoading: isLoadingToday,
    isFetching: isFetchingToday,
    error: todayError,
    refetch: refetchToday,
  } = useTodayMealOff();
  const {
    data: customMealOff,
    isLoading: isLoadingCustom,
    isFetching: isFetchingCustom,
    error: customError,
    refetch: refetchCustom,
  } = useCustomMealOff();
  const { mutate: toggleMeal, isPending: isToggling } = useToggleMeal();
  const { mutate: setCustomMealOff, isPending: isSettingCustom } =
    useSetCustomMealOff();
  const { mutate: cancelCustomMealOff, isPending: isCancellingCustom } =
    useCancelCustomMealOff();

  const isLoading = isLoadingToday || isLoadingCustom;
  const isRefreshing = isFetchingToday || isFetchingCustom;

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  const handleRetry = () => {
    refetchToday();
    refetchCustom();
  };

  // Handle 400 Error (Not Subscribed)
  const error = todayError || customError;
  if (error) {
    const axiosError = error as AxiosError;
    const status = axiosError?.response?.status;

    if (status === 400) {
      return (
        <Container className="p-5">
          <EmptyState
            icon="account-off-outline"
            message="You do not have an active subscription. Please subscribe to manage meal offs."
          />
        </Container>
      );
    }

    // Handle other API errors
    return (
      <ErrorScreen
        message={getErrorMessage(error, "Failed to load meal off data")}
        onRetry={handleRetry}
      />
    );
  }

  const handleToggle = (meal: "lunch" | "dinner") => {
    const currentlyOff =
      meal === "lunch" ? todayMealOff?.lunch : todayMealOff?.dinner;

    toggleMeal(
      { meal, currentlyOff: currentlyOff || false },
      {
        onSuccess: (response: AxiosResponse<ApiResponse<TodayMealOffDto>>) =>
          showSnackbar(response.data.data.message || "Meal updated!"),
        onError: (err: Error) =>
          showSnackbar(getErrorMessage(err, "Failed to update meal")),
      }
    );
  };

  const handleCustomSubmit = (data: {
    startDate: Date;
    endDate: Date;
    startMeal: "LUNCH" | "DINNER";
    endMeal: "LUNCH" | "DINNER";
  }) => {
    if (data.startDate > data.endDate) {
      showSnackbar("Start date must be before or equal to end date.");
      return;
    }
    setCustomMealOff(
      {
        startDate: data.startDate.toLocaleDateString("en-CA"),
        endDate: data.endDate.toLocaleDateString("en-CA"),
        startMeal: data.startMeal,
        endMeal: data.endMeal,
      },
      {
        onSuccess: () => showSnackbar("Custom meal off set successfully!"),
        onError: (err: Error) =>
          showSnackbar(getErrorMessage(err, "Failed to set custom meal off")),
      }
    );
  };

  const handleCancelCustom = () => {
    cancelCustomMealOff(undefined, {
      onSuccess: () => showSnackbar("Custom meal off cancelled"),
      onError: (err: Error) =>
        showSnackbar(getErrorMessage(err, "Failed to cancel custom meal off")),
    });
  };

  if (isLoading) {
    return <Loading size="large" />;
  }

  return (
    <Container className="px-2.5 pt-5" edges={["top"]} heading="Meal Off">
      <ScrollView 
        contentContainerStyle={{ paddingBottom: 24 }} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRetry}
            colors={[theme.colors.primary]}
          />
        }
      >
        <TodayMealCard
          lunchOff={todayMealOff?.lunch || false}
          dinnerOff={todayMealOff?.dinner || false}
          isToggling={isToggling}
          onToggle={handleToggle}
        />

        <CustomRangeMealCard
          currentMealOff={customMealOff || null}
          isLoading={isSettingCustom}
          isCancelling={isCancellingCustom}
          onSubmit={handleCustomSubmit}
          onCancel={handleCancelCustom}
        />
      </ScrollView>

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
