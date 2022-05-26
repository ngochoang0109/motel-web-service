import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import './Map.css';
import LocationPin from './../LocationPin/LocationPin';
import axios from 'axios';
import { FOOTER_URL_GOOGLE_API, HEADER_URL_GOOGLE_API } from '../../constants/API';

const MapContainer = (props, { ...rest }) => {

    const headerUrl = HEADER_URL_GOOGLE_API;
    const footerUrl = FOOTER_URL_GOOGLE_API;

    const [locationState, setLocationState] = useState({
        latitude: props.location.lat,
        longitude: props.location.lng,
        address: props.location.address,
        zoom: props.zoomLevel
    });

    const getLocationFromAddress = (bodyUrl, location, zoom, aad) => {
        axios({
            headers: {},
            method: 'GET',
            url: `${headerUrl}${bodyUrl}${footerUrl}`
        })
            .then((res) => {
                return res.data;
            })
            .then((address) => {
                console.log(aad)
                console.log(address.results)
                setLocationState({
                    latitude: address.results[0].geometry.location.lat,
                    longitude: address.results[0].geometry.location.lng,
                    address: location,
                    zoom: zoom
                });
            });
    }


    useEffect(() => {
        // get location for province, district, ward.
        let bodyUrl = ``;
        if (props.address.provinceName !== '') {
            bodyUrl = `${bodyUrl}address=+${props.address.provinceName}`;
            getLocationFromAddress(bodyUrl, props.address.provinceName, 14, "tinh");
            if (props.address.districtName !== '') {
                bodyUrl = `${bodyUrl},+${props.address.districtName}`;
                getLocationFromAddress(bodyUrl, props.address.districtName, 14, "quan");
                if (props.address.wardName !== '') {
                    bodyUrl = `${bodyUrl},+${props.address.wardName}`;
                    console.log(bodyUrl);
                    getLocationFromAddress(bodyUrl, props.address.wardName, 16, "phuong");
                    if (props.address.houseAndStreet !== '') {
                        bodyUrl = `${bodyUrl},+${props.address.houseAndStreet}`;
                        getLocationFromAddress(bodyUrl, props.address.houseAndStreet, 18);
                        props.handlerLocation({ latitude: locationState.latitude, longitude: locationState.longitude });
                        return;
                    }
                }
            }
        }
    }, [props.address.provinceName, props.address.districtName, props.address.wardName, props.address.houseAndStreet])

    const renderMarkers = (map, maps) => {
        let marker = new maps.Marker({
            position: { lat: locationState.latitude, lng: locationState.longitude },
            map: map,
            title: 'User location'
        });
        return marker;
    };


    const handlerSelectLocation = (event) => {

        props.handlerLocation({ latitude: event.lat, longitude: event.lng });

        setLocationState({
            latitude: event.lat,
            longitude: event.lng
        });

    }

    const loadMap = () => {
        return (<GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyDJuUbaaJszox_3o-_H1gsF2NnFd3QI_RU' }}
            zoom={locationState.zoom}
            center={{ lat: locationState.latitude, lng: locationState.longitude }}
            onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
            yesIWantToUseGoogleMapApiInternals
            onClick={handlerSelectLocation}
        >
            <LocationPin lat={locationState.latitude}
                lng={locationState.longitude}
                text={props.location.address}></LocationPin>
        </GoogleMapReact>);
    }

    return (
        <div className="map">
            <div className="google-map" style={{
                height: `${props.height}rem`,
                width: "100%",
                marginBottom: "1rem"
            }}>
                {loadMap()}
            </div>
        </div >
    )

}

export default MapContainer;