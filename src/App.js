import React, { useState, useEffect, Component } from 'react';
import { compose, withProps, withStateHandlers } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import Geocode from "react-geocode";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Button from '@material-ui/core/Button';
require('highcharts/modules/networkgraph')(Highcharts);

Geocode.setApiKey("AIzaSyBAjdJr2k1xu8VDmAi5ISmPkD2P9uvZCU0");
    Geocode.enableDebug();

const options = {
  chart: {
    type: 'networkgraph',
    width: 600,
  },
  title: {
    text: 'Network Diagram'
  },
  plotOptions: {
    networkgraph: {
      keys: ['from', 'to'],
    }
  },
  series: [{
    id: 'language-tree',
    marker: {
      radius: 5
    },
    dataLabels: {
      enabled: true,
      linkFormat: '',
      allowOverlap: true
    },
    data: [
      ['Proto Indo-European', 'Balto-Slavic'],
      ['Proto Indo-European', 'Germanic'],
      ['Proto Indo-European', 'Celtic'],
      ['Proto Indo-European', 'Italic'],
      ['Proto Indo-European', 'Hellenic'],
      ['Proto Indo-European', 'Anatolian'],
      ['Proto Indo-European', 'Indo-Iranian'],
    ]
  }]
}

const addresses = [
  { lat: 37.761326, lng: -122.424681, name: "Isabell Moen" },
  { lat: 37.764556, lng: -122.426643, name: "Dorothea Kreiger" },
  { lat: 37.768425, lng: -122.420215, name: "Mitchel Sporer" },
  { lat: 37.767518, lng: -122.415952, name: "Brannon Upton" },
  { lat: 37.765122, lng: -122.4103, name: "Rebeca Koss" },
  { lat: 37.764609, lng: -122.410264, name: "Cryus Spinka" },
  { lat: 37.764465, lng: -122.409145, name: "Dedrick Weber" },
  { lat: 37.764508, lng: -122.408136, name: "Althea Reynolds" },
  { lat: 37.766544, lng: -122.408485, name: "Una Rohan" },
  { lat: 37.763681, lng: -122.408139, name: "Buddy Aufderhar" },
  { lat: 37.764085, lng: -122.411032, name: "Terrell Reiner" },
  { lat: 37.766515, lng: -122.41082, name: "Gabe Hills" }
];

const mapProps = {
  center: {
  lat: 37.773972,
  lng: -122.431297
  },
  zoom: 14,
  key: 'AIzaSyAyPqAkq2s9Z75QzarTAQHSHTxaNnVDqeE'
};

const MapWithAMakredInfoWindow = compose(withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={mapProps.zoom}
    defaultCenter={mapProps.center}
  >
    {addresses.map(marker => {
      const onClick = props.onClick.bind(this, marker)
        return (
          <Marker
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={onClick}
          >
            {props.selectedMarker === marker && <InfoWindow
             onCloseClick={props.onToggleOpen}
             >
              <div>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={{
                    chart: {
                      type: 'networkgraph',
                      width: 600,
                    },
                    title: {
                      text: marker.name
                    },
                    plotOptions: {
                      networkgraph: {
                        keys: ['from', 'to'],
                      }
                    },
                    series: [{
                      id: 'language-tree',
                      marker: {
                        radius: 5
                      },
                      dataLabels: {
                        enabled: true,
                        linkFormat: '',
                        allowOverlap: true
                      },
                      data: [
                        ['Proto Indo-European', 'Balto-Slavic'],
                        ['Proto Indo-European', 'Germanic'],
                        ['Proto Indo-European', 'Celtic'],
                        ['Proto Indo-European', 'Italic'],
                        ['Proto Indo-European', 'Hellenic'],
                      ]
                    }]
                  }}
                />
              </div>     
            </InfoWindow>}
          </Marker>
        )
      })}
   
  </GoogleMap>
);

export default class ShelterMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shelters: [],
      selectedMarker: false
    }
  }

  componentDidMount() {
    addresses.map(item => {
      Geocode.fromLatLng(item.lat, item.lng).then(
        response => {
          const address = response.results[0].formatted_address;
          console.log(address);
        },
        error => {
          console.error(error);
        }
      );
    })
    
  }

  handleClick = (marker, event) => {
    // console.log({ marker })
    this.setState({ selectedMarker: marker })
  }
  
  render() {
  return (<MapWithAMakredInfoWindow
    selectedMarker={this.state.selectedMarker}
    onClick={this.handleClick}
    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBAjdJr2k1xu8VDmAi5ISmPkD2P9uvZCU0&v=3.exp&libraries=geometry,drawing,places"
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `100vh` }} />}
    mapElement={<div style={{ height: `100%` }} />}
  />)
  }
}