# Film Recommendation App

This is a film recommendation application that helps users discover new movies, save favorites, and maintain a personal watchlist. The app uses **The Movie Database (TMDB) API** for retrieving film data, **Firebase** for authentication, and **PostgreSQL** to store favorites and watchlisted items.

## Features

- **Main Page Carousel**: Displays the current 20 most popular films, rotating infinitely to showcase trending movies.
- **Search for Films**: Quickly search for movies based on title and view a list of matching results.
- **Film Details Page**: View detailed information about each film, including description, ratings, and release information.
- **Favorite and Watchlist Functionality**:
  - Click the **heart icon** on a film’s detail page to add it to your **Favorites**.
  - Click the **eye icon** on a film’s detail page to add it to your **Watchlist**.
- **User Profile Tab**: Access all favorite and watchlisted items from a personal profile tab for easy management and future reference.

## Tech Stack

- **Frontend**: React
- **Backend**: Java (using Spring Boot or another Java-based framework)
- **Database**: PostgreSQL (for storing favorites and watchlisted items)
- **Authentication**: Firebase (for secure user login and registration)
- **External API**: TMDB API (for accessing film data)

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Lyyzar/film_recommendation_app.git
   cd film-recommendation_app
   ```

2. **Install Frontend Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:

   - Create a `.env` file in the root directory.
   - Add your Firebase and TMDB API credentials, as well as PostgreSQL connection details for the Java backend: TODO

4. **Backend Setup**:

   ```bash
   cd film-recommendation_app_server
   ```

   - **Java Backend**: Ensure you have the necessary Java runtime and dependencies installed.
   - Configure your application properties in the backend to connect to PostgreSQL and Firebase.
   - Run migrations (if needed) to create tables for storing favorites and watchlisted items.

5. **Run the Application**:

   - Start the Java backend.
   - Start the frontend:

   ```bash
   npm start
   ```

## Usage

1. **Sign Up / Login**: Use Firebase authentication to securely sign up or log in to the app.
2. **Main Page Popular Films**: View the 20 most popular films rotating infinitely on the main page.
3. **Explore Films**: Search for films and view details.
4. **Add to Favorites and Watchlist**: Use the **heart** and **eye** icons to save movies to your profile.
5. **Manage Profile**: Access and manage all favorites and watchlisted items from your profile tab.

## API Reference

This project utilizes the [TMDB API](https://developers.themoviedb.org/3) for accessing up-to-date movie information.

## Future Improvements

- **Enhanced Recommendation System**: Suggest movies based on user preferences and watch history.
- **Social Features**: Enable sharing of watchlists and favorites with friends.
