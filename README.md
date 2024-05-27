# Tech Blog Applicaiton

## Table of Contents
[Description](#description)
[Usage](#usage)


## Description

## Usage
//XX Make DB
//XX Make Models for Users, Comments, Posts
//XX Implment Sequelize with Express
// Create seeds

// Create routes for homepage, dashboard, login, and logout
// Implement sessions for Express and to save it into Sequelize
// Implement user sessions for login and logout

// Implement handlebars for Express
// Create handlebars for main, homepage, dashboard, login
// Once JS behavior is added then add the handlebar conditions

// Implement behavior for JS is the following:


// Every pages should have a links in the navigation - Homepage, Dashboard, Login, and Logout (last two dependent if logged in)
// Click on the homepage link should take you to the homepage
//?? Click on any other link should prompt user to login or sign-up
// Once successful sign-up or login then login to the site and saved credentials to user session - Username and Password
// Click on the site, if not logged in then need to sign-in or sign-up


// Homepage contains existing blog posts that Post title and date created
// Click on existing blog post and the post title, contents, creator's username, and date created
// Entering a comment and clicking the submit button while signed in will save the comment to the DB and Post is updated to show the comment, the creator's username, and date created
// Can only see the comments when the blog post is selected

//Dashboard contains the blog posts the user have already created and an option to add a new blog post
// Clicking on the new blog post will allow for a new blog post to be created with blog title and content
// Clicking on the create a new blog post will save the title, content, username, and date then the Dashboard is refresh to show new blog post
//Clicking on an exist blog posts in the dashboard will allow for the user to delete or update the post then it will refresh the dashboard after executed action

// Clicking on the Logoff button will sign out of the site by destorying user session
// Being idle on the site for a set time will allow me to view posts on Homepage, but before any actions such as add, update, or delete can be executed the user must login
