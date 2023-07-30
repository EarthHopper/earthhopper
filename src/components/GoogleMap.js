import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px"
};

const GoogleMapComponent = ({ center, zoom, markers }) => {
  return (
    <div className="rounded">
      <LoadScript googleMapsApiKey="AIzaSyDlp2yGurVp3IJV_st_XlBkQxur47ScIpM">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
        >
          {markers &&
            markers.map((marker, index) => (
              <Marker
                key={index}
                position={marker.position}
                title={marker.title}
              />
            ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default GoogleMapComponent;
