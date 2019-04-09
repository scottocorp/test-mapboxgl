import React, { Component } from 'react'
import ReactMapboxGl, { Layer, Feature, Source } from 'react-mapbox-gl'
import styled from 'react-emotion'

import mapboxdraw from '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import '@mapbox/mapbox-gl-draw/dist/svg/line.svg'
import '@mapbox/mapbox-gl-draw/dist/svg/polygon.svg'
import '@mapbox/mapbox-gl-draw/dist/svg/trash.svg'

const MapFn = ReactMapboxGl({
  accessToken: process.env.MAPBOX_KEY
})
const Container = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
`
const Map = styled(MapFn)`
  height: 100%;
  width: 100%;
  position: absolute;
  background: skyblue;
`
const center = [151.1736958740796, -33.868633345350624]
const streetsSource = {
  label: 'Streets',
  maxzoom: 22,
  minzoom: 0,
  tiles: [
    'https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=' +
      process.env.MAPBOX_KEY
  ],
  tileSize: 256,
  type: 'raster'
}
const mapStyle = {
  layers: [],
  sources: {},
  version: 8,
  sprite: 'mapbox://sprites/btsdatavisualisation/cjfc3qctx33hq2sllc5l5rb6k'
}

export class BmvClustering extends Component {
  render() {
    return (
      <Container>
        <Map style={mapStyle} center={center}>
          <Source
            key="streetsSource"
            tileJsonSource={streetsSource}
            id="streetsSource"
          />
          <Layer
            key="streetsLayer"
            type="raster"
            id="streetsLayer"
            sourceId="streetsSource"
          />
        </Map>
      </Container>
    )
  }
}

export default BmvClustering
