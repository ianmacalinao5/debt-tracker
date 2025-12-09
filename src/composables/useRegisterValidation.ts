import { ref } from "vue";

export function useRegisterValidation() {
  const name = ref("");
  const email = ref("");
  const password = ref("");
  const confirmPassword = ref("");

  const nameMessage = ref("");
  const emailMessage = ref("");
  const passwordMessage = ref("");
  const confirmMessage = ref("");

  function validate() {
    nameMessage.value = "";
    emailMessage.value = "";
    passwordMessage.value = "";
    confirmMessage.value = "";

    let isValid = true;

    if (!name.value) {
      nameMessage.value = "Name is required.";
      isValid = false;
    } else if (name.value.length < 2) {
      nameMessage.value = "Name should be at least 2 characters long.";
      isValid = false;
    }

    if (!email.value) {
      emailMessage.value = "Email is required.";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
      emailMessage.value = "Please enter a valid email address.";
      isValid = false;
    }

    if (!password.value) {
      passwordMessage.value = "Password is required.";
      isValid = false;
    } else if (password.value.length < 8) {
      passwordMessage.value = "Password should be at least 8 characters long.";
      isValid = false;
    }

    if (!confirmPassword.value) {
      confirmMessage.value = "Please confirm your password.";
      isValid = false;
    } else if (confirmPassword.value !== password.value) {
      confirmMessage.value = "Passwords do not match.";
      isValid = false;
    }

    return isValid;
  }

  return {
    name,
    email,
    password,
    confirmPassword,

    nameMessage,
    emailMessage,
    passwordMessage,
    confirmMessage,
    validate,
  };
}
