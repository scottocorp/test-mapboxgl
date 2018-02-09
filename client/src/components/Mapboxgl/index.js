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

export class Mapboxgl extends Component {
  render() {
    return (
      <Container>
        <Map style="mapbox://styles/mapbox/streets-v9">
          <Layer
            type="symbol"
            id="marker"
            layout={{ 'icon-image': 'marker-15' }}
          >
            <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
          </Layer>
        </Map>
      </Container>
    )
  }
}

export default Mapboxgl
