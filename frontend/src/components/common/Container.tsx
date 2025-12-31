import { SafeAreaView } from "react-native-safe-area-context";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  edges?: ("top" | "bottom" | "left" | "right")[];
}

export default function Container({ children, className = "", edges = ["left", "right"] }: ContainerProps) {
  return (
    <SafeAreaView className={`flex-1 ${className}`} edges={edges}>
      {children}
    </SafeAreaView>
  );
}