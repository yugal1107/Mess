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
      isLoading={isLoading}
      submitLabel="Submit"
      onSubmit={handleSubmit}
      onCancel={handleCancelEdit}
    />
  );
}
