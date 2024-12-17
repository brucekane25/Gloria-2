import React, { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  LayersControl,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import indiaOutline from "../assets/India_Outline_Map";
import { GeoJSON } from "react-leaflet";
import { colors } from "@mui/material";

const MapComponent = ({ events, selectedEvent }) => {
  const customIcon = L.icon({
    iconUrl: "/marker-icon.png", // Path to your icon
    iconSize: [25, 41], // Size of the icon
    iconAnchor: [12, 41], // Anchor point of the icon
    popupAnchor: [1, -34], // Popup's anchor point
    shadowUrl: `/marker-shadow.png`, // Optional shadow image
    shadowSize: [41, 41], // Size of the shadow
  });
  
  
  const defaultPosition = [20.5937, 78.9629]; // Default to India
  const markersRef = useRef({}); // To store markers
  const clusterGroupRef = useRef(null); // To store cluster group reference

  // Component to handle map updates
  const MapUpdater = ({ selectedEvent }) => {
    const map = useMap();

    useEffect(() => {
      if (selectedEvent) {
        const marker = markersRef.current[selectedEvent._id];
        const clusterGroup = clusterGroupRef.current;

        if (marker && clusterGroup) {
          // Ensure zoomToShowLayer works only when marker is part of the cluster group
          setTimeout(() => {
            clusterGroup.zoomToShowLayer(marker, () => {
              marker.openPopup();
            });
          }, 100); // Adjust delay if necessary
        } else {
          console.warn("Marker not found or not part of the cluster group.");
        }
      }
    }, [selectedEvent, map]);

    return null;
  };

  return (
    <MapContainer
      center={defaultPosition}
      zoom={2}
      worldCopyJump={false}
      minZoom={2}
      maxBounds={[
        [-90, -280],
        [90, 280],
      ]}
      maxBoundsViscosity={1}
      style={{ margin: 0, padding:0, minHeight: "100%", width: "100%" }}
    >
      <LayersControl position="topright">
        <LayersControl.Overlay  name="OpenStreetMap">
          <TileLayer
            attribution='<a href="https://www.maptiler.com/copyright">OpenStreetMap</a>'
            url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?key=2b4nj2gRRkpUERQZxBXB`}
          />
        </LayersControl.Overlay>

        <LayersControl.Overlay checked name="MapTiler">
          <TileLayer
            attribution='<a href="https://www.maptiler.com/copyright">MapTiler</a>'
            // url={`https://api.maptiler.com/tiles/satellite-v2/{z}/{x}/{y}.jpg?key=2b4nj2gRRkpUERQZxBXB`}
            url={`https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=2b4nj2gRRkpUERQZxBXB`}
          />
        </LayersControl.Overlay>

        <LayersControl.Overlay name="StadiaMap-Dark">
          <TileLayer
            attribution='<a href="https://www.maptiler.com/copyright">StadiaMaps</a>'
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
          />
        </LayersControl.Overlay>

        <LayersControl.Overlay name="CartoCDN-dark">
          <TileLayer
            attribution='<a href="https://www.maptiler.com/copyright">ThunderForestMaps</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Detailed">
          <TileLayer
            attribution='<a href="https://www.maptiler.com/copyright">ThunderForestMaps</a>'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}" // colorful map nice details
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="LightGray">
          <TileLayer
            attribution='<a href="https://www.maptiler.com/copyright">ThunderForestMaps</a>'
            url="https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}" //light map
          />
        </LayersControl.Overlay>
      </LayersControl>

      <GeoJSON
        data={indiaOutline}
        style={{
          color: "black",
          weight: 1 / 7,
          opacity: 1,
          fillOpacity: 0,
        }}
      ></GeoJSON>
      <MarkerClusterGroup
        ref={clusterGroupRef}
        disableClusteringAtZoom={12}
        maxClusterRadius={60}
      >
        {events.map((event) => (
          <Marker
            key={event._id}
            icon={customIcon}
            position={[event.coordinates.lat, event.coordinates.lon]}
            ref={(marker) => {
              if (marker) {
                markersRef.current[event._id] = marker;
              }
            }}
          >
            <Popup>
              <div className="min-w-[370px] max-w-2xl p-4 bg-white rounded-lg shadow-2xl">
                <div className="flex flex-row gap-6">
                  {/* Thumbnail */}
                  {event.thumbnail && (
                    <img
                      className="h-40 w-40 object-cover rounded-md flex-shrink-0"
                      src={event.thumbnail}
                      alt={event.title || "Event Thumbnail"}
                    />
                  )}

                  {/* Text Content */}
                  <div className="flex flex-col justify-between gap-3 flex-grow">
                    <div>
                      <h2 className="text-base font-medium text-gray-800 line-clamp-4">
                        {event.title}
                      </h2>
                      <a
                        href={`https://en.wikipedia.org/?curid=${event.pageID}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-900 hover:underline text-sm"
                      >
                        Know More
                      </a>
                    </div>
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-700">
                        {event.year}
                      </h3>
                      <h3 className="text-base font-medium text-gray-500">
                        {event.category}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>

      <MapUpdater selectedEvent={selectedEvent} />
    </MapContainer>
  );
};

export default MapComponent;
