import * as React from 'react'
import ReactMapboxGl, { Marker, Cluster, Popup } from 'react-mapbox-gl'
import styled from '@emotion/styled'
import { falls } from './falls'

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

const styles = {
  clusterMarker: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    backgroundColor: '#51D5A0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    border: '2px solid #56C498',
    cursor: 'pointer'
  },
  marker: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    backgroundColor: '#E0E0E0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid #C9C9C9'
  }
}

const StyledPopup = styled.div`
  background: white;
  color: #3f618c;
  font-weight: 400;
  padding: 5px;
  border-radius: 2px;
`

export class HtmlCluster extends React.Component {
  constructor() {
    super()
    this.state = {
      popup: undefined
    }
    this.zoom = [4]
  }
  clusterMarker = (coordinates, pointCount, getLeaves) => (
    <Marker
      key={coordinates.toString()}
      coordinates={coordinates}
      style={styles.clusterMarker}
      onClick={this.clusterClick.bind(this, coordinates, pointCount, getLeaves)}
    >
      <div>{pointCount}</div>
    </Marker>
  )
  onMove = () => {
    if (this.state.popup) {
      this.setState({ popup: undefined })
    }
  }
  clusterClick = (coordinates, total, getLeaves) => {
    this.setState({
      popup: {
        coordinates,
        total,
        leaves: getLeaves()
      }
    })
  }
  onStyleLoad = map => {
    const { onStyleLoad } = this.props
    return onStyleLoad && onStyleLoad(map)
  }
  render() {
    const { popup } = this.state

    return (
      <Container>
        <Map
          style={'mapbox://styles/mapbox/outdoors-v10'}
          zoom={this.zoom}
          onStyleLoad={this.onStyleLoad}
          onMove={this.onMove}
          containerStyle={mapStyle}
        >
          <Cluster ClusterMarkerFactory={this.clusterMarker}>
            {falls.features.map((feature, key) => (
              <Marker
                key={key}
                style={styles.marker}
                coordinates={feature.geometry.coordinates}
                data-feature={feature}
              >
                <div title={feature.properties.name}>
                  {feature.properties.name[0]}
                </div>
              </Marker>
            ))}
          </Cluster>
          {popup && (
            <Popup offset={[0, -50]} coordinates={popup.coordinates}>
              <StyledPopup>
                {popup.leaves.map((leaf, index) => (
                  <div key={index}>
                    {leaf.props['data-feature'].properties.name}
                  </div>
                ))}
                {popup.total > popup.leaves.length ? (
                  <div>And more...</div>
                ) : null}
              </StyledPopup>
            </Popup>
          )}
        </Map>
      </Container>
    )
  }
}

export default HtmlCluster
