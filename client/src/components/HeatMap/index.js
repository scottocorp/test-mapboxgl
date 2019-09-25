import * as React from 'react'
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl'
import { data } from './heatmapData'
import styled from '@emotion/styled'

const Map = ReactMapboxGl({ accessToken: process.env.MAPBOX_KEY })

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

const layerPaint = {
  'heatmap-weight': {
    property: 'priceIndicator',
    type: 'exponential',
    stops: [[0, 0], [5, 2]]
  },
  // Increase the heatmap color weight weight by zoom level
  // heatmap-ntensity is a multiplier on top of heatmap-weight
  'heatmap-intensity': {
    stops: [[0, 0], [5, 1.2]]
  },
  // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
  // Begin color ramp at 0-stop with a 0-transparancy color
  // to create a blur-like effect.
  'heatmap-color': [
    'interpolate',
    ['linear'],
    ['heatmap-density'],
    0,
    'rgba(33,102,172,0)',
    0.25,
    'rgb(103,169,207)',
    0.5,
    'rgb(209,229,240)',
    0.8,
    'rgb(253,219,199)',
    1,
    'rgb(239,138,98)',
    2,
    'rgb(178,24,43)'
  ],
  // Adjust the heatmap radius by zoom level
  'heatmap-radius': {
    stops: [[0, 1], [5, 50]]
  }
}

export class Heatmap extends React.Component {
  onStyleLoad = map => {
    const { onStyleLoad } = this.props
    return onStyleLoad && onStyleLoad(map)
  }
  render() {
    const center = [-0.109970527, 51.52916347]

    return (
      <Container>
        <Map
          style="mapbox://styles/mapbox/dark-v9"
          center={this.center}
          containerStyle={mapStyle}
          onStyleLoad={this.onStyleLoad}
        >
          <Layer type="heatmap" paint={layerPaint}>
            {data.map((el, index) => (
              <Feature key={index} coordinates={el.latlng} properties={el} />
            ))}
          </Layer>
        </Map>
      </Container>
    )
  }
}

export default Heatmap
