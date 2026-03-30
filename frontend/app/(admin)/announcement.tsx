import { useState } from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { Text, TextInput, Button, Switch, useTheme, HelperText, Snackbar, Card, Surface } from "react-native-paper";
import { useRouter } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useCreateAnnouncement } from "../../src/hooks/useNotifications";
import { getErrorMessage } from "../../src/utils/errorHelper";
import Container from "../../src/components/common/Container";

const MAX_MESSAGE_LENGTH = 500;

export default function MakeAnnouncementScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { mutate: createAnnouncement, isPending } = useCreateAnnouncement();

  const [message, setMessage] = useState("");
  const [notifyAllUsers, setNotifyAllUsers] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const charCount = message.length;
  const isOverLimit = charCount > MAX_MESSAGE_LENGTH;

  const handleSubmit = () => {
    if (!message.trim()) {
      setError("Please enter a message");
      return;
    }
    if (isOverLimit) {
      setError("Message exceeds character limit");
      return;
    }

    createAnnouncement(
      { message: message.trim(), notifyAllUsers },
      {
        onSuccess: () => {
          setSuccess(true);
          setMessage("");
          setNotifyAllUsers(false);
          setTimeout(() => {
            router.back();
          }, 1500);
        },
        onError: (err) => {
          setError(getErrorMessage(err, "Failed to send announcement"));
        },
      }
    );
  };

  return (
    <Container heading="Make Announcement" edges={["top"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ padding: 16 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header Info Card */}
          <Card style={{ marginBottom: 20 }}>
            <Card.Content style={{ flexDirection: "row", alignItems: "flex-start", gap: 12 }}>
              <Surface style={{ 
                backgroundColor: theme.colors.primaryContainer, 
                borderRadius: 12, 
                padding: 10 
              }}>
                <MaterialCommunityIcons
                  name="bullhorn"
                  size={24}
                  color={theme.colors.onPrimaryContainer}
                />
              </Surface>
              <View style={{ flex: 1 }}>
                <Text variant="titleMedium" style={{ fontWeight: "600", marginBottom: 4 }}>
                  Broadcast Message
                </Text>
                <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                  Your announcement will be sent as a notification to all selected users.
                </Text>
              </View>
            </Card.Content>
          </Card>

          {/* Message Input */}
          <View style={{ marginBottom: 16 }}>
            <Text variant="labelLarge" style={{ marginBottom: 8, fontWeight: "600" }}>
              Announcement Message
            </Text>
            <TextInput
              placeholder="Type your announcement here..."
              value={message}
              onChangeText={setMessage}
              mode="outlined"
              multiline
              numberOfLines={6}
              style={{ minHeight: 140, backgroundColor: theme.colors.surface }}
              contentStyle={{ paddingTop: 16 }}
              error={isOverLimit}
            />
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 4 }}>
              <HelperText type="error" visible={!message.trim() && error === "Please enter a message"}>
                Message is required
              </HelperText>
              <Text 
                variant="labelSmall" 
                style={{ color: isOverLimit ? theme.colors.error : theme.colors.onSurfaceVariant }}
              >
                {charCount}/{MAX_MESSAGE_LENGTH}
              </Text>
            </View>
          </View>

          {/* Recipient Selection */}
          <Text variant="labelLarge" style={{ marginBottom: 8, fontWeight: "600" }}>
            Recipients
          </Text>
          <Card style={{ marginBottom: 24 }}>
            <View style={{ padding: 16 }}>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row", alignItems: "center", flex: 1, gap: 12 }}>
                  <Surface style={{ 
                    backgroundColor: notifyAllUsers ? theme.colors.tertiaryContainer : theme.colors.secondaryContainer, 
                    borderRadius: 10, 
                    padding: 8 
                  }}>
                    <MaterialCommunityIcons
                      name={notifyAllUsers ? "account-group" : "account-check"}
                      size={20}
                      color={notifyAllUsers ? theme.colors.onTertiaryContainer : theme.colors.onSecondaryContainer}
                    />
                  </Surface>
                  <View style={{ flex: 1 }}>
                    <Text variant="bodyLarge" style={{ fontWeight: "600" }}>
                      {notifyAllUsers ? "All Users" : "Active Subscribers"}
                    </Text>
                    <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                      {notifyAllUsers
                        ? "Including inactive and unsubscribed users"
                        : "Only users with active subscriptions"}
                    </Text>
                  </View>
                </View>
                <Switch 
                  value={notifyAllUsers} 
                  onValueChange={setNotifyAllUsers}
                  color={theme.colors.primary}
                />
              </View>
            </View>
          </Card>

          {/* Submit Button */}
          <Button
            mode="contained"
            onPress={handleSubmit}
            loading={isPending}
            disabled={isPending || !message.trim() || isOverLimit}
            style={{ borderRadius: 12 }}
            contentStyle={{ paddingVertical: 8 }}
            icon="send"
          >
            {isPending ? "Sending..." : "Send Announcement"}
          </Button>

          {/* Cancel Button */}
          <Button
            mode="text"
            onPress={() => router.back()}
            disabled={isPending}
            style={{ marginTop: 8, borderRadius: 12 }}
          >
            Cancel
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>

      <Snackbar
        visible={!!error}
        onDismiss={() => setError(null)}
        duration={4000}
        action={{
          label: "Dismiss",
          onPress: () => setError(null),
        }}
      >
        {error}
      </Snackbar>

      <Snackbar
        visible={success}
        onDismiss={() => setSuccess(false)}
        duration={1500}
        style={{ backgroundColor: theme.colors.primary }}
      >
        Announcement sent successfully!
      </Snackbar>
    </Container>
  );
}
