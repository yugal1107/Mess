import { SafeAreaView } from "react-native-safe-area-context";

export default function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <SafeAreaView className={`flex-1 p-5 ${className}`}>
      {children}
    </SafeAreaView>
  );
}