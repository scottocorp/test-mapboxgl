import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'react-emotion'

import LondonCycle from './../LondonCycle'
import HeatMap from './../HeatMap'
import AllShapes from './../AllShapes'
import HtmlFeatures from './../HtmlFeatures'
import ThreeD from './../ThreeD'
import HtmlCluster from './../HtmlCluster'
import SwitchStyle from './../SwitchStyle'
import GeojsonData from './../GeojsonData'
import Nearmap from './../Nearmap'

import MapLeaflet from './../MapLeaflet'
import Mapboxgl from './../Mapboxgl'

import BmvClustering from './../BmvClustering'

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
    label: 'london-cycle',
    type: 'react-mapbox-gl-demo'
  },
  heatMap: {
    component: HeatMap,
    label: 'heatmap',
    type: 'react-mapbox-gl-demo'
  },
  allShapes: {
    component: AllShapes,
    label: 'all-shapes',
    type: 'react-mapbox-gl-demo'
  },
  htmlFeatures: {
    component: HtmlFeatures,
    label: 'html-marker',
    type: 'react-mapbox-gl-demo'
  },
  threeD: {
    component: ThreeD,
    label: '3d-map',
    type: 'react-mapbox-gl-demo'
  },
  htmlCluster: {
    component: HtmlCluster,
    label: 'html-cluster',
    type: 'react-mapbox-gl-demo'
  },
  switchStyle: {
    component: SwitchStyle,
    label: 'switch-style',
    type: 'react-mapbox-gl-demo'
  },
  geojsonData: {
    component: GeojsonData,
    label: 'geojson-data',
    type: 'react-mapbox-gl-demo'
  },
  nearmap: {
    component: Nearmap,
    label: 'nearmap',
    type: 'null'
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
  },
  bmvClustering: {
    component: BmvClustering,
    label: 'BMV clustering',
    type: 'react-mapbox-gl-demo'
  }
}

export class Desktop extends Component {
  constructor() {
    super()
    this.state = {
      currentMap: 'bmvClustering'
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
          {Object.keys(mapComponents).map((child, i) => (
            <Label
              style={{
                fontWeight: child === this.state.currentMap ? 'bold' : 'normal',
                color:
                  mapComponents[child].type === 'react-mapbox-gl-demo'
                    ? '#000'
                    : '#999'
              }}
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
