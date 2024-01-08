# Journal

A web application for keeping a diary.

## Features

- Switch between calendar and entry views. Default view is calendar.
- Users must log in to access the app.
- Once logged in, users cannot access the signup or login pages.

## Technology Stack

Frontend: Vue 3  
Backend: Firebase, Express

## Getting Started

1. Clone this repository to your local machine.
2. Install the necessary dependencies by running the following command in the /frontend and /backend directory:

```sh
npm install
```

3. Set up the environment variables for Firebase and historical events (by [API Ninjas](https://www.api-ninjas.com/)) by creating a .env file in the /backend directory with the following information:

```sh
# Historical events
API_KEY=<your-api-key>

# Firebase configs
FIREBASE_API_KEY=<your-api-key>
FIREBASE_AUTH_DOMAIN=<your-auth-domain>
FIREBASE_DATABASE_URL=<your-database-url>
FIREBASE_PROJECT_ID=<your-project-id>
FIREBASE_STORAGE_BUCKET=<your-storage-bucket>
FIREBASE_MESSAGING_SENDER_ID=<your-sender-id>
FIREBASE_APP_ID=<your-app-id>
```

4. Start the development server by running the following command in two separate CLIs:

Express app: From the /backend directory

```sh
npm run start
```

Vue app: From the /frontend directory

```sh
npm run dev
```

5. Navigate to the local URL returned by the Vue app CLI in your web browser.
