import { ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Loading({ size = "small", className = "" }: { size?: "small" | "large"; className?: string }) {
  return (
    <SafeAreaView className={`flex-1 justify-center items-center ${className}`}>
      <ActivityIndicator animating={true} size={size} />
    </SafeAreaView>
  );
}
