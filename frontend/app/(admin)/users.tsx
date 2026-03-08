import { useState, useRef, useCallback } from "react";
import { View, FlatList, Modal, TouchableWithoutFeedback, StyleSheet } from "react-native";
import {
  Text,
  Badge,
  Searchbar,
  Divider,
  useTheme,
  Icon,
  Surface,
  TouchableRipple,
} from "react-native-paper";
import { useRouter } from "expo-router";
import { useUsers, useSearchUsers } from "../../src/hooks/useUsers";
import { SubscriptionStatus, SubscriptionType } from "../../src/types/dto";
import { UserListItem } from "../../src/components/admin";
import Container from "../../src/components/common/Container";
import Loading from "../../src/components/common/Loading";
import EmptyState from "../../src/components/common/EmptyState";
import ErrorScreen from "../../src/components/common/ErrorScreen";

type StatusFilter = SubscriptionStatus | "ALL";
type TypeFilter = SubscriptionType | "ALL";

interface Option<T extends string> {
  label: string;
  value: T;
}

const STATUS_OPTIONS: Option<StatusFilter>[] = [
  { label: "All Statuses", value: "ALL" },
  { label: "Active", value: "ACTIVE" },
  { label: "Requested", value: "REQUESTED" },
  { label: "Inactive", value: "INACTIVE" },
];

const TYPE_OPTIONS: Option<TypeFilter>[] = [
  { label: "All Types", value: "ALL" },
  { label: "Mess", value: "MESS" },
  { label: "Home Delivery", value: "HOME_DELIVERY" },
];

// --- Standalone Dropdown using RN Modal (no Menu positioning issues) ---
interface DropdownProps<T extends string> {
  label: string;
  disabled?: boolean;
  options: Option<T>[];
  selectedValue: T;
  onSelect: (value: T) => void;
}

function Dropdown<T extends string>({
  label,
  disabled,
  options,
  selectedValue,
  onSelect,
}: DropdownProps<T>) {
  const theme = useTheme();
  const buttonRef = useRef<View>(null);
  const [visible, setVisible] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });

  const openDropdown = useCallback(() => {
    if (disabled) return;
    buttonRef.current?.measureInWindow((x, y, width, height) => {
      setDropdownPos({ top: y + height + 6, left: x, width });
      setVisible(true);
    });
  }, [disabled]);

  const closeDropdown = useCallback(() => setVisible(false), []);

  const handleSelect = useCallback(
    (value: T) => {
      onSelect(value);
      closeDropdown();
    },
    [onSelect, closeDropdown]
  );

  const isActive = !disabled && visible;

  return (
    <View style={{ flex: 1 }}>
      {/* Trigger button */}
      <TouchableRipple
        ref={buttonRef}
        onPress={openDropdown}
        disabled={disabled}
        borderless={false}
        style={{
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            height: 48,
            borderRadius: 12,
            borderWidth: 1.5,
            borderColor: disabled
              ? theme.colors.outlineVariant
              : isActive
              ? theme.colors.primary
              : theme.colors.outline,
            backgroundColor: disabled
              ? theme.colors.surfaceVariant
              : theme.colors.surface,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 14,
            gap: 8,
          }}
        >
          <Text
            variant="bodyMedium"
            numberOfLines={1}
            style={{
              flex: 1,
              color: disabled
                ? theme.colors.onSurfaceVariant
                : theme.colors.onSurface,
              opacity: disabled ? 0.5 : 1,
            }}
          >
            {label}
          </Text>
          <Icon
            source={visible ? "chevron-up" : "chevron-down"}
            size={20}
            color={
              disabled
                ? theme.colors.onSurfaceVariant
                : isActive
                ? theme.colors.primary
                : theme.colors.onSurfaceVariant
            }
          />
        </View>
      </TouchableRipple>

      {/* Dropdown modal — fully isolated from parent layout */}
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={closeDropdown}
        statusBarTranslucent
      >
        <TouchableWithoutFeedback onPress={closeDropdown}>
          <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.15)" }}>
            <TouchableWithoutFeedback>
              <Surface
                elevation={2}
                style={{
                  position: "absolute",
                  top: dropdownPos.top,
                  left: dropdownPos.left,
                  width: dropdownPos.width,
                  borderRadius: 12,
                  overflow: "hidden",
                  borderWidth: 1,
                  borderColor: theme.colors.outlineVariant,
                }}
              >
                {options.map((option, index) => {
                  const isSelected = selectedValue === option.value;
                  return (
                    <TouchableRipple
                      key={option.value}
                      onPress={() => handleSelect(option.value)}
                      style={{
                        backgroundColor: isSelected
                          ? theme.colors.secondaryContainer
                          : "transparent",
                        borderTopWidth: index === 0 ? 0 : StyleSheet.hairlineWidth,
                        borderTopColor: theme.colors.outlineVariant,
                      }}
                    >
                      <View
                        style={{
                          paddingHorizontal: 16,
                          paddingVertical: 14,
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text
                          variant="bodyMedium"
                          style={{
                            color: isSelected
                              ? theme.colors.onSecondaryContainer
                              : theme.colors.onSurface,
                            fontWeight: isSelected ? "600" : "400",
                          }}
                        >
                          {option.label}
                        </Text>
                        {isSelected && (
                          <Icon
                            source="check"
                            size={18}
                            color={theme.colors.onSecondaryContainer}
                          />
                        )}
                      </View>
                    </TouchableRipple>
                  );
                })}
              </Surface>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

// --- Main Screen ---
export default function AllUsersScreen() {
  const theme = useTheme();
  const router = useRouter();

  // --- Filter state ---
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>("ALL");
  const [selectedType, setSelectedType] = useState<TypeFilter>("ALL");

  // --- Search state ---
  const [searchInput, setSearchInput] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  const isSearchMode = submittedQuery.trim().length > 0;

  // --- API queries ---
  const statusParam = selectedStatus === "ALL" ? undefined : selectedStatus;
  const typeParam =
    selectedStatus === "ACTIVE" && selectedType !== "ALL" ? selectedType : undefined;

  const filterQuery = useUsers(statusParam, typeParam);
  const searchQuery = useSearchUsers(submittedQuery);

  const activeQuery = isSearchMode ? searchQuery : filterQuery;
  const { data, isLoading, isError, error, refetch } = activeQuery;

  // --- Handlers ---
  const handleUserPress = (userId: string) => {
    router.push(`/(admin)/user/${userId}`);
  };

  const handleSearchSubmit = () => {
    setSubmittedQuery(searchInput.trim());
  };

  const handleSearchClear = () => {
    setSearchInput("");
    setSubmittedQuery("");
  };

  const handleStatusSelect = (value: StatusFilter) => {
    setSelectedStatus(value);
    if (value !== "ACTIVE") setSelectedType("ALL");
  };

  const handleTypeSelect = (value: TypeFilter) => {
    setSelectedType(value);
  };

  const isTypeDisabled = isSearchMode || selectedStatus !== "ACTIVE";

  const statusLabel =
    STATUS_OPTIONS.find((o) => o.value === selectedStatus)?.label ?? "All Statuses";
  const typeLabel =
    TYPE_OPTIONS.find((o) => o.value === selectedType)?.label ?? "All Types";

  // --- Render ---
  if (isLoading) {
    return <Loading size="large" />;
  }

  if (isError) {
    return (
      <ErrorScreen
        message={error?.message || "Failed to load users"}
        onRetry={refetch}
      />
    );
  }

  return (
    <Container className="px-2.5 pt-5" edges={["top"]} heading="Users">

      {/* Search Bar */}
      <Searchbar
        placeholder="Search by name..."
        value={searchInput}
        onChangeText={setSearchInput}
        onSubmitEditing={handleSearchSubmit}
        onIconPress={handleSearchSubmit}
        onClearIconPress={handleSearchClear}
        style={{
          marginBottom: 12,
          backgroundColor: theme.colors.surfaceVariant,
        }}
        inputStyle={{ color: theme.colors.onSurface }}
      />

      {/* Filter Dropdowns */}
      <View style={{ flexDirection: "row", gap: 10, marginBottom: 16 }}>
        <Dropdown
          label={statusLabel}
          disabled={isSearchMode}
          options={STATUS_OPTIONS}
          selectedValue={selectedStatus}
          onSelect={handleStatusSelect}
        />

        <Dropdown
          label={typeLabel}
          disabled={isTypeDisabled}
          options={TYPE_OPTIONS}
          selectedValue={selectedType}
          onSelect={handleTypeSelect}
        />
      </View>

      {/* Type filter hint */}
      {!isSearchMode && selectedStatus !== "ACTIVE" && selectedStatus !== "ALL" && (
        <Text
          variant="bodySmall"
          style={{
            color: theme.colors.onSurfaceVariant,
            marginBottom: 12,
            paddingHorizontal: 4,
          }}
        >
          Type filter is only available for Active users
        </Text>
      )}

      {/* Result count */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 12,
          paddingHorizontal: 4,
        }}
      >
        <Badge
          style={{
            backgroundColor: theme.colors.primaryContainer,
            color: theme.colors.onPrimaryContainer,
          }}
        >
          {data?.count ?? 0}
        </Badge>
        <Text
          variant="bodyMedium"
          style={{ marginLeft: 8, color: theme.colors.onSurfaceVariant }}
        >
          {isSearchMode
            ? `result${data?.count !== 1 ? "s" : ""} for "${submittedQuery}"`
            : `user${data?.count !== 1 ? "s" : ""} found`}
        </Text>
      </View>

      {/* Divider */}
      <Divider style={{ marginBottom: 12 }} />

      {/* User List */}
      <FlatList
        data={data?.userList}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item, index }) => (
          <UserListItem
            id={item.id}
            name={item.name}
            email={item.email}
            role={item.role}
            isFirst={index === 0}
            isLast={index === (data?.userList?.length ?? 0) - 1}
            onPress={handleUserPress}
          />
        )}
        ListEmptyComponent={
          <View style={{ marginTop: 32 }}>
            <EmptyState
              icon="account-search-outline"
              message={
                isSearchMode
                  ? `No users found matching "${submittedQuery}"`
                  : selectedStatus === "ALL"
                  ? "No users found in the system"
                  : `No ${selectedStatus.toLowerCase()} users found`
              }
            />
          </View>
        }
      />
    </Container>
  );
}
