import { ref } from "vue";

export function useAddDebtorValidation() {
  const name = ref("");
  const debtAmount = ref();

  const nameMessage = ref("");
  const debtAmountMessage = ref("");
  const validateMessage = ref("");

  function validate() {
    nameMessage.value = "";
    debtAmountMessage.value = "";
    validateMessage.value = "";
    let isValid = true;

    const trimmedName = name.value.trim();

    if (!trimmedName) {
      nameMessage.value = "Name is required.";
      isValid = false;
    } else if (trimmedName.length < 3) {
      nameMessage.value = "Name must be at least 3 characters long.";
      isValid = false;
    } else if (!/^[A-Za-z][A-Za-z\s.'-]*$/.test(trimmedName)) {
      nameMessage.value = "Name contains invalid characters.";
      isValid = false;
    }

    if (!debtAmount.value && debtAmount.value !== 0) {
      debtAmountMessage.value = "Amount is required.";
      isValid = false;
    } else if (isNaN(Number(debtAmount.value))) {
      debtAmountMessage.value = "Amount must be a valid number.";
      isValid = false;
    } else if (Number(debtAmount.value) < 1) {
      debtAmountMessage.value = "Amount must be at least ₱1.";
      isValid = false;
    }

    return isValid;
  }

  return {
    name,
    debtAmount,
    nameMessage,
    debtAmountMessage,
    validateMessage,
    validate,
  };
}
