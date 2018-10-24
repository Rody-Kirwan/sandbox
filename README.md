# webpack-dev-server will not proxy to endpoints with *dot* notation
Sandbox to display unexpected behaviour webpack-dev-server

Running on
  - node@v8

### Setup
I have added 2 endpoints to an express.js server @ `server/app.js`
  - `/test`
  - `/.test`


#### Steps
  - To run application use `npm run dev`
  - Open `localhost:5000` 
  - Navigate to `localhost:5000/test`
  - Expected response from express server is received "Express Server: Request Received"
  - Navigate to `localhost:5000/.test`
  - Unexpected response: `Cannot GET /.test`
  - Express server is never reached
