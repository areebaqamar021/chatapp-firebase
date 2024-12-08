# Chat Application 

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

## Requirements

- [Node.js](https://nodejs.org/) must be installed.
- Create a Firebase project and add the necessary configuration.

## Installation

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/areebaqamar021/chatapp-firebase.git
    ```

2. Navigate to the project directory:

    ```bash
    cd chatapp-firebase
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Add Firebase configuration:

    Add your Firebase web app configuration to the `.env` file:

    ```env
    VITE_API_KEY=your_api_key
    VITE_AUTH_DOMAIN=your_auth_domain
    VITE_PROJECT_ID=your_project_id
    VITE_STORAGE_BUCKET=your_storage_bucket
    VITE_MESSAGING_SENDER_ID=your_messaging_sender_id
    VITE_APP_ID=your_app_id
    VITE_MEASUREMENT_ID=your_measurement_id
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
