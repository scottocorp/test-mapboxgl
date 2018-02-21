import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'react-emotion'
// import MapLeaflet from './../Mapboxgl'
// import Mapboxgl from './../Mapboxgl'
import LondonCycle from './../LondonCycle'
// import Sidebar from './../Sidebar'
// import Header from './../Header'

const Container = styled('div')({
  height: '100%',
  position: 'relative',
  overflowY: 'hidden'
})

const MapWrapper = styled('div')({
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  height: '100%',
  zIndex: '1'
})

export class Desktop extends Component {
  render() {
    return (
      <Container>
        <MapWrapper>
          <LondonCycle />
        </MapWrapper>
      </Container>
    )
  }
}

export default Desktop
