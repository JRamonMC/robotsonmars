# robotsonmars
Robots on mars is a project  that determines each sequence of robot positions on Mars and reports the final position of the robot. It has been developed with NodeJS, Express, MongoDB and EJS.
We've chose EJS due to is a quick solution in order to see backend behavour. 
More info in https://www.notion.so/Jose-Ramon-Some-thoughts-about-the-project-d170f61002f3455c9061c6a4c128ee3c

## Installation

Download the zip or clone the project. 

After, go to main folder and type `npm i` on terminal. With this command, you will install all the required packages.

Now, you have to set a `.env` file. 

This is an example of `.env` file for server 
```
DATABASE=mongodb://localhost:27017/my-database
SECRET=manolitoscolmenar
PORT=5000
MONGO_HOSTNAME=localhost
MONGO_DB=my-database
MONGO_PORT=27017
```
You can choose between DATABASE or MONGO_HOSTNAME + MONGO_DB + MONGO_PORT

Finally, type `npm start` or `npm run dev` (with Nodemon) to see the project on `localhost:5000/api/phones`

## Test

If you want to run some test, you need to go to main directory and type `npm test`

That's all.

## Miscelaneous

### Docker

Docker files has been added to server . Also, we've include a docker-compose.yml file to dockerize the app with MongoDB + Express

Also, you need to set  `MONGO_HOSTNAME=mongo` in your server `.env` file.

Steps: 
1. Build server `docker build -t node-app .`
2. Build docker compose `docker-compose build`
3. Run docker compose `docker-compose up`
