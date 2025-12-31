import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { SegmentedButtons, useTheme } from "react-native-paper";
import LunchOffList from "../../src/components/admin/meals/LunchOffList";
import DinnerOffList from "../../src/components/admin/meals/DinnerOffList";
import CustomOffList from "../../src/components/admin/meals/CustomOffList";
import Container from "../../src/components/common/Container";

export default function MealOffsScreen() {
  const [value, setValue] = useState("lunch");
  const theme = useTheme();

  const renderContent = () => {
    switch (value) {
      case "lunch":
        return <LunchOffList />;
      case "dinner":
        return <DinnerOffList />;
      case "custom":
        return <CustomOffList />;
      default:
        return <LunchOffList />;
    }
  };

  return (
    <Container className="p-2.5">
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: "lunch",
            label: "Lunch",
            icon: "food",
          },
          {
            value: "dinner",
            label: "Dinner",
            icon: "food-variant",
          },
          {
            value: "custom",
            label: "Custom",
            icon: "calendar-range",
          },
        ]}
        style={{ marginBottom: 10 }}
      />
      <View className="flex-1">{renderContent()}</View>
    </Container>
  );
}
