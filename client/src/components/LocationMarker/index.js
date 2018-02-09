import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Marker, Popup } from 'react-leaflet'

export class LocationMarker extends Component {
  constructor(props) {
    super(props)
    this.handleDragend = this.handleDragend.bind(this)
  }
  handleDragend(event) {
    console.log('dragend!')
  }
  render() {
    const { map, position, location } = this.props
    return (
      <Marker
        map={map}
        position={position}
        draggable={true}
        onDragend={this.handleDragend}
      >
        <Popup>
          <span>
            {location.label + ' ' + location.lat + ' ' + location.lon}
          </span>
        </Popup>
      </Marker>
    )
  }
}

export default connect(null, {})(LocationMarker)
