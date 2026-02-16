import { SafeAreaView } from "react-native-safe-area-context";
import { Text, useTheme } from "react-native-paper";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  edges?: ("top" | "bottom" | "left" | "right")[];
  heading?: string;
  headingVariant?: "headlineLarge" | "headlineMedium" | "headlineSmall";
}

export default function Container({
  children,
  className = "",
  edges = ["left", "right"],
  heading,
  headingVariant = "headlineMedium",
}: ContainerProps) {
  const theme = useTheme();

  return (
    <SafeAreaView
      className={`flex-1 ${className}`}
      edges={edges}
      style={{ backgroundColor: theme.colors.surfaceVariant }}
    >
      {heading && (
        <Text
          variant={headingVariant}
          className="my-4 mr-5 ml-3 font-semibold"
          style={{ color: theme.colors.primary }}
        >
          {heading}
        </Text>
      )}
      {children}
    </SafeAreaView>
  );
}
