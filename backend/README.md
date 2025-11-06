# Backend API (Node.js/Express)

This directory contains the core RESTful API for the US Food Holiday Menu Generator. It handles database operations (migrations, seeding, querying) and fetches external recipe data from TBD (I will choose a good API source soon, in between a couple of options).

## Tech Stack

* **Runtime:** Node.js
* **Language:** TypeScript
* **Framework:** Express
* **Database:** PostgreSQL (with Sequelize ORM)

## 🏃 Local Setup and Running

1.  **Dependencies:** Ensure you are in the `/backend` directory and install packages:
    ```bash
    npm install
    ```
2.  **Environment:** Create a `.env` file (if one doesn't exist) and ensure it has your `PORT` and PostgreSQL credentials (or the `PG_DATABASE_URL` if using system environment variables).
    ```
    # Example .env content
    PORT=3000
    DB_NAME=food_holidays
    # ... other DB credentials
    ```
3.  **Database Setup (Initial Run):** Run the combined command to create the tables and insert the initial holiday data (from the CSV source).
    ```bash
    npm run db:setup
    ```
4.  **Start Development Server:**
    ```bash
    npm run dev
    ```

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the server in development mode using `nodemon` and reloads on changes. |
| `npm run start` | Starts the production server (for testing production build). |
| `npm run db:setup` | Runs **migrations** and then **seeds** the initial data. |
| `npm run db:migrate` | Runs all pending database migrations (creates/alters tables). |
| `npm run db:seed` | Runs all seed files (inserts initial data). |
| `npm run test` | Runs all unit and integration tests using Jest. |

---

## Database Maintenance

| Command | Description |
| :--- | :--- |
| `npx sequelize-cli db:migrate:undo` | Reverts the **last** migration file. |
| `npx sequelize-cli db:migrate:undo:all` | **CAUTION:** Reverts *all* migrations, wiping the schema clean. |
| `npx sequelize-cli migration:generate --name [name]` | Generates an empty migration template file. |

---

## Advanced Developer Notes

* **Replace ENUM:** [https://github.com/abelosorio/sequelize\_replace\_enum\_postgres](https://github.com/abelosorio/sequelize_replace_enum_postgres)
* **Single Table Inheritance alternative:** [https://stackoverflow.com/questions/48438938/achieve-single-table-inheritance-with-sequelize](https://stackoverflow.com/questions/48438938/achieve-single-table-inheritance-with-sequelize)