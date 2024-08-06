import toast from "react-hot-toast";

export const handleFirebaseError = (error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  let customMessage = "";

  switch (errorCode) {
    case "auth/email-already-in-use":
      customMessage =
        "The email address is already in use. Please use a different email address or try logging in.";
      break;

    case "auth/weak-password":
      customMessage = "Password should be at least 6 characters";
      break;

    case "auth/invalid-credential":
      customMessage =
        "Invalid credentials. Please check your login information and try again.";
      break;

    default:
      customMessage = `${errorCode}: ${errorMessage}`;
      break;
  }
  toast.error(customMessage);
  console.error(customMessage);
};
