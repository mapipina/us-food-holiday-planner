# Backend API (Node.js/Express)

The backend dir contains the core RESTful API for my US Food Holiday Menu Generator. It handles database operations (migrations, seeding, querying) and fetches external recipes from TheMealDB. 

See the root level README for more information on tracking the phases / stages of this project. 


## Tech Stack

* **Runtime:** Node.js
* **Language:** TypeScript
* **Framework:** Express
* **Database:** PostgreSQL with Sequelize ORM

## Local Setup and Running

1.  **Dependencies:** Ensure you are in the `/backend` directory and install packages:
    ```bash
    npm install
    ```
2.  **Environment:** Create a **`.env`** file (if one doesn't exist) and ensure it has your `PORT` and PostgreSQL credentials (`DB_USERNAME`, `DB_PASSWORD`, etc.) configured to point to your local PostgreSQL instance.

3.  **Database Setup (Initial Run):** Run the combined command to **create the tables** and **insert the initial holiday data** from the CSV source.
    ```bash
    npm run db:setup
    ```
    > **Note:** This runs migrations first, then seeds the data. You only need to run this command once.

4.  **Start Development Server:**
    ```bash
    npm run dev
    ```


## Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the server in development mode using `nodemon` and reloads on changes. |
| `npm run db:setup` | **Creates all tables and seeds the initial holiday data.** (Runs `db:migrate` then `db:seed`). |
| `npm run db:migrate` | Runs all pending database schema migrations (creates/alters tables). |
| `npm run db:seed` | **Inserts the food holiday data** into the `holidays` table. Use this only after the `db:migrate` step is complete. |
| `npm run test` | Runs all unit and integration tests using Jest. |


## Database Maintenance and Development

### Generating Files

If you need to create a new migration or a new seed file, use the following commands:

* **Generate a New Migration:**
    ```bash
    npx sequelize-cli migration:generate --name add-new-table
    ```

* **Generate the Holiday Data Seeder (Initial Setup):**
    ```bash
    npx sequelize-cli seed:generate --name holiday-data-seeder
    ```
    > This command creates the template file used to load the CSV data from `./data/us-food-holidays.csv`.

### Running Maintenance Commands

| Command | Description |
| :--- | :--- |
| `npx sequelize-cli db:migrate:undo` | Reverts the **last** migration file. |
| `npx sequelize-cli db:migrate:undo:all` | **CAUTION:** Reverts *all* migrations, wiping the schema clean. |
