import { ref, computed, type Ref } from "vue";
import type { Debtor } from "@/types";

export function useDashboard(debtors: Ref<Debtor[]>) {
  const searchQuery = ref("");
  const filter = ref("all");

  const totalOutstanding = computed(() => {
    return debtors.value
      .reduce((sum, debtor) => {
        return sum + parseFloat(debtor.current_balance.replace(/,/g, ""));
      }, 0)
      .toLocaleString();
  });

  const totalDebtors = computed(() => debtors.value.length);

  const filteredDebtors = computed(() => {
    return debtors.value.filter((debtor) => {
      const matchesSearch =
        !searchQuery.value ||
        debtor.name.toLowerCase().includes(searchQuery.value.toLowerCase());

      const matchesFilter =
        filter.value === "all" || debtor.status === filter.value;

      return matchesSearch && matchesFilter;
    });
  });

  const hasDebtors = computed(() => debtors.value.length > 0);
  const isSearching = computed(() => searchQuery.value.length > 0);
  const hasFilters = computed(() => filter.value !== "all");

  const emptyState = computed(() => {
    if (!hasDebtors.value) return "empty";

    if (isSearching.value && filteredDebtors.value.length === 0) {
      return "search";
    }

    if (hasFilters.value && filteredDebtors.value.length === 0) {
      return "filter";
    }

    return "empty";
  });

  // Handlers
  const handleAddDebtor = () => {
    console.log("Add new debtor");
  };

  const handleLogout = () => {
    console.log("Logout");
  };

  return {
    searchQuery,
    filter,
    totalOutstanding,
    totalDebtors,
    filteredDebtors,

    emptyState,
    hasDebtors,
    isSearching,
    hasFilters,

    handleAddDebtor,
    handleLogout,
  };
}
