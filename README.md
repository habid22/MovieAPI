# Movie Review Web Application

## Overview

This project is a movie review web application that allows users to search for movies, view details, and add reviews. The application uses Node.js, Express, and SQLite for the backend, and HTML, CSS (with Bootstrap), and JavaScript for the frontend.

## Prerequisites

- Node.js and npm installed on your machine
- Internet connection to fetch movie data from the OMDb API

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd project

2. Install dependencies:
   ```bash npm install

## Running the Application

1. Start the server:
node server.js

2. Open the web application:
Open your web browser and navigate to http://localhost:3000.


## Application Structure
### server.js: Main entry point of the server

### api/: Contains API routes and database configuration
- movieForm.js: API routes for searching movies and managing reviews
- database.js: Database configuration and schema

### web/: Contains frontend files
- index.html: Main HTML file
- style.css: CSS file for styling
- script.js: JavaScript file for frontend functionality


## API Endpoints
### GET /api/form/search/
- : Search for a movie by title
### POST /api/form/reviews: Add a review for a movie
### GET /api/form/reviews/
- : Get reviews for a movie by ID


## Frontend Functionality
### Search Movie: Allows users to search for a movie and display its details
### Add Review: Allows users to add a review for the displayed movie
### View Reviews: Displays all reviews for the displayed movie