## Installation

After cloning project run the following

- `composer install`
- `npm install`
- Then go the `.env` in the root directory and change `DB_DATABASE` Path to the new absolute path
- in the project directory run the following:
- `php artisan serve`
- `npm run hot`

## API Documentation

- `/questions` - `POST`
  Creates new question for a specific quiz `quiz_id`

  - Body:

    ```
    {
      "question": "What is the capital of USA?",
      "description": "USA have a lot of cities, but only one of the is the capital.",
      "quiz_id": "2",
      "type": "text",
      "score": 3.0,
      "answer": ["Washington"]
    }
    ```

- `/api/submissions/{id}` - `GET`
  Get submission details by `id`

  - Response:
    ```
    {
      "id": 1,
      "email": "nader.ikladious@gmail.com",
      "answers": "{\"1\":\"Second\",\"2\":\"First\",\"result-2\":0,\"result-1\":0}",
      "score": "0.0",
      "submitted": "1",
      "quiz_id": "1",
      "created_at": "2019-04-06 13:52:49",
      "updated_at": "2019-04-06 20:00:22",
      "quiz": {
          "id": 1,
          "title": "First case study",
          "description": "Lorem ipsum",
          "created_at": null,
          "updated_at": null,
          "questions": [...]
      }
    }
    ```

- `/quizzes` - `GET`
  List all available quizzes

  - Response:
    ```
    [
      {
          "id": 1,
          "title": "First case study",
          "description": "Lorem ipsum",
          "created_at": null,
          "updated_at": null,
          "questions_count": "4"
      },
      {
          "id": 2,
          "title": "Second case study",
          "description": "Lorem ipsum",
          "created_at": null,
          "updated_at": null,
          "questions_count": "2"
      }
    ]
    ```

- `/quizzes/{id}` - `GET`
  Get a quiz details by `id`

  - Response:
    ```
    {
      "id": 1,
      "title": "First case study",
      "description": "Lorem ipsum",
      "created_at": null,
      "updated_at": null,
      "questions": [...]
    }
    ```

- `/questions/validate` - `POST`
  Get the score for questions answer
  - Body:
    ```
    {
      "id": 2,
      "answer": "Paris"
    }
    ```
  - Response
    ```
    2.0
    ```
