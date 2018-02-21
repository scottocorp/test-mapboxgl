import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'react-emotion'

import LondonCycle from './../LondonCycle'
import HeatMap from './../HeatMap'
import MapLeaflet from './../MapLeaflet'
import Mapboxgl from './../Mapboxgl'

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

const Sidebar = styled('div')({
  position: 'absolute',
  top: '50px',
  left: '50px',
  width: '200px',
  height: 'calc(100vh - 100px)',
  background: 'white',
  zIndex: '2',
  padding: '20px'
})

const Label = styled.div`
  cursor: pointer;
`

const mapComponents = {
  londonCycle: {
    component: LondonCycle,
    label: 'LondonCycle',
    type: 'react-mapbox-gl-demo'
  },
  heatMap: {
    component: HeatMap,
    label: 'HeatMap',
    type: 'react-mapbox-gl-demo'
  },
  mapboxgl: {
    component: Mapboxgl,
    label: 'vanilla mapboxgl map',
    type: null
  },
  mapLeaflet: {
    component: MapLeaflet,
    label: 'vanilla leaflet map',
    type: null
  }
}

export class Desktop extends Component {
  constructor() {
    super()
    this.state = {
      currentMap: 'londonCycle'
    }
  }
  render() {
    console.log('Desktop: currentMap=' + this.state.currentMap)

    const CurrentMapComponent = mapComponents[this.state.currentMap].component
    let map = <CurrentMapComponent />

    return (
      <Container>
        <MapWrapper>{map}</MapWrapper>
        <Sidebar>
          {Object.keys(mapComponents)
            .filter(
              child => mapComponents[child].type === 'react-mapbox-gl-demo'
            )
            .map((child, i) => (
              <Label
                key={i}
                onClick={() => this.setState({ currentMap: child })}
              >
                {mapComponents[child].label}
              </Label>
            ))}
          <br />
          {Object.keys(mapComponents)
            .filter(
              child => mapComponents[child].type !== 'react-mapbox-gl-demo'
            )
            .map((child, i) => (
              <Label
                key={i}
                onClick={() => this.setState({ currentMap: child })}
              >
                {mapComponents[child].label}
              </Label>
            ))}
        </Sidebar>
      </Container>
    )
  }
}

export default Desktop
