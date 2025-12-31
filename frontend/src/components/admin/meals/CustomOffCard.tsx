import React, { useState } from "react";
import { View, LayoutAnimation, Platform, UIManager } from "react-native";
import {
  Card,
  Text,
  Button,
  useTheme,
  Avatar,
  Divider,
} from "react-native-paper";
import { CustomOffDetailDto } from "../../../types/dto";
import { useCancelCustomOffByUserId } from "../../../hooks/useMealOff";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// Enable LayoutAnimation for Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface CustomOffCardProps {
  item: CustomOffDetailDto;
}

export default function CustomOffCard({ item }: CustomOffCardProps) {
  const theme = useTheme();
  const { mutate: cancelOff, isPending } = useCancelCustomOffByUserId();
  const [expanded, setExpanded] = useState(false);

  const handleCancel = () => {
    cancelOff(item.user.id);
  };

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <Card
      className="mx-2 my-2 rounded-xl"
      mode="elevated"
      style={{ backgroundColor: theme.colors.elevation.level1 }}
      onPress={toggleExpand}
    >
      <Card.Content>
        {/* Header: User Info */}
        <View className="flex-row items-center mb-4">
          <Avatar.Text
            size={40}
            label={getInitials(item.user.name)}
            style={{ backgroundColor: theme.colors.primaryContainer }}
            color={theme.colors.onPrimaryContainer}
          />
          <View className="ml-3 flex-1">
            <Text variant="titleMedium" className="font-bold" numberOfLines={1}>
              {item.user.name}
            </Text>
            <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
              {item.user.email}
            </Text>
          </View>
          <MaterialCommunityIcons
            name={expanded ? "chevron-up" : "chevron-down"}
            size={24}
            color={theme.colors.outline}
          />
        </View>

        <Divider className="mb-4" />

        {/* Date & Meal Info */}
        <View className="flex-row justify-between items-center mb-2">
          {/* Start Section */}
          <View className="flex-1 mr-2">
            <View className="flex-row items-center mb-1">
              <MaterialCommunityIcons
                name="calendar-start"
                size={16}
                color={theme.colors.primary}
              />
              <Text
                variant="labelMedium"
                style={{ color: theme.colors.primary, marginLeft: 4 }}
              >
                FROM
              </Text>
            </View>
            <Text variant="bodyLarge" className="font-semibold">
              {formatDate(item.customMealOff.startDate)}
            </Text>
            <Text
              variant="bodySmall"
              className="capitalize text-gray-500"
              style={{ textTransform: "capitalize" }}
            >
              {item.customMealOff.startMeal?.toLowerCase()}
            </Text>
          </View>

          {/* Long Arrow Visual */}
          <View className="flex-1 flex-row items-center justify-center px-1">
            <View
              className="h-[2px] flex-1 rounded-full"
              style={{ backgroundColor: theme.colors.outlineVariant }}
            />
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color={theme.colors.outlineVariant}
              style={{ marginLeft: -4 }}
            />
          </View>

          {/* End Section */}
          <View className="flex-1 ml-2 items-end">
            <View className="flex-row items-center mb-1">
              <Text
                variant="labelMedium"
                style={{ color: theme.colors.error, marginRight: 4 }}
              >
                TO
              </Text>
              <MaterialCommunityIcons
                name="calendar-end"
                size={16}
                color={theme.colors.error}
              />
            </View>
            <Text variant="bodyLarge" className="font-semibold text-right">
              {formatDate(item.customMealOff.endDate)}
            </Text>
            <Text
              variant="bodySmall"
              className="capitalize text-gray-500 text-right"
              style={{ textTransform: "capitalize" }}
            >
              {item.customMealOff.endMeal?.toLowerCase()}
            </Text>
          </View>
        </View>
      </Card.Content>

      {expanded && (
        <Card.Actions className="pt-0 border-t border-gray-100 dark:border-gray-800 mt-2">
          <Button
            mode="text"
            textColor={theme.colors.error}
            onPress={handleCancel}
            loading={isPending}
            disabled={isPending}
            icon="close-circle-outline"
            className="w-full"
          >
            Cancel Meal Off
          </Button>
        </Card.Actions>
      )}
    </Card>
  );
}
