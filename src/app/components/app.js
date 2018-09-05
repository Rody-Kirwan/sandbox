import React from 'react'
import { getEnabledSections } from '../js/enabled-sections'
import Bindings from '../js/bindings'
import MainComponent2 from './main2.js';

const SECTIONS = ['mainOne', 'test', 'mainTwo'];

class MainComponent extends React.Component {
  constructor() {
    super()

    Bindings.root.set('newValue', 'newValue')
  }

  render() {
    console.log('main-binding', Bindings.root.toJS())

    return (
      <div>
        <h1>Bindings at Main Component 1</h1>
        <h2 style={{"color": "green"}}>{JSON.stringify(Bindings.root.toJS(), null, 2)}</h2>
      </div>
    )
  }
}

export default class App extends React.Component {
  state = {
    page: 0
  }

  getSections = () => {
    const sections = {
      mainOne: { component: <MainComponent /> },
      mainTwo: { component: <MainComponent2 /> }
    }

    Object.assign(sections, getEnabledSections('test'))

    return sections
  }

  renderSection = (currentSection) => {
    let sectionProperties = this.getSections()[currentSection]

    return sectionProperties.component
  }

  switchSection = (e) => {
    e.preventDefault()
    
    const { page } = this.state
    let nextPage;

    switch(page) {
      case 0: {
        nextPage = page + 1;
        break
      }
      case 1: {
        nextPage = page + 1;
        break
      }
      case 2: {
        nextPage = 0;
        break
      }

    }
    
    this.setState({ page: nextPage })

  }

  render() {
    const section = SECTIONS[this.state.page]
    return (
      <div>
        <button onClick={((e) => { this.switchSection(e) })}>Switch Entry</button>
        { this.renderSection(section) }
      </div>
    )
  }
}