import { ref } from "vue";

export function useChangePasswordValidation() {
  const currentPassword = ref("");
  const newPassword = ref("");
  const confirmPassword = ref("");

  const currentPasswordMessage = ref("");
  const newPasswordMessage = ref("");
  const confirmPasswordMessage = ref("");

  function validate() {
    currentPasswordMessage.value = "";
    newPasswordMessage.value = "";
    confirmPasswordMessage.value = "";

    let isValid = true;

    if (!currentPassword.value) {
      currentPasswordMessage.value = "Current password is required.";
      isValid = false;
    }

    if (!newPassword.value) {
      newPasswordMessage.value = "New password is required.";
      isValid = false;
    } else if (newPassword.value.length < 8) {
      newPasswordMessage.value = "Password must be at least 8 characters long.";
      isValid = false;
    }

    if (!confirmPassword.value) {
      confirmPasswordMessage.value = "Please confirm your password.";
      isValid = false;
    } else if (confirmPassword.value !== newPassword.value) {
      confirmPasswordMessage.value = "Passwords do not match.";
      isValid = false;
    }

    return isValid;
  }

  return {
    currentPassword,
    newPassword,
    confirmPassword,

    currentPasswordMessage,
    newPasswordMessage,
    confirmPasswordMessage,

    validate,
  };
}
