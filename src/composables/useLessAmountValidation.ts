import { ref } from "vue";

export function useLessAmountValidation() {
  const amountLess = ref();
  const amountLessMessage = ref("");

  function validate() {
    amountLessMessage.value = "";

    if (
      amountLess.value === null ||
      amountLess.value === undefined ||
      amountLess.value === ""
    ) {
      amountLessMessage.value = "Amount is required.";
      return false;
    }

    const n = Number(amountLess.value);

    if (isNaN(n)) {
      amountLessMessage.value = "Amount must be a valid number.";
      return false;
    }

    if (n < 1) {
      amountLessMessage.value = "Amount must be at least ₱1.";
      return false;
    }

    return true;
  }

  return {
    amountLess,
    amountLessMessage,
    validate,
  };
}
