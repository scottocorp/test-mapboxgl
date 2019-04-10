import React, { Component } from 'react'
import ReactMapboxGl, { Layer, Feature, Source } from 'react-mapbox-gl'
import styled from 'react-emotion'

import mapboxdraw from '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import '@mapbox/mapbox-gl-draw/dist/svg/line.svg'
import '@mapbox/mapbox-gl-draw/dist/svg/polygon.svg'
import '@mapbox/mapbox-gl-draw/dist/svg/trash.svg'

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
const center = [-103.59179687498357, 40.66995747013945]
const zoom = [3]
const mapStyle = {
  layers: [],
  sources: {},
  version: 8,
  sprite: 'mapbox://sprites/btsdatavisualisation/cjfc3qctx33hq2sllc5l5rb6k',
  glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf'
}
const baseLayers = () => {
  const streetsSource = {
    label: 'Streets',
    maxzoom: 22,
    minzoom: 0,
    tiles: [
      'https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=' +
        process.env.MAPBOX_KEY
    ],
    tileSize: 256,
    type: 'raster'
  }
  return (
    <div>
      <Source
        key="streetsSource"
        tileJsonSource={streetsSource}
        id="streetsSource"
      />
      <Layer
        key="streetsLayer"
        type="raster"
        id="streetsLayer"
        sourceId="streetsSource"
      />
    </div>
  )
}
const GEOJSON_SOURCE_OPTIONS = {
  type: 'geojson',
  data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
  cluster: true,
  clusterMaxZoom: 14, // Max zoom to cluster points on
  clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
}
export class BmvClustering extends Component {
  onStyleLoad = map => {
    console.log('onStyleLoad!')
    const {} = this.props
    this.map = map
    window.map = map

    map.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'earthquakes',
      filter: ['has', 'point_count'],
      paint: {
        // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
        // with three steps to implement three types of circles:
        //   * Blue, 20px circles when point count is less than 100
        //   * Yellow, 30px circles when point count is between 100 and 750
        //   * Pink, 40px circles when point count is greater than or equal to 750
        'circle-color': [
          'step',
          ['get', 'point_count'],
          '#51bbd6',
          100,
          '#f1f075',
          750,
          '#f28cb1'
        ],
        'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40]
      }
    })

    map.addLayer({
      id: 'cluster-count',
      type: 'symbol',
      source: 'earthquakes',
      filter: ['has', 'point_count'],
      layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12
      }
    })

    map.addLayer({
      id: 'unclustered-point',
      type: 'circle',
      source: 'earthquakes',
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': '#11b4da',
        'circle-radius': 4,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#fff'
      }
    })

    this.render()
  }
  render() {
    return (
      <Container>
        <Map
          style={mapStyle}
          center={center}
          onStyleLoad={this.onStyleLoad}
          zoom={zoom}
        >
          <div>
            <Source id="earthquakes" geoJsonSource={GEOJSON_SOURCE_OPTIONS} />
          </div>
          {baseLayers()}
        </Map>
      </Container>
    )
  }
}

export default BmvClustering
