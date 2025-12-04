import { ref, computed, type Ref } from "vue";
import type { Debtor } from "@/types";

export function useDashboard(debtors: Ref<Debtor[]>) {
  const searchQuery = ref("");

  const totalOutstanding = computed(() => {
    return debtors.value
      .reduce((sum, debtor) => {
        return sum + parseFloat(debtor.current_balance.replace(",", ""));
      }, 0)
      .toLocaleString();
  });

  const totalDebtors = computed(() => debtors.value.length);

  const filteredDebtors = computed(() => {
    if (!searchQuery.value) return debtors.value;
    return debtors.value.filter((debtor) =>
      debtor.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
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
    handleAddDebtor,
    handleLogout,
  };
}
