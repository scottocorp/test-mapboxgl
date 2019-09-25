import * as React from 'react'
import ReactMapboxGl, { Layer, Feature, Popup } from 'react-mapbox-gl'
import styled from '@emotion/styled'
import { londonCycleMaxBounds as maxBounds } from '../../data'
import { svg } from './cycle'
import { stations } from './londonCycleData'

const Mapbox = ReactMapboxGl({
  minZoom: 8,
  maxZoom: 15,
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

// Define layout to use in Layer component
const layoutLayer = { 'icon-image': 'londonCycle' }

// Create an image for the Layer
const image = new Image()
image.src = 'data:image/svg+xml;charset=utf-8,' + svg
const images = ['londonCycle', image]

const StyledPopup = styled.div`
  background: white;
  color: #3f618c;
  font-weight: 400;
  padding: 5px;
  border-radius: 2px;
`

const flyToOptions = {
  speed: 0.8
}

export class LondonCycle extends React.Component {
  constructor() {
    super()
    this.state = {
      fitBounds: undefined,
      center: [-0.109970527, 51.52916347],
      zoom: [11],
      station: undefined,
      stations: {}
    }
  }
  componentWillMount() {
    this.setState({
      stations: { ...stations }
    })
  }
  onDrag = () => {
    if (this.state.station) {
      this.setState({ station: undefined })
    }
  }
  onToggleHover(cursor, { map }) {
    map.getCanvas().style.cursor = cursor
  }
  markerClick = (station, { feature }) => {
    this.setState({
      center: feature.geometry.coordinates,
      zoom: [14],
      station
    })
  }
  onStyleLoad = map => {
    const { onStyleLoad } = this.props
    return onStyleLoad && onStyleLoad(map)
  }
  render() {
    const { fitBounds, center, zoom, stations, station } = this.state

    console.log('LondonCycle! ')

    return (
      <Container>
        <Mapbox
          style="mapbox://styles/mapbox/streets-v9"
          onStyleLoad={this.onStyleLoad}
          fitBounds={fitBounds}
          maxBounds={maxBounds}
          center={center}
          zoom={zoom}
          onDrag={this.onDrag}
          containerStyle={mapStyle}
          flyToOptions={flyToOptions}
        >
          <Layer
            type="symbol"
            id="marker"
            layout={{ 'icon-image': 'harbor-15' }}
          >
            {Object.keys(stations).map((stationK, index) => (
              <Feature
                key={stationK}
                onMouseEnter={this.onToggleHover.bind(this, 'pointer')}
                onMouseLeave={this.onToggleHover.bind(this, '')}
                onClick={this.markerClick.bind(this, stations[stationK])}
                coordinates={stations[stationK].position}
              />
            ))}
          </Layer>
          {station && (
            <Popup key={station.id} coordinates={station.position}>
              <StyledPopup>
                <div>{station.name}</div>
                <div>
                  {station.bikes} bikes / {station.slots} slots
                </div>
              </StyledPopup>
            </Popup>
          )}
        </Mapbox>
      </Container>
    )
  }
}

export default LondonCycle
