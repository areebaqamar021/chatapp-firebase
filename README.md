# Chat Application 

[DEMO](https://react-firebase-chat-app-vv.netlify.app/)

This project is a chat application developed with React, Firebase, Tailwind and Redux., Users can sign in, register, find friends, and engage in chat conversations with the ability to share images.

## Features

- **User Authentication:** Sign in or create a new account.
- **Find Friends:** Search and add other users as friends.
- **Profile Picture:** Upload a profile picture during account creation or on the profile page.
- **Real-time Chat:** Communicate with friends in real-time through chat messages.
- **Image Messages:** Enhance communication by sending images in chat messages.

## Technologies Used

- [React](https://reactjs.org/): JavaScript library for building user interfaces.
- [Firebase](https://firebase.google.com/): Backend services for authentication and real-time database.
- [Redux](https://redux.js.org/): State management library for React applications.
- [Tailwind CSS](https://tailwindcss.com/)


## Images

![screencapture-localhost-5173-2024-03-01-07_11_51](https://github.com/ferhatkplnn/react-firebase-chat-app/assets/29931637/da34fc11-77d5-4020-8716-9530f620f12d)

![screencapture-localhost-5173-2024-03-01-07_12_49](https://github.com/ferhatkplnn/react-firebase-chat-app/assets/29931637/036edd97-0ceb-44d8-8305-5dfc30a3567a)

![screencapture-localhost-5173-register-2024-03-01-07_14_08](https://github.com/ferhatkplnn/react-firebase-chat-app/assets/29931637/67a32d98-8f3e-4b03-9d7d-2ba4db69c7d6)

## Requirements

- [Node.js](https://nodejs.org/) must be installed.
- Create a Firebase project and add the necessary configuration.

## Installation

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/ferhatkplnn/react-firebase-chat-app.git
    ```

2. Navigate to the project directory:

    ```bash
    cd react-firebase-chat-app
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Add Firebase configuration:

    Add your Firebase web app configuration to the `.env` file:

    ```env
    VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    ```

5. Start the application:

    ```bash
    npm run dev
    ```


## Contributing

1. Fork this repository.
2. Add a new feature or fix a bug.
3. Commit your changes in a new branch: `git checkout -b new-feature`
4. Commit your changes: `git commit -m 'Added new feature'`
5. Push your branch to the main repository: `git push origin new-feature`
6. Create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
