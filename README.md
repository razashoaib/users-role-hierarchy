# users-role-hierarchy
This project consist of an API developed using NodeJS which returns a list of users and collection of roles and users, given a user Id returns a list of ALL their subordinates (i.e.: including their subordinate's subordinates). The front end of this project is developed in ReactJS that is consuming NodeJS API.

## Demo

![DemoGif](demo.gif?raw=true "Gif")

## Project Structure:

This repossitory consists of two folders api and client. The `api` is the NodeJS application that is serving as a backend server side hosting APIs consumed by the `client` which is a ReactJS application.

### Instructions to Run

Please follow the instructions sequentially:
- Make sure you have the right version of Node which is **v12.16.2**
- Also make sure you have NPM and Yarn installed
- Clone this repository
- Navigate to `api` folder
- run `sudo chmod +x ./start-server.sh` which will make `./start-server.sh` script executable
- Now run `./start-server.sh` which will start the server up on `localhost:9000` after installing all the dependencies and running API tests
- Now in a different tab of terminal or a new window, navigate to `client` folder
- run `sudo chmod +x ./start-react.sh` which will make `./start-react.sh` script executable
- Now run `./start-react.sh` which will start the server up on `localhost:3000` after installing all the dependencies
- Navigate to `localhost:3000` to see the application in action

### APIs
- There are only two APIs that is consumed by react application which are as follows:
    -   GET localhost:9000 (returns JSON array of all users)
    -   GET localhost:9000/subordinates?user_id={int} (returns all the subordinate and it's subordinate's subordinates as a JSON array)
- All the logic for the users-role-hierarchy sits inside `api/services/UserRolesService.js`
- The input object of **users** and **roles** is passed in `api/routes/usersHierarchy.js`, which can be changed
- For running API tests, navigate to `api` and run `npm run test`

### Project Built Using

- git
- Node v12.16.2
- NPM v6.14.4
- Yarn v1.12.3
- React v16.13.1
- ExpressJS Framework for NodeJS

### Acknowledgements

- [W3Schools](https://www.w3schools.com/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Stack Overflow](https://stackoverflow.com/)
- [Node Documentation](https://nodejs.org/docs/latest-v12.x/api/)