import React, { useState } from "react";
import { useAllLunchOffs, useCancelLunchOffByUserId } from "../../../hooks/useMealOff";
import { getErrorMessage } from "../../../utils/errorHelper";
import MealOffUserList from "./MealOffUserList";
import CancelMealOffModal from "./CancelMealOffModal";

export default function LunchOffList() {
  const { data, isLoading, refetch, isRefetching } = useAllLunchOffs();
  const { mutate: cancelLunchOff, isPending: isCancelling } = useCancelLunchOffByUserId();

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
        cancelLunchOff(selectedUserId, {
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
        emptyMessage="No lunch offs for today"
        onRefresh={refetch}
        refreshing={isRefetching}
        onCancel={handleCancelPress}
      />
      <CancelMealOffModal
        visible={modalVisible}
        mealType="lunch"
        onDismiss={handleDismiss}
        onConfirm={handleConfirmCancel}
        isLoading={isCancelling}
        error={cancelError}
      />
    </>
  );
}
