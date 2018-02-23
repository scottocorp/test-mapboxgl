import * as React from 'react'
import ReactMapboxGl, { GeoJSONLayer } from 'react-mapbox-gl'
import { geojson } from '../../data'
import styled from 'react-emotion'
import { styles } from '../../data'

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
const symbolLayout = {
  'text-field': '{place}',
  'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
  'text-offset': [0, 0.6],
  'text-anchor': 'top'
}
const symbolPaint = {
  'text-color': 'white'
}
const circleLayout = { visibility: 'visible' }
const circlePaint = {
  'circle-color': 'white'
}

export class GeoJsonLayer extends React.Component {
  constructor() {
    super()
    this.center = [-77.01239, 38.91275]
  }
  onClickCircle = evt => {
    console.log(evt)
  }
  onStyleLoad = map => {
    const { onStyleLoad } = this.props
    return onStyleLoad && onStyleLoad(map)
  }
  render() {
    return (
      <Container>
        <Map
          style={styles.dark}
          center={this.center}
          containerStyle={mapStyle}
          onStyleLoad={this.onStyleLoad}
        >
          <GeoJSONLayer
            data={geojson}
            circleLayout={circleLayout}
            circlePaint={circlePaint}
            circleOnClick={this.onClickCircle}
            symbolLayout={symbolLayout}
            symbolPaint={symbolPaint}
          />
        </Map>
      </Container>
    )
  }
}

export default GeoJsonLayer
