# MyFaveFlixes
 
 # Overview
My Fave Flixes Client: This installation is the client side of the My Fave Flixes Web App. In this app, a user will be able to browse through a list of a database of movies and then be able to get information about the movie, directors, and genre. The user will then be able to collect their favorite movies into their profile view. The app also allows the user to register, login, and update their profile. This app was coded using React and its component architecture.

# All Views and Their Descriptions

# Main View
The Main-View compnent renders the login-view component if the user has not logged in or registered. And if the user is logged in, it renders the movie-card component.

# Login View
In this view, a registered user can log into the app to access their profile and list of movies.

# Registration View
In this view, if a user has not registered, he/she will be able to fill out a form in order to register.

# Main View
This view returns a list of ALL movies in the database to the user. They are displayed in movie-card tiles and the user is able to select a movie and add it to their favorite movie list.

# Movie View
Once the user selects a movie from the Main View, the movie view displays the selected movie as well as information about the movie.

# Director View

This view is accessed through the movie view inform the user about the director of the movie in movie view.

# Genre View
This view is accessed through the movie view inform the user about the genre of the movie in movie view.

# Profile View
This is the profile user area where a user can update their information as well as delete favorite movies if needed.


Techstack (on the client side): REACT, HTML, CSS, SCSS. JS, and JSX . Using Parcel as the transpiler.

Using REACT to render various components described in the index.jsx file. 

The render happens in the root app-container in index.html