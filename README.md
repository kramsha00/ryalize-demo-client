# Client

A Vue.js client application styled with Tailwind CSS.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or later recommended)
- [Vue CLI](https://cli.vuejs.org/) (if you haven't already installed it globally)

### Installation

1. **Clone the repository**:
```bash
git clone <repository-url>
cd project-name
```
2. **Install dependencies:**
```bash
npm install
```

3. **Run the development server:**

```bash
npm run dev
```

The app should now be running locally at http://localhost:5173/.

### Project Structure

This project follows a common Vue.js structure with Tailwind CSS for styling.

```
project-root
├── public               # Static files, favicon, etc.
├── src
│   ├── assets           # Global and Tailwind CSS configuration files and logo files
│   ├── components       # Reusable Vue components
│   ├── router           # Vue Router configuration
│   ├── App.vue          # Root component
│   └── main.js          # Application entry point
├── tailwind.config.js   # Tailwind CSS configuration
└── package.json         # Project dependencies and scripts
```

### Environment Variables

To run this project, you need to provide a .env file in the project root. Here’s an example of what it should contain:

### API base URL for making backend requests

      VITE_API_BASE_URL=http://127.0.0.1:8000/api

### API Documentation

This project communicates with a backend API for data. Below are the primary endpoints used within the app:
```
Endpoint	     Method	  Description
/api/users/	     GET	  Fetch list of users
/api/users/	     POST	  Add a new user
/api/users/{id}	     PUT	  Update a specific user
/api/users/{id}	     DELETE	  Delete a specific user
/api/transactions/   GET	  Fetch transactions with filters
/api/locations/	     GET	  Fetch list of locations
```

### Styling and Customization

This project uses Tailwind CSS for styling, with custom configurations located in tailwind.config.js.
