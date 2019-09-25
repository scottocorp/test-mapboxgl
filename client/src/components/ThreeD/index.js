import * as React from 'react'
import ReactMapboxGl, { Layer } from 'react-mapbox-gl'
import styled from '@emotion/styled'

const Map = ReactMapboxGl({
  accessToken: process.env.MAPBOX_KEY
})

const Container = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
`

const mapStyle = {
  height: '100%',
  width: '100%',
  position: 'absolute',
  background: 'skyblue'
}

const paintLayer = {
  'fill-extrusion-color': '#aaa',
  'fill-extrusion-height': {
    type: 'identity',
    property: 'height'
  },
  'fill-extrusion-base': {
    type: 'identity',
    property: 'min_height'
  },
  'fill-extrusion-opacity': 0.6
}

export class ThreeD extends React.Component {
  constructor() {
    super()
    this.zoom = [15]
    this.bearing = [-60]
    this.pitch = [60]
    this.center = [-73.98566722869873, 40.74845991454198]
  }
  onStyleLoad = map => {
    const { onStyleLoad } = this.props
    return onStyleLoad && onStyleLoad(map)
  }
  render() {
    return (
      <Container>
        <Map
          style={'mapbox://styles/mapbox/light-v9'}
          containerStyle={mapStyle}
          onStyleLoad={this.onStyleLoad}
          zoom={this.zoom}
          center={this.center}
          pitch={this.pitch}
          bearing={this.bearing}
        >
          <Layer
            id="3d-buildings"
            sourceId="composite"
            sourceLayer="building"
            filter={['==', 'extrude', 'true']}
            type="fill-extrusion"
            minZoom={14}
            paint={paintLayer}
          />
        </Map>
      </Container>
    )
  }
}

export default ThreeD
