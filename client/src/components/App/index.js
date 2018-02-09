import React, { Component } from 'react'
import Media from 'react-media'
import { connect } from 'react-redux'

import Desktop from '../Desktop'
import Mobile from '../Mobile'

export class App extends Component {
  render() {
    return (
      <Media query="(min-width: 600px)">
        {matches => (matches ? <Desktop /> : <Mobile />)}
      </Media>
    )
  }
}

export default App
