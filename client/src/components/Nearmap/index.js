import React, { Component } from 'react'
import ReactMapboxGl, { Layer, Source } from 'react-mapbox-gl'
import styled from '@emotion/styled'

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

// const TILELAYER_ENDPOINT = process.env.TILELAYER_ENDPOINT
// const NEARMAP_API_KEY = process.env.NEARMAP_API_KEY
// const NEARMAP_BASE_URL = `${TILELAYER_ENDPOINT}/client/${NEARMAP_API_KEY}/{z}/{y}/{x}/20180118`

const NEARMAP_BASE_URL =
  'https://nearmap-test-{s}.arup.digital/client/AQICAHjpHFFyS.4OFfMYLDeHa.E50syg.0WzG9DEt2l_0UFuJgEnSQN_1mV057ws0JvmSI2DAAAAjzCBjAYJKoZIhvcNAQcGoH8wfQIBADB4BgkqhkiG9w0BBwEwHgYJYIZIAWUDBAEuMBEEDLVuN5ELhI.dINQOAQIBEIBLxbILBaEAaWVv5ad.WnL7f2aFI.ovHZBJcWz7X0Y_rh0K7jlS1UOncO9AtjFUZyGjNZpaRQ1oaQXi_Q4CaBiOhjE6NZ5pUV57ZkFO/{z}/{y}/{x}/20180118'

const BASE_LAYER_OPTIONS = {
  //label: 'Nearmap',
  //maxzoom: 22,
  //minzoom: 0,
  tiles: [
    'https://nearmap-test-{s}.arup.digital/client/AQICAHjpHFFyS.4OFfMYLDeHa.E50syg.0WzG9DEt2l_0UFuJgEnSQN_1mV057ws0JvmSI2DAAAAjzCBjAYJKoZIhvcNAQcGoH8wfQIBADB4BgkqhkiG9w0BBwEwHgYJYIZIAWUDBAEuMBEEDLVuN5ELhI.dINQOAQIBEIBLxbILBaEAaWVv5ad.WnL7f2aFI.ovHZBJcWz7X0Y_rh0K7jlS1UOncO9AtjFUZyGjNZpaRQ1oaQXi_Q4CaBiOhjE6NZ5pUV57ZkFO/{z}/{y}/{x}/20180118'
    // 'https://nearmap-test.arup.digital/client/AQICAHjpHFFyS.4OFfMYLDeHa.E50syg.0WzG9DEt2l_0UFuJgEnSQN_1mV057ws0JvmSI2DAAAAjzCBjAYJKoZIhvcNAQcGoH8wfQIBADB4BgkqhkiG9w0BBwEwHgYJYIZIAWUDBAEuMBEEDLVuN5ELhI.dINQOAQIBEIBLxbILBaEAaWVv5ad.WnL7f2aFI.ovHZBJcWz7X0Y_rh0K7jlS1UOncO9AtjFUZyGjNZpaRQ1oaQXi_Q4CaBiOhjE6NZ5pUV57ZkFO/{z}/{y}/{x}/20180118'
  ],
  tileSize: 256,
  type: 'raster'
  //subdomains: 'abc',
  //bounds: [151.15379, -33.858832, 151.202169, -33.880951],
}

export class Mapboxgl extends Component {
  onStyleLoad = map => {
    window.map = map
    const { onStyleLoad } = this.props
    return onStyleLoad && onStyleLoad(map)
  }
  render() {
    const center = [151.1736958740796, -33.868633345350624]

    return (
      <Container>
        <Map
          style={{
            layers: [],
            sources: {},
            version: 8
          }}
          center={center}
          onStyleLoad={this.onStyleLoad}
        >
          <Source id="nearmap" tileJsonSource={BASE_LAYER_OPTIONS} />
          <Layer key="nearmap" type="raster" id="nearmap" sourceId="nearmap" />
        </Map>
      </Container>
    )
  }
}

export default Mapboxgl
