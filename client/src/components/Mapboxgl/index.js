import React, { Component } from 'react'
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl'
import styled from 'react-emotion'

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

const POSITION_CIRCLE_PAINT = {
  'circle-stroke-width': 4,
  'circle-radius': 10,
  'circle-blur': 0.15,
  'circle-color': '#3770C6',
  'circle-stroke-color': 'white'
}

export class Mapboxgl extends Component {
  render() {
    const center = [151.1736958740796, -33.868633345350624]

    return (
      <Container>
        <Map style="mapbox://styles/mapbox/streets-v9" center={center}>
          <Layer type="circle" id="marker" paint={POSITION_CIRCLE_PAINT}>
            <Feature coordinates={[151.1736958740796, -33.868633345350624]} />
          </Layer>
        </Map>
      </Container>
    )
  }
}

export default Mapboxgl
