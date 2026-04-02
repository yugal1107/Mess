import { KeyboardAvoidingView, Platform, ScrollView, ViewStyle, StyleProp } from "react-native";
import { useTheme } from "react-native-paper";
import { ReactNode } from "react";

interface AuthFormContainerProps {
  children: ReactNode;
  keyboardVerticalOffset?: number;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

export default function AuthFormContainer({
  children,
  keyboardVerticalOffset = Platform.OS === "ios" ? 0 : 24,
  contentContainerStyle,
}: AuthFormContainerProps) {
  const theme = useTheme();

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={{ backgroundColor: theme.colors.surface }}
    >
      <ScrollView
        contentContainerStyle={[
          { flexGrow: 1, justifyContent: "center", padding: 20 },
          contentContainerStyle,
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}