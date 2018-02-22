import * as React from 'react'
import ReactMapboxGl, {
  ScaleControl,
  ZoomControl,
  RotationControl,
  Layer,
  Feature
} from 'react-mapbox-gl'
import styled from 'react-emotion'
import { AllShapesPolygonCoords, AllShapesMultiPolygonCoords } from '../../data'
import { mapData } from './allShapesStyle'

import { route } from './route'

const mappedRoute = route.points.map(point => [point.lat, point.lng])

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

const lineLayout = {
  'line-cap': 'round',
  'line-join': 'round'
}

const linePaint = {
  'line-color': '#4790E5',
  'line-width': 12
}

const polygonPaint = {
  'fill-color': '#6F788A',
  'fill-opacity': 0.7
}

const multiPolygonPaint = {
  'fill-color': '#3bb2d0',
  'fill-opacity': 0.5
}

export class AllShapes extends React.Component {
  constructor() {
    super()
    this.state = {
      center: [-0.120736, 51.5118219],
      zoom: [8],
      circleRadius: 30,
      routeIndex: 0
    }
    this.intervalHandle = undefined
    this.timeoutHandle = undefined
    this.mounted = false
  }
  componentWillMount() {
    this.mounted = true
    this.timeoutHandle = setTimeout(() => {
      if (this.mounted) {
        this.setState({
          center: mappedRoute[0],
          zoom: [10],
          circleRadius: 10
        })
      }
    }, 3000)

    this.intervalHandle = setInterval(() => {
      if (this.mounted) {
        this.setState({
          routeIndex: this.state.routeIndex + 1
        })
      }
    }, 8000)
  }
  componentWillUnmount() {
    clearTimeout(this.timeoutHandle)
    clearInterval(this.intervalHandle)
  }
  getCirclePaint = () => ({
    'circle-radius': this.state.circleRadius,
    'circle-color': '#E54E52',
    'circle-opacity': 0.8
  })
  onStyleLoad = map => {
    const { onStyleLoad } = this.props
    return onStyleLoad && onStyleLoad(map)
  }
  render() {
    return (
      <Container>
        <Map
          style={mapData}
          containerStyle={mapStyle}
          onStyleLoad={this.onStyleLoad}
          center={this.state.center}
          zoom={this.state.zoom}
        >
          {/* Controls */}
          <ScaleControl />
          <ZoomControl />
          <RotationControl style={{ top: 80 }} />

          {/* Line example */}
          <Layer type="line" layout={lineLayout} paint={linePaint}>
            <Feature coordinates={mappedRoute} />
          </Layer>

          {/* Circle example */}
          <Layer type="circle" paint={this.getCirclePaint()}>
            <Feature coordinates={mappedRoute[this.state.routeIndex]} />
          </Layer>

          {/* Polygon example */}
          <Layer type="fill" paint={polygonPaint}>
            <Feature coordinates={AllShapesPolygonCoords} />
          </Layer>

          {/* Multi Polygon example */}
          <Layer type="fill" paint={multiPolygonPaint}>
            <Feature coordinates={AllShapesMultiPolygonCoords} />
          </Layer>
        </Map>
      </Container>
    )
  }
}

export default AllShapes
