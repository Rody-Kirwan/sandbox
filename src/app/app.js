import React from 'react'
import ReactDOM from 'react-dom'

import Bindings from './js/bindings'
import Ctx from './js/context'
import App from './components/app'

// import 'stores/all'


// Initialize the application view
window.onload = ()=> {
  const Bootstrap = Ctx.bootstrap(App)

  const RootComponent = ReactDOM.render(
    <Bootstrap/>,
    document.getElementById('root')
  )
}