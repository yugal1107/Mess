import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "react-native-paper";
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  edges?: ("top" | "bottom" | "left" | "right")[];
}

export default function Container({ children, className = "", edges = ["left", "right"] }: ContainerProps) {

  const theme = useTheme();
  return (
    <SafeAreaView className={`flex-1 ${className}`} edges={edges} style={{ backgroundColor: theme.colors.surfaceVariant }}>
      {children}
    </SafeAreaView>
  );
}