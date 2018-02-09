import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Pane } from 'react-leaflet'
import LocationMarker from '../LocationMarker'

export class LocationMarkers extends Component {
  render() {
    const { location } = this.props

    const marker = location ? (
      <LocationMarker
        position={[location.lat, location.lon]}
        key={location.id}
        location={location}
      />
    ) : null

    return (
      <div>
        <Pane name="locationMarkers" style={{ zIndex: 402 }}>
          {marker}
        </Pane>
      </div>
    )
  }
}

export default connect(state => ({}), {})(LocationMarkers)
