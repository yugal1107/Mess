import { useState } from "react";
import ActiveMealOffCard from "./ActiveMealOffCard";
import EmptyMealOffCard from "./EmptyMealOffCard";
import MealOffForm, { MealOffFormData } from "./MealOffForm";

type MealType = "LUNCH" | "DINNER";

interface CustomMealOffData {
  startDate: string | null;
  endDate: string | null;
  startMeal: MealType | null;
  endMeal: MealType | null;
}

interface CustomRangeMealCardProps {
  currentMealOff: CustomMealOffData | null;
  isLoading: boolean;
  isCancelling: boolean;
  onSubmit: (data: MealOffFormData) => void;
  onCancel: () => void;
}

/**
 * Renders a card that displays an active custom-range meal-off, an empty state, or a form to create one.
 *
 * When `currentMealOff` contains both `startDate` and `endDate`, the active meal-off view is shown.
 * Otherwise it shows an empty state that can open the creation form; while editing the creation form is shown.
 *
 * @param currentMealOff - Current custom meal-off range or `null` if none; `startDate`/`endDate` are ISO date strings or `null`.
 * @param isLoading - Whether the form submit action is in progress.
 * @param isCancelling - Whether an active meal-off cancellation is in progress.
 * @param onSubmit - Called with form data when the user submits the create form.
 * @param onCancel - Called when the user cancels an active meal-off.
 * @returns A React element showing either the active meal-off, the empty state, or the meal-off creation form.
 */
export default function CustomRangeMealCard({
  currentMealOff,
  isLoading,
  isCancelling,
  onSubmit,
  onCancel,
}: CustomRangeMealCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  const hasActiveMealOff = currentMealOff?.startDate && currentMealOff?.endDate;

  const handleStartEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSubmit = (data: MealOffFormData) => {
    onSubmit(data);
    setIsEditing(false);
  };

  const getInitialFormData = (): MealOffFormData | undefined => {
    if (!hasActiveMealOff) return undefined;
    return {
      startDate: new Date(currentMealOff.startDate!),
      endDate: new Date(currentMealOff.endDate!),
      startMeal: currentMealOff.startMeal || "LUNCH",
      endMeal: currentMealOff.endMeal || "DINNER",
    };
  };

  // Show active meal-off details
  if (hasActiveMealOff) {
    return (
      <ActiveMealOffCard
        startDate={currentMealOff.startDate!}
        endDate={currentMealOff.endDate!}
        startMeal={currentMealOff.startMeal}
        endMeal={currentMealOff.endMeal}
        isCancelling={isCancelling}
        onCancel={onCancel}
      />
    );
  }

  // Show empty state or create form
  if (!isEditing) {
    return <EmptyMealOffCard onSetMealOff={handleStartEdit} />;
  }

  // Show create form
  return (
    <MealOffForm
      title="Set Custom Meal Off"
      initialData={getInitialFormData()}
      isLoading={isLoading}
      submitLabel="Submit"
      onSubmit={handleSubmit}
      onCancel={handleCancelEdit}
    />
  );
}
