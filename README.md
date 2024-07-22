# DuckPond - Social Media Application (Backend)
DuckPond - internship group project for Bay Valley Tech

## Table of Contents
- [Description](#description)
- [How to Run the Project](#how-to-run-the-project)
- [How to Use the Project](#how-to-use-the-project)
- [Tests](#tests)
- [Developer Log, Flowcharts, Wireframe, Screenshots](#developer-log-flowcharts-wireframe-screenshots)
- [Credits](#credits)

## Description
#### Overview and Technologies used
* Full-Stack social network application modeled on existing platforms like Twitter and Instagram
* DuckPond is an example of a 3-tier MERN (MongoDB, Express, React, Node.js) full-stack architecture 
* This repository stores backend server-side logic and database access code for the DuckPond project
* Users can create new accounts on DuckPond, and sign in at any time with valid credentials. 
* Every user has a Profile which they can update at any time with new personal information, such as a profile image, biography, country of residence, etc.
* The main page of DuckPond is a Feed page that holds all the active posts from all users who are registered to the social network. Feed page provides all the typical social media features, from liking and commenting on other people's posts, to deleting or editing one's own posts (not those from other users however)
* Furthermore, users can make new posts, search for other users on the network, change the app theme, sign out, and also delete their accounts if they so decide
* The application authenticates users by means of cookies, using 'cookie-parser' library to parse and extract cookie data from HTTP requests
* DuckPond is a responsive application, and its interface can be accessed from both a desktop machine and a mobile phone
* Code for this project was written in JavaScript, HTML, and CSS languages
* The technology stack utilized for this project was MERN (MongoDB, Express, React, and Node.js). This set of technologies was chosen because of its high scalability, ease of application management, great flexibility of Node.js, and feasibility of the MERN stack for developing medium-sized projects in a rapid fashion. MongoDB is a NoSQL database, and my team decided it would be best for this project due to its scalability, flexibility, cost-effectiveness, and intuitiveness of the way data is stored in a database
* React was determined as the best frontend library for the project thanks to the speed of development in it, its reusable components principle, and how easy it makes creating dynamic web applications
* The editor used for the project was Visual Studio Code, version control was done with Git, Figma and Whimsical were used for visual outlines (wireframes) and flowcharts 
* Bulma was our CSS framework of choice, as it is lightweight, simple to learn and use, and highly browser-compatible
* Both Insomnia and Postman were utilized for API endpoint testing (on the backend). However, we decided to make our own API testing tool that would support automated testing, and we developed it in Python using the pytest framework. The repository of this automated testing tool written in Python can be accessed [here](https://github.com/kristijanH1998/ddsm-backend-testing-tool.git)
* Hackolade was employed for making data models, Entity Relationship (ER) diagrams, and schema designs for collections and documents of our MongoDB database
* To connect frontend layer of the application to backend logic, we utilized Axios API for sending HTTP requests to the backend server
* Font Awesome toolkit was used for fonts and icons on the application's website (frontend)
* The repository of the frontend part of the project can be found [here](https://github.com/kristijanH1998/dev-duckies-sm-proj-front.git)      
* An extra step that has also been taken was containerization of the project with Docker, to achieve OS-level virtualization and make it easier for end users to test DuckPond without having to install a lot of environment dependencies, packages, libraries, etc.

#### Challenges faced during development
* Prior to starting this project, I was not very much experienced in backend development and using MERN technology stack, more specifically using Express as server-side framework, Node as a JavaScript runtime environment (server platform), and MongoDB as database. I only had knowledge of React for frontend development. Furthermore, MongoDB is a NoSQL database system, and before this project I only worked in SQL-type databases and database management systems for those (I had experience with MySQL). The tools used for backend development in MERN stack, like MongoDB Compass, API test tools (Insomnia, Postman), and Hackolade were new to me as well. Therefore, I needed several weeks of both research and hands-on practice to familiarize myself with this software stack, but I managed to catch up pretty fast with the rest of the team
* The integration of the frontend code to the backend side of the application was by far the most time-consuming and difficult phase of building DuckPond, as it exposed bugs in both parts of the project that were previously not detected nor found to possibly cause issues in the future. This meant going back to backend code and making changes to it (introducing new endpoints or editing existing ones, fixing errors with data retrieved by endpoints, etc.), and sometimes editing and upgrading already finished and tested frontend code when it would be missing certain elements or React components
* Axios library used for sending HTTP requests from the frontend to the backend server was initally causing CORS errors and failed to fetch data from the database. This issue required several days of research and debugging followed by several days of trial-and-error attempts to make all endpoint types return desired data from the database
* Forgot Password functionality has not yet been implemented due to Mailgun API and Gmail API not producing expected results, since these solutions required both the sender and recipient of email messages to change certain email account security settings. Gmail did not work as desired with Nodemailer module for Node.js. These problems caused our application to, as of the time of writing this description, be missing Forgot Password service for resetting user password       

#### Features to be implemented in the future
* DuckPond would be a better social media app solution if it had a digital storage area for messages (Inbox), enabling users to receive messages from and send messages to other users. This is a feature I hope to work on in the future
* Forgot Password functionality with password reset option would improve DuckPond's user experience as it would allow them to reset their password in case they lost/forgot it. This would require being able to securely send email messages to users with confirmation code and potentially other confidential information. There are numerous solutions for this in existence on the Web, but all attempts so far failed to achieve smooth, fast, and secure password reset process. I hope to implement this in the future
* DuckPond exhibits some minor CSS design bugs on the mobile phone screen view (for example, trash button and edit button on Post component are not positioned correctly), which will need to be fixed going forward
* Hosting DuckPond on AWS Cloud would be a great addition to the project, since it would allow anybody interested in testing this application to simply run it in their browser without having to install all the packages, dependencies, tools, and other components for running project files

#### Motivation
* I was assigned this project while participating in the Bay Valley Tech's internship program, and I was looking forward to it because I needed more experience in full-stack application development. I also wanted to add new technologies to my portfolio stack, like MongoDB, Express, Node.js, Bulma, Postman, and others, and this project was a great opportunity for me to learn them

#### Things I learned
* This almost 3 months long project taught me that good methodology, team organization, and effective leadership are crucial components of any software engineering process. At times our team struggled with these factors, and it resulted in longer development time, harder debugging period and integration process requiring longer time to finish than initially expected
* I learned that even if one is not very familiar with certain set of technologies, they can still be productive in a team project that requires knowledge of those technologies if they put enough effort in learning them by both reading documentation and other study materials, and being willing to immerse themselves in practical work even if initial attempts are filled with setbacks. The most important thing is to never give up, learn from mistakes, and keep trying without thinking about results
* Lastly, I realized that medium to large scale software projects like DuckPond are very time consuming and in order to be completed within a couple of months, they should be performed by teams of developers and engineers. The same goes for any larger full-stack application. Perhaps such projects can be finished by a single person, but that process would take considerably more time than team work would require to deliver the product and finalize all the steps in the process

## How to Run the Project
### Backend Installation 
1. Download and install VS Code editor [here](https://code.visualstudio.com/download)
2. Use the terminal in VS Code (Bash, PowerShell, depending on the OS) to download and install Node.js, find instructions [here](https://nodejs.org/en/download/package-manager)
3. Use VS Code 'Extensions' page to search for and install latest version of 'HTML CSS Support' dependency (CSS Intellisense for HTML)
4. (optional) Use VS Code 'Extensions' page to search for and install latest version of 'JavaScript (ES6) code snippets'
5. Use VS Code 'Extensions' page to search for and install latest version of 'ESLint' to integrate ESLint JavaScript into your code editor
6. Follow instructions on [this](https://github.com/git-guides/install-git) link to install Git
7. Choose the location (directory) for the project repository, navigate to it with 'cd [directory-name]' terminal command and inside of it clone the project repository by running the command 'git clone https://github.com/kristijanH1998/ddsm-back-end.git' in your terminal
8. Run the command 'npm i' to install all required dependencies
9. Install MongoDB (Community Edition version). Ensure default configuration and do not change the port (default port of the localhost server should be 27017). Get an instance of MongoDB server up and running. For more detailed instructions, reference official MongoDB installation manual on [this link](https://www.mongodb.com/docs/manual/administration/install-community/), and click on instructions corresponding with your operating system
10. Install MongoDB Compass, the interactive GUI software for MongoDB. For more instructions please reference [this website](https://www.mongodb.com/docs/compass/current/install/). Then open MongoDB Compass
11. Open embedded MongoDB Shell by clicking on _MONGOSH at the bottom of the MongoDB Compass window. Type 'use DuckPond' (this is a case sensitive command) in the shell, and then paste (in the shell) the script from [this file](mongodb-script.txt) to build the database for the project
12. Type the command 'npm run dev' in the terminal at the root directory of the project's backend repository you cloned earlier, and ensure the console prints out “Server is running on port 8080” and “Connected to MongoDB” like this:
![terminal after npm run dev (backend)](/screenshots/npm-run-dev-result.jpg?raw=true "terminal after npm run dev (backend)")
13. Now go to the installation steps for the [Frontend repository](https://github.com/kristijanH1998/dev-duckies-sm-proj-front?tab=readme-ov-file#frontend-installation) of DuckPond, and install the environment for the Frontend, then run the frontend server to start using the application

## How to Use the Project
* After the frontend server has been started and 'http://localhost:5173/' URL address has been pasted in the address bar in the browser, you should see the Login page interface:
![Login page](/screenshots/duckpond-login-1.jpg?raw=true "Login page")
Here enter your email address and password if your account exists, if not create a new account by clicking 'Create Account', which will open Register page:
![Register page](/screenshots/duckpond-signup-1.jpg?raw=true "Register page")
Make sure to enter username that is unique (is not already used by another user), and email address that has a valid email form. Also, passwords need to match.
* Once user signs in or creates a new account and registers, they should see the Feed page (home page):
![Feed page](/screenshots/duckpond-feed-1.jpg?raw=true "Feed page")
Here you can interact with posts either you posted or from other users, by liking them or commenting on them. It is also possible for any user to edit or delete posts they wrote, but not those from other users. 
If there are more than five posts on the feed page, navigate over them by clicking on 'Previous' and 'Next' buttons.
To like a post, click on the heart icon at the bottom left of a post card. To comment on a post, click on the message icon next to the heart icon, at the bottom left. 
Clicking on the Comment icon will open a new comment modal:
![Comment modal](/screenshots/duckpond-feed-3.jpg?raw=true "Comment modal")
If there are more than five comments for the given post, navigate over them by clicking on 'Previous' and 'Next' buttons.
Clicking on the Like (heart) icon will open a Like modal, listing users who already liked the post:
![Like modal](/screenshots/duckpond-feed-4.jpg?raw=true "Like modal")
If there are more than five likes for the given post, navigate over them by clicking on 'Previous' and 'Next' buttons.
* To look up anybody's profile on the network, click on Search in the navigation bar on the left and type the name of the account you are looking for:
![Search page](/screenshots/duckpond-search-1.jpg?raw=true "Search page")
Clicking on any user will open their profile modal:
![Search page - Profile](/screenshots/duckpond-search-2.jpg?raw=true "Search page - Profile")
* To write a new post and share it, on the Post page, write some text and click 'Share'. You should see a confirmation message indicating successful new post has been shared:
![New post made](/screenshots/duckpond-createpost-2.jpg?raw=true "New post made")
* Profile page shows your account information alongside your profile picture and a list of all the posts you so far shared on DuckPond:
![Profile page](/screenshots/duckpond-profile-1.jpg?raw=true "Profile page")
If you want to change any of your public profile information, click on the Edit icon at the bottom of the upper profile container. This will open text entry fields for editing data. Clicking on 'Save' will update your profile with new information you entered:
![Profile page - Update](/screenshots/duckpond-profile-3.jpg?raw=true "Profile page - Update")
By clicking on 'Change profile photo...' button you can update your profile picture:
![Profile page - Update Picture](/screenshots/duckpond-profile-5.jpg?raw=true "Profile page - Update Picture")
If there are more than five posts on your profile page, navigate over them by clicking on 'Previous' and 'Next' buttons.
* On the Settings page, you can toggle between light and dark mode for the website by toggling 'Dark Mode':
![Settings - Light Mode](/screenshots/duckpond-settings-1.jpg?raw=true "Settings - Light Mode")
To sign out, click on the yellow 'Sign Out' button below.
To delete your account (warning: this will delete all data associated with your profile, including posts, comments, likes, etc.), click the red 'Delete Account' button. You should see a warning message before proceeding with account removal:
![Delete Account](/screenshots/duckpond-settings-2.jpg?raw=true "Delete Account")

## Tests
* At the initial stages of development, we used Insomnia and Postman to test API endpoints for all HTTP methods (GET, POST, PUT, and DELETE) that are used for communication with the backend server
* Due to problems with automating tests in both Insomnia and Postman, the team decided to make our own automated testing program in Python. This program, when run, activates all the endpoints on the server and sends requests for communication with the database for each of them. If all tests run successfully, it means the backend part of DuckPond is fully operational
* The repository of our Python automated test tool can be found [here](https://github.com/kristijanH1998/ddsm-backend-testing-tool.git). Browse the README file for more information and screenshots of this subproject 

## Developer Log, Flowcharts, Wireframe, Screenshots
* My developer log for this project has been uploaded [here](https://drive.google.com/file/d/1bIH4XZXU69Ym8tr6hukK0defAdZk_hYE/view?usp=sharing)
* The flowcharts I made in Whimsical for Login and Register endpoints, deleting, updating, and getting data on user's Profile page or Feed page, account deletion, and other API methods can be seen on [this link](https://whimsical.com/api-fZfurRkTG76GxAbwypZCt)
* The wireframe schematics I made in Figma for Login and Register pages is shown [here](https://www.figma.com/design/jj1JsWoJYqUOrp8FJDnOSf/Login%2FRegister-page-wireframes?node-id=0-1&t=qn4lK3Ey3o9NGknh-1). The wireframe for the Feed and Profile pages and Post modal are uploaded [here](https://www.figma.com/design/2mC4Kt2an5EqkLJgBYSSzh/Feed%2FProfile-Page-%26-Post-Modal-Wireframes?node-id=0-1&t=bvvqA0HnTnpx0N5X-1)
* More screenshots taken from this project can be seen on my [portfolio website](https://kristijanh1998.github.io/duckpond.html)

## Credits
* This project was sponsored and coordinated by [Bay Valley Tech (BVT) Code Academy](https://www.bayvalleytech.com/)
* Team members who contributed to the Backend part of DuckPond project: 
    1. Alex Yanez [GitHub](https://github.com/A13xYanez) [LinkedIn](https://www.linkedin.com/in/a13x-yanez/)
    2. Jeshua Cervantes [GitHub](https://github.com/JJeshua) [LinkedIn](https://www.linkedin.com/in/jeshua-cervantes/)
    3. Kristijan Hornung [GitHub](https://github.com/kristijanH1998) [LinkedIn](https://www.linkedin.com/in/kristijan-hornung-56440622a/)
    4. Victor Lomeli-Ponce [GitHub](https://github.com/vlomeli) [LinkedIn](https://www.linkedin.com/in/vlomeliponce/)
