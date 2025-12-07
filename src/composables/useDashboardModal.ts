import { ref, computed } from "vue";
import type { Debtor, ActionType } from "@/types";

import AddDebtorModal from "@/components/modals/AddDebtorModal.vue";
import AddAmountModal from "@/components/modals/AddAmountModal.vue";
import ReduceAmountModal from "@/components/modals/ReduceAmountModal.vue";
import EditDebtorModal from "@/components/modals/EditDebtorModal.vue";
import DeleteDebtorModal from "@/components/modals/DeleteDebtorModal.vue";
import ViewTransactionsModal from "@/components/modals/ViewTransactionsModal.vue";

export function useDashboardModal() {
  const isDialogOpen = ref(false);
  const currentAction = ref<string | null>(null);
  const selectedDebtorId = ref<number | null>(null);

  const modalTitle = computed(() => {
    switch (currentAction.value) {
      case "create":
        return "Add New Debtor";
      case "add":
        return "Add Amount";
      case "less":
        return "Record Payment";
      case "edit":
        return "Edit Debtor";
      case "delete":
        return "Delete Debtor";
      case "view":
        return "Debtor Transactions";
      default:
        return "";
    }
  });

  const modalDescription = computed(() => {
    switch (currentAction.value) {
      case "create":
        return "Fill in the details below to add a new debtor.";
      case "add":
        return "Increase the total amount owed.";
      case "less":
        return "Record a payment made by the debtor.";
      case "edit":
        return "Modify debtor information.";
      case "delete":
        return "This action cannot be undone.";
      case "view":
        return "View all transaction records for this debtor.";
      default:
        return "";
    }
  });

  const modalComponent = computed(() => {
    switch (currentAction.value) {
      case "create":
        return AddDebtorModal;
      case "add":
        return AddAmountModal;
      case "less":
        return ReduceAmountModal;
      case "edit":
        return EditDebtorModal;
      case "delete":
        return DeleteDebtorModal;
      case "view":
        return ViewTransactionsModal;
      default:
        return null;
    }
  });

  const openAddDebtorModal = () => {
    currentAction.value = "create";
    selectedDebtorId.value = null;
    isDialogOpen.value = true;
  };

  const openModal = (payload: { action: ActionType; debtor: Debtor }) => {
    const { action, debtor } = payload;
    console.log("Selected action:", action);
    console.log("Debtor:", debtor);

    currentAction.value = action;
    selectedDebtorId.value = debtor.id;
    isDialogOpen.value = true;
  };

  const closeModal = () => {
    isDialogOpen.value = false;
    currentAction.value = null;
    selectedDebtorId.value = null;
  };

  return {
    isDialogOpen,
    currentAction,
    selectedDebtorId,
    modalTitle,
    modalDescription,
    modalComponent,
    openAddDebtorModal,
    openModal,
    closeModal,
  };
}
