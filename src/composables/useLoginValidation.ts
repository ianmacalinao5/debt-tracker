import { ref } from "vue";

export function useLoginValidation() {
  const username = ref("");
  const password = ref("");
  const remember = ref(false);

  const usernameMessage = ref("");
  const passwordMessage = ref("");
  const validateMessage = ref("");

  function validate() {
    usernameMessage.value = "";
    passwordMessage.value = "";
    validateMessage.value = "";
    let isValid = true;

    if (!username.value) {
      usernameMessage.value = "Username is required.";
      isValid = false;
    } else if (username.value.length < 3) {
      usernameMessage.value = "Username should be at least 3 characters long.";
      isValid = false;
    }

    if (!password.value) {
      passwordMessage.value = "Password is required.";
      isValid = false;
    } else if (password.value.length < 8) {
      passwordMessage.value = "Password should be at least 8 characters long.";
      isValid = false;
    }

    if (!usernameMessage.value && !passwordMessage.value) {
      if (username.value === "test" && password.value === "password") {
        isValid = true;
      } else {
        validateMessage.value = "Invalid username or password.";
        isValid = false;
      }
    }

    return isValid;
  }

  return {
    username,
    password,
    remember,
    usernameMessage,
    passwordMessage,
    validateMessage,
    validate,
  };
}
