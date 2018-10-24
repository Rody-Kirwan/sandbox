# webpack-dev-server will not proxy to endpoints with *dot* notation
Sandbox to display unexpected behaviour webpack-dev-server

Running on
  - node@v8
  - webpack@v4.17.0
  - webpack-cli@v2.0.11
  - webpack-dev-server@v3.1.10

### Setup
I have added 2 endpoints to an express.js server @ `server/app.js`
  - `/test`
  - `/.test`

```
  // server/app.js

  // Endpoint One
  app.get('/test', function(req, res) {
    res.status(200).send('Express Server: Request Received')
  })
  
  
  // Endpoint Two
  app.get('/.test', function(req, res) {
    res.status(200).send('Express Server: Request Received')
  })
```


#### Steps
  - To run application use `npm run dev`
  - Open `localhost:5000` 
  - Navigate to `localhost:5000/test`
  - Expected response from express server is received "Express Server: Request Received"
  - Navigate to `localhost:5000/.test`
  - Unexpected response: `Cannot GET /.test`
  - Express server is never reached
