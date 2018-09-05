import React from 'react'
import Bindings from '../js/bindings'


export default class MainComponent2 extends React.Component {
  render() {
    console.log('main2-binding', Bindings.root.toJS())

    return (
      <div>
        <h1>Bindings at Main Component 2</h1>
        <h2 style={{"color": "green"}}>{JSON.stringify(Bindings.root.toJS(), null, 2)}</h2>
      </div>
    )
  }
}