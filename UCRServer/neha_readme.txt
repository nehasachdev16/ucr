Mongo DB , Nodejs, Express and Angular JS - MEAN Stack

Downloads:
1. Download Web Storm and git pull the git repository into the folder.
2. Download Mongo DB and open mongod.exe or mongod application.
3. Download nodejs and node version

Start the servers now in webstorm.
1. Open the project UCR in webstorm
2. Go on a folder and hit npm init in command line
3. Ensure the entry point in Server.js or the file where expressjs is used
4. Open the mongod.exe and start the mongo server.
5. Install all required packages used in the program:

#Install express
npm install express --save
npm start Server.js

#Install morgan
npm install morgan --save

#Install mongoose
npm install mongoose --save

npm install body-parser --save

#install bcrypt for authentication (not yet required for UCRServer)
npm install bcrypt-nodejs --save

#Install continuous server change monitoring
npm install -g nodemon
nodemon Server.js

Then hit npm start Server.js

6. go on browser http:localhost:port/ , use the port given in the program.




