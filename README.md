# ChatApp-Firebase

A real-time chat application built using React, Redux, Firebase, and Firestore. This project demonstrates how to integrate Firebase for authentication and Firestore for managing real-time chat data in a modern web application.

## Features

- **User Authentication**: Sign up and sign in using Firebase Authentication.
- **Real-time Chat**: Send and receive messages instantly.
- **Firestore Integration**: Messages are stored and retrieved from Firebase Firestore.
- **Redux Toolkit**: State management using Redux Toolkit.
- **Responsive Design**: Mobile-first design approach using Tailwind CSS.

## Tech Stack

- **Frontend**: React, Redux, Redux Toolkit, Tailwind CSS
- **Backend**: Firebase Authentication, Firestore
- **Build Tool**: Vite

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v14+)
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/areebaqamar021/chatapp-firebase.git
   cd chatapp-firebase

2. **Install dependencies:**

   Using npm:
   ```bash
   npm install
   ```
   Or using yarn:
   
   ```bash
   yarn install
   ```

### Set up Firebase:

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project.
3. Enable Firebase Authentication and Firestore in your project.
4. Get your Firebase configuration and replace the existing config in the project.

### Run the application:

   Using npm:
   ```bash
   npm run dev
    ```
   Or using yarn:
   
   ```bash
   yarn dev
   ```

The application will be available at http://localhost:3000.

### Firebase Configuration

Replace the Firebase configuration in the src/firebase/config.js file with your project's Firebase credentials:

```bash
// src/firebase/config.js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

```

### Deployment

To deploy the application, you can use any static site hosting service such as Vercel, Netlify, or Firebase Hosting.

1. Build the project:

   ```bash
   npm run build
   ```

2. Deploy the dist/ directory to your preferred hosting service.

### Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

### Acknowledgements

- [React](https://reactjs.org/)
- [Firebase](https://firebase.google.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)


