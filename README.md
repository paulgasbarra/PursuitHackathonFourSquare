# PursuitHackathonFourSquare

Connect Four
Description
Connect Four is a classic two-player connection game where the objective is to be the first to form a horizontal, vertical, or diagonal line of four of one's own discs. This web-based version of Connect Four is built using Vite for a smooth and modern frontend experience, coupled with a robust PostgreSQL database backend to store game data.

Features
Real-time gameplay between two players.
Persistent game state stored in PostgreSQL.
Responsive design for desktop and mobile play.
Prerequisites
Before you start, ensure you have the following installed:

Node.js (recommended version 14 or later)
PostgreSQL (recommended version 12 or later)
Yarn or npm (for managing packages)
Installation
Clone the repository
bash
Copy code
git clone https://yourrepositoryurl.com/connect-four
cd connect-four
Install dependencies
Using npm:

bash
Copy code
npm install
Using Yarn:

bash
Copy code
yarn
Set up the PostgreSQL database
Ensure PostgreSQL is running on your system.
Create a database named connect_four_db:
sql
Copy code
CREATE DATABASE connect_four_db;
Execute the SQL scripts found in the database/ directory to set up the schema and initial tables:
bash
Copy code
psql -d connect_four_db -f ./database/schema.sql
Configure environment variables
Copy the .env.example file to .env and fill in your database credentials and any other configurations:

plaintext
Copy code
DATABASE_URL=postgresql://username:password@localhost:5432/connect_four_db
Running the Application
To start the server, run:

bash
Copy code
npm run dev
or if you are using Yarn:

bash
Copy code
yarn dev
This will start the Vite server on http://localhost:3000.

Contributing
Contributions are welcome! Feel free to open a pull request with your improvements.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Feel free to customize this README further based on additional features or specific details about how to use your application.
