# webpack-single-runtime
Sandbox to display unexpected behaviour using a single runtimeChunk and output.filename

This example may be a bit over elaborate in order to recreate the issue we are experiencing but I wanted to simulate - as much as possible - the setup of the real application. `index.html` is rendered from a node server as the inclusion of certain script tags is determined by environment-specific configs.

This is also the reason for using separate entrypoints for each of these scripts. However, each script will require shared resources - e.g. a common application store.

I have created two branches to display unexpected behaviour when using a single `runtimeChunk` with `output.filename`
Details of behaviour listed below

### Branch 1 - [build-with-output-filename]
`output.filename = 'js/[name].js'`

`server/views/index.html`:
```
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>App Title</title>
      <meta name="description" content="">
      <meta name="viewport" content="width=device-width">

    </head>
    <body>
      <div class="app" id="root">
        LOADING
      </div>
      <script type="text/javascript" src="/js/shared.js"></script>
      <script type="text/javascript" src="/js/commons.js"></script>
      <script type="text/javascript" src="/js/app.js"></script>
      <script type="text/javascript" src="/js/testEntry.js"></script>
    </body>
  </html>
```

#### Steps
  - To run without runtimeChunk use `npm run dev-without-runtimeChunk`
  - Open `localhost:5000` 
  - Use the `switch entry` button to switch between entry1 and entry2
  
#### The results here are as expected
Each entrypoint receives a dedicated runtimeChunk and output to `js/[name].js` 
Each entrypoint executes a separate instance of `bindings.js` 
When we update the store with `newValue: 'newValue'` at entrypoint1 - the change is not reflected in the store at entrypoint2

  - To run with runTimeChunk use `npm run dev-with-runtimeChunk`

#### Expected Behaviour
A single runtimeChunk is created and output to `js/shared.js`
Entrypoints only contain relevant modules (NO RUNTIME CODE) and output to `js/[name].js`

#### Actual Behaviour
A single runtimeChunk is created and output to `js/shared.js`
Entrypoints are not located at `js/[name].js` and so return `index.html`



------


### Branch 2 - [build-with-no-output-filename]

Config does not set `output.filename`

`server/index.html` is update to the following:
```
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>App Title</title>
      <meta name="description" content="">
      <meta name="viewport" content="width=device-width">

    </head>
    <body>
      <div class="app" id="root">
        LOADING
      </div>
      <script type="text/javascript" src="/shared.js"></script>
      <script type="text/javascript" src="/js/commons.js"></script>
      <script type="text/javascript" src="/app.js"></script>
      <script type="text/javascript" src="/testEntry.js"></script>
    </body>
  </html>
```

#### Steps
  - `npm run dev-with-runtimeChunk`
  - Open `localhost:5000` 
  - Use the `switch entry` button to switch between entry1 and entry2
  
#### The results here are as expected
A single runtimeChunk is created and output to `shared.js`
Each entrypoint only contains necessary modules (NO RUNTIME CHUNK) and output to `[name].js` 
`bindings.js` is only executed once from `shared.js`
Store is consistent across entrypoints

While this setup will work for dev - it will not be sufficient for production builds as we will need to specify output.filename.
