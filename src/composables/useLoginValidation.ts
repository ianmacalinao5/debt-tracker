import { ref } from "vue";

export function useLoginValidation() {
  const email = ref("");
  const password = ref("");
  const remember = ref(false);

  const emailMessage = ref("");
  const passwordMessage = ref("");
  const validateMessage = ref("");

  function validate() {
    emailMessage.value = "";
    passwordMessage.value = "";
    validateMessage.value = "";
    let isValid = true;

    if (!email.value) {
      emailMessage.value = "Email is required.";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
      emailMessage.value = "Please enter a valid email.";
      isValid = false;
    }

    if (!password.value) {
      passwordMessage.value = "Password is required.";
      isValid = false;
    } else if (password.value.length < 8) {
      passwordMessage.value = "Password should be at least 8 characters long.";
      isValid = false;
    }

    return isValid;
  }

  return {
    email,
    password,
    remember,
    emailMessage,
    passwordMessage,
    validateMessage,
    validate,
  };
}
