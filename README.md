# Civic Connect MERN

Civic Connect is a full-stack MERN (MongoDB, Express, React, Node.js) application designed to facilitate communication and management for civic organizations, communities, and educational institutions. It provides features for admins, teachers, students, and leaders to interact, manage events, notices, polls, complaints, and more.

## Features

- **User Roles:**
  - **Admin:** Manages the platform, oversees all community activities, resolves escalated issues, and configures system settings.
  - **Community Leader:** Organizes events, posts notices, manages polls, addresses citizen complaints, and facilitates community engagement.
  - **Citizen:** Participates in polls, submits complaints, views notices and events, and engages with community activities.

- **Authentication:** Secure login and registration for Admins, Community Leaders, and Citizens.

- **Role-Based Dashboards:** Each role has a personalized dashboard with relevant tools and information.

- **Notice Board:** Community Leaders and Admins can post important notices. Citizens can view and acknowledge notices.

- **Polls:** Community Leaders and Admins can create polls for community feedback. Citizens can vote and view poll results.

- **Complaints:** Citizens can submit complaints or suggestions. Community Leaders and Admins can review, respond, and resolve issues.

- **Events:** Community Leaders and Admins can organize and manage events. Citizens can view event details and RSVP.

- **Community Engagement:** Tools for discussions, feedback, and collaboration among all roles.



## Features


## Project Structure
```
Civic Connect MERN/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   └── redux/
│   ├── package.json
│   └── README.md
└── README.md
```

## Getting Started

### Prerequisites
- Node.js
- npm or yarn
- MongoDB (local or cloud)

### Installation
1. **Clone the repository:**
  ```powershell
  git clone <repo-url>
  cd "Civic Connect MERN"
  ```
2. **Install backend dependencies:**
  ```powershell
  cd backend; npm install
  ```
3. **Install frontend dependencies:**
  ```powershell
  cd ../frontend; npm install
  ```

### Running the Application
1. **Start MongoDB** (if running locally)
2. **Start the backend server:**
  ```powershell
  cd backend; npm start
  ```
3. **Start the frontend app:**
  ```powershell
  cd frontend; npm start
  ```
4. **Access the app:**
  Open your browser and go to `http://localhost:3000`

## Configuration

- **Backend:** Configure MongoDB connection in `backend/index.js`.
- **Frontend:** Update API endpoints in `frontend/src` as needed.
- **Deployment:**
  - **Backend:** Deploy to [Render](https://render.com/). Create a new Web Service, connect your GitHub repo, set the root directory to `backend`, and add environment variables (e.g., `MONGO_URL`).
  - **Frontend:** Deploy to [Vercel](https://vercel.com/). Import your project, set the root directory to `frontend`, and configure build settings as needed. The `vercel.json` file is included for custom configuration.


## Technologies Used
- **Frontend:** React, Redux
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Deployment:** Backend (Render), Frontend (Vercel)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License.

## Contact
For questions or support, contact the project owner.
