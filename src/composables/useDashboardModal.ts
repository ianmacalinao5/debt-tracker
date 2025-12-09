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
  const modalProps = ref<Record<string, any>>({});

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
    modalProps.value = {};
    isDialogOpen.value = true;
  };

  const openModal = ({
    action,
    debtor,
  }: {
    action: ActionType;
    debtor: Debtor;
  }) => {
    currentAction.value = action;
    selectedDebtorId.value = debtor.id;

    switch (action) {
      case "edit":
        modalProps.value = {
          debtorId: debtor.id,
          debtorName: debtor.name,
          debtorAmount: Number(debtor.current_balance.replace(/,/g, "")),
        };
        break;

      case "add":
      case "less":
      case "view":
        modalProps.value = {
          debtorId: debtor.id,
        };
        break;

      case "delete":
        modalProps.value = {
          debtorId: debtor.id,
          debtorName: debtor.name,
        };
        break;
    }

    isDialogOpen.value = true;
  };

  const closeModal = () => {
    isDialogOpen.value = false;
    currentAction.value = null;
    selectedDebtorId.value = null;
    modalProps.value = {};
  };

  return {
    isDialogOpen,
    currentAction,
    selectedDebtorId,
    modalTitle,
    modalDescription,
    modalComponent,
    modalProps,
    openAddDebtorModal,
    openModal,
    closeModal,
  };
}
