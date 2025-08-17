first create one DB which is storing the feedback form and photos of the users 

Basicaly i have to create a project in which 
when i click on Gallary button in which when ther was a window of upload photo and below that there was whole view of latest uploaded photo

next was to shortcuts icon in which i have to create the albums of different photo

Contact in which i have show the info of mine so user can abel to conat me
make that icon clickcable with my url link 


also the sidebar icon make it clickeable 

Improve the delete button ui and in exhibits make one icon where user can able to dowlnload the image directly 

Feedback there was a feed back form in which i was abel to collect the feedback from the users

multer 
JWT token 


NavGallary - A Personal Media Gallery
NavGallary is a dynamic and secure full-stack web application designed for users to upload, manage, and browse their personal collection of photos and videos. It features a secure authentication system, a personal gallery for each user, and a sleek, modern user interface.

(Suggestion: Replace the placeholder above with a screenshot or a GIF of your running application.)

✨ Key Features
Secure User Authentication: Users can sign up and log in to a personal account. Passwords are encrypted using bcrypt, and sessions are managed with JSON Web Tokens (JWT).

Personal Media Gallery: Once logged in, users have access to a private gallery where they can view all their uploaded media. All gallery operations (view, upload, delete) are tied to the specific user ID.

Photo & Video Uploads: An intuitive interface allows users to upload new images and videos with a description. The backend uses multer for efficient file handling.

Dynamic Search & Filtering:

The main gallery page includes a real-time search bar to find media by its description.

The "Shortcuts" page provides one-click filters to view only images or only videos.

External API Integration: The "Exhibits" page fetches and displays a grid of random beautiful images from the public Picsum Photos API, offering new content to view on each visit.

Protected Routes: The application uses a protected routing system, ensuring that only authenticated users can access the main content like the gallery and shortcuts.

Responsive Sidebar Navigation: A collapsible sidebar provides easy navigation between different sections of the application.

🛠️ Tech Stack
Frontend
Framework: React.js

Routing: React Router (react-router-dom)

State Management: React Context API (for authentication)

Styling: Custom CSS

Backend & Database
Runtime: Node.js

Framework: Express.js

Database: MySQL

Authentication: JSON Web Tokens (JWT)

Password Hashing: bcrypt

File Handling: Multer

CORS: cors middleware

🚀 Getting Started
Follow these instructions to get a local copy of the project up and running.

Prerequisites
You need to have the following software installed on your machine:

Node.js (which includes npm)

MySQL Server

1. Backend Setup
First, set up the server which will handle the API and database interactions.

# 1. Clone the repository
git clone https://github.com/your-username/your-repo-name.git

# 2. Navigate to the backend directory (assuming it's where server.js is located)
cd your-repo-name/

# 3. Install NPM packages
npm install

Database Configuration:

Start your MySQL server.

Create a new database for the project. In the server.js file, the database is named NavGallary_db.

CREATE DATABASE NavGallary_db;

Connect to your new database and run the following SQL commands to create the necessary tables.

-- Create the 'users' table for storing login credentials
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the 'gallery' table for storing media information
CREATE TABLE gallery (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    description VARCHAR(255),
    file_path VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

Update the database connection details in server.js with your own MySQL credentials.

// server.js
const dbConfig = {
    host: 'localhost',
    user: 'your_mysql_user',
    password: 'your_mysql_password',
    database: 'NavGallary_db'
};

Start the backend server:

node server.js

The server should now be running on http://localhost:3001.

2. Frontend Setup
Now, set up the React client.

# 1. Navigate to the frontend directory from the root folder
# (Assuming your React app is in a subfolder like 'client' or 'frontend')
cd ../client/ 

# 2. Install NPM packages
npm install

# 3. Start the React development server
npm run dev

Your React application should now be running, and you can access it in your browser, typically at http://localhost:5173.

📋 API Endpoints
The backend server provides the following RESTful API endpoints.

Method

Endpoint

Protection

Description

POST

/api/register

Public

Registers a new user.

POST

/api/login

Public

Logs in a user and returns a JWT.

GET

/api/gallery

Private

Fetches all media for the authenticated user.

POST

/api/upload

Private

Uploads a new photo or video for the user.

DELETE

/api/gallery/:id

Private

Deletes a specific media item for the user.

💡 Future Improvements
Environment Variables: Move sensitive information like database credentials and JWT secrets to a .env file for better security.

Album Creation: Add functionality for users to organize their media into albums.

UI/UX Enhancements: Implement loading spinners, better error feedback, and modal pop-ups for a smoother user experience.

Pagination: For galleries with many items, add pagination to improve performance and reduce initial load time.

File Editing: Allow users to edit the description of an already uploaded media item.

👤 Contact
Tejas Desale

GitHub: @Tejas5504

LinkedIn: Tejas Desale



NavGallary 🖼️
A full-stack, secure personal media gallery built with React, Node.js, and MySQL. Users can sign up, log in, and manage their own private collection of photos and videos through a clean, modern, and responsive web interface.

✨ Features
🔐 Secure User Authentication: Full sign-up and login system with password hashing (bcrypt) and JWT-based session management.

🖼️ Personal Media Gallery: Each user gets a private, protected gallery space for their own media.

📤 Photo & Video Uploads: Easily upload images and videos with descriptions.

🗑️ Delete Media: Users can delete their own uploaded files from the gallery.

🔍 Search & Filter: Includes a real-time search by description and a "Shortcuts" page to filter by media type (images or videos).

🎨 Modern & Responsive UI: A sleek interface with a collapsible sidebar that works smoothly on all screen sizes.

🌐 Random Exhibits API: The "Exhibits" page connects to the Picsum Photos API to display a random collection of beautiful images.

🛠️ Tech Stack
Frontend
React.js - For building the user interface

React Router - For client-side routing

React Context API - For managing authentication state

CSS - For custom styling and responsiveness

Backend & Database
Node.js - JavaScript runtime environment

Express.js - Web framework for Node.js

MySQL - Relational database for storing user and media data

jsonwebtoken (JWT) - For secure user authentication tokens

bcrypt - For hashing user passwords

Multer - For handling file uploads

CORS - For enabling cross-origin requests