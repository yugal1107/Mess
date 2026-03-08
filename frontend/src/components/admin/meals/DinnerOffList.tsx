import React, { useState } from "react";
import { useAllDinnerOffs, useCancelDinnerOffByUserId } from "../../../hooks/useMealOff";
import { getErrorMessage } from "../../../utils/errorHelper";
import MealOffUserList from "./MealOffUserList";
import CancelMealOffModal from "./CancelMealOffModal";

export default function DinnerOffList() {
  const { data, isLoading, refetch, isRefetching } = useAllDinnerOffs();
  const { mutate: cancelDinnerOff, isPending: isCancelling } = useCancelDinnerOffByUserId();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [cancelError, setCancelError] = useState<string>("");

  const handleCancelPress = (userId: string) => {
    setSelectedUserId(userId);
    setCancelError("");
    setModalVisible(true);
  };

  const handleConfirmCancel = async () => {
    if (!selectedUserId) return;
    setCancelError("");
    try {
      await new Promise<void>((resolve, reject) => {
        cancelDinnerOff(selectedUserId, {
          onSuccess: () => resolve(),
          onError: (error) => reject(error),
        });
      });
    } catch (err) {
      setCancelError(getErrorMessage(err));
      throw err;
    }
  };

  const handleDismiss = () => {
    setModalVisible(false);
    setSelectedUserId(null);
    setCancelError("");
  };

  return (
    <>
      <MealOffUserList
        data={data}
        isLoading={isLoading}
        emptyMessage="No dinner offs for today"
        onRefresh={refetch}
        refreshing={isRefetching}
        onCancel={handleCancelPress}
      />
      <CancelMealOffModal
        visible={modalVisible}
        mealType="dinner"
        onDismiss={handleDismiss}
        onConfirm={handleConfirmCancel}
        isLoading={isCancelling}
        error={cancelError}
      />
    </>
  );
}
