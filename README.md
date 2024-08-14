# Frontend

## Overview

This is the frontend part of the MCQ and game application built with React. It interacts with a backend service to handle game functionalities, including creating games, fetching game details, and playing quizzes.

## Features

- User authentication and authorization.
- Create and join games.
- Real-time updates of game state.
- Display and answer multiple-choice questions.
- Timer functionality for quizzes.
- Game results display.

## Technologies

- React
- Axios (for HTTP requests)
- React Router (for routing)
- Pusher (for real-time updates)

## Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/frontend-repo.git
    ```

2. Navigate to the project directory:
    ```bash
    cd frontend-repo
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Start the development server:
    ```bash
    npm start
    ```

5. Open your browser and go to `http://localhost:3000`.

## Configuration

- Create a `.env` file in the root directory with the following content:
    ```env
    REACT_APP_API_URL=http://localhost:5000/api
    REACT_APP_PUSHER_KEY=your-pusher-key
    REACT_APP_PUSHER_CLUSTER=your-pusher-cluster
    ```

## Running Tests

- Run the tests using:
    ```bash
    npm test
    ```

## Usage

- **Login**: Users can log in and access the dashboard.
- **Create Game**: Users can create new games and invite others.
- **Play Game**: Users can join a game and answer questions.
- **View Results**: After the game ends, users can see the results.

## Contributing

Feel free to open issues or submit pull requests for improvements.

## License

This project is licensed under the MIT License.
