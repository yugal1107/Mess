import React, { useState } from "react";
import { View } from "react-native";
import { SegmentedButtons, Text } from "react-native-paper";
import LunchOffList from "../../src/components/admin/meals/LunchOffList";
import DinnerOffList from "../../src/components/admin/meals/DinnerOffList";
import CustomOffList from "../../src/components/admin/meals/CustomOffList";
import Container from "../../src/components/common/Container";

export default function MealOffsScreen() {
  const [value, setValue] = useState("lunch");

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
    <Container className="px-2.5 pt-5" edges={["top"]}>
      <Text variant="headlineLarge" className="my-4 mx-5">
        Meal Offs
      </Text>
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
