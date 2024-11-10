class ErrorHandler {
    static handleError(error) {
        let errorMessage = '';

        switch (error.code) {
            case 'auth/user-not-found':
                errorMessage = 'User not found. Please check your credentials.';
                break;
            case 'auth/wrong-password':
                errorMessage = 'Incorrect password. Please try again.';
                break;
            case 'auth/email-already-in-use':
                errorMessage = 'Email is already in use. Please use a different email.';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Invalid email format. Please enter a valid email.';
                break;
            case 'auth/weak-password':
                errorMessage = 'Password is too weak. Please enter a stronger password.';
                break;
            default:
                errorMessage = 'An unknown error occurred. Please try again later.';
        }

        return errorMessage;
    }
}

export default ErrorHandler;