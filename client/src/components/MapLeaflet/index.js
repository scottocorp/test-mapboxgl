import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Map, Popup, TileLayer, Marker, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
// import LocationMarkers from './../LocationMarkers'
import { setZoom } from '../../actions'

// This fixes an issue with leaflet. See https://github.com/PaulLeCam/react-leaflet/issues/255
import L from 'leaflet'
import styled from '@emotion/styled'
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
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

export class MapLeaflet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      children: null
    }
  }
  componentDidMount() {
    // console.log('MapLeaflet ' + this.refs.map.leafletElement)
    // LayerArcGis children need a ref to Map leaflet element,
    // but leaflet element can only be created after the Map container is rendered
    this.leafletElement = this.refs.map.leafletElement
    this.leafletElement.zoomControl.setPosition('bottomright')
  }
  render() {
    let { location, zoom, setZoom } = this.props
    if (!location) {
      location = { lat: -33.8903597, lon: 151.1519593 }
    }
    const tileUrl =
      'https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=' +
      process.env.MAPBOX_KEY
    return (
      <Container>
        <Map
          ref="map"
          center={[location.lat, location.lon]}
          zoom={zoom}
          attributionControl={false}
          zoomControl={true}
          style={mapStyle}
          onZoomEnd={({ target }) => setZoom(target.getZoom())}
        >
          <TileLayer url={tileUrl} />
          {/*<LocationMarkers />*/}
        </Map>
      </Container>
    )
  }
}

export default connect(
  state => ({
    zoom: state.app.zoom
  }),
  {
    setZoom
  }
)(MapLeaflet)
