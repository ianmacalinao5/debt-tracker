// composables/useDebtCard.ts
import { ref } from "vue";

export function useDebtCard(id: number) {
  const openMenuId = ref<number | null>(null);

  const toggleMenu = () => {
    openMenuId.value = openMenuId.value === id ? null : id;
  };

  const handleAction = (
    action: "add" | "less" | "edit" | "delete" | "view"
  ) => {
    // This is where you trigger whatever you want
    // Example: console.log, emit event, open modal, etc.
    console.log(`Action "${action}" triggered for debtor ID: ${id}`);
  };

  return {
    openMenuId,
    toggleMenu,
    handleAction,
  };
}
