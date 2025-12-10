import { ref, computed, type Ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { toast } from "vue-sonner";
import type { Debtor } from "@/types";

export function useDashboard(debtors: Ref<Debtor[]>) {
  const router = useRouter();
  const auth = useAuthStore();

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

  const handleUpdateDebtor = (data: {
    id: number;
    name: string;
    debtAmount: number;
  }) => {
    debtors.value = debtors.value.map((d) =>
      d.id === data.id ? { ...d, name: data.name, amount: data.debtAmount } : d
    );
  };

  const handleDeleteDebtor = (id: number) => {
    debtors.value = debtors.value.filter((d) => d.id !== id);
    console.log("Deleted debtor id:", id);
  };

  const handleLogout = async () => {
    try {
      await auth.logout();
      toast.success("Logged out successfully!");
      router.push("/");
    } catch (err: any) {
      toast.error("Failed to logout");
      console.error("Logout error:", err);
    }
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
    handleUpdateDebtor,
    handleDeleteDebtor,
    handleLogout,
  };
}
