import React from 'react'
import { addSection } from '../app/js/enabled-sections'
import Bindings from '../app/js/bindings'

class App extends React.Component {
  
  render() {
    console.log('Entry 2', Bindings.root.toJS())
    return (
      <div>
        <h1>Bindings at Entry Point 2</h1>
        <h2 style={{"color": "red"}}>{JSON.stringify(Bindings.root.toJS(), null, 2)}</h2>
      </div>
    )
  }
}

addSection('test', {
  test: { component: <App /> }
})
