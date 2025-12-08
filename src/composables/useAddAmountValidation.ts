import { ref } from "vue";

export function useAddAmountValidation() {
  const amountAdd = ref();
  const amountAddMessage = ref("");

  function validate() {
    amountAddMessage.value = "";

    if (
      amountAdd.value === null ||
      amountAdd.value === undefined ||
      amountAdd.value === ""
    ) {
      amountAddMessage.value = "Amount is required.";
      return false;
    }

    const n = Number(amountAdd.value);

    if (isNaN(n)) {
      amountAddMessage.value = "Amount must be a valid number.";
      return false;
    }

    if (n < 1) {
      amountAddMessage.value = "Amount must be at least ₱1.";
      return false;
    }

    return true;
  }

  return {
    amountAdd,
    amountAddMessage,
    validate,
  };
}
