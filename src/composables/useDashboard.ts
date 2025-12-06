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

  const handleAddDebtor = () => {
    console.log("Add new debtor");
  };

  const handleLogout = () => {
    console.log("Logout");
  };

  return {
    totalOutstanding,
    totalDebtors,
    filteredDebtors,
    searchQuery,
    filter,
    handleAddDebtor,
    handleLogout,
  };
}
