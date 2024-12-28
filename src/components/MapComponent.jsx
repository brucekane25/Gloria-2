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
    iconUrl: "/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: `/marker-shadow.png`,
    shadowSize: [41, 41],
  });

  const defaultPosition = [20.5937, 78.9629];
  const markersRef = useRef({});
  const clusterGroupRef = useRef(null);

  const MapUpdater = ({ selectedEvent }) => {
    const map = useMap();

    useEffect(() => {
      if (selectedEvent) {
        const marker = markersRef.current[selectedEvent._id];
        const clusterGroup = clusterGroupRef.current;

        if (marker && clusterGroup) {
          setTimeout(() => {
            clusterGroup.zoomToShowLayer(marker, () => {
              marker.openPopup();
            });
          }, 100);
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
      style={{ margin: 0, padding: 0, minHeight: "100%", width: "100%" }}
    >
      <LayersControl position="topright">
        <LayersControl.Overlay name="OpenStreetMap">
          <TileLayer
            attribution='<a href="https://www.maptiler.com/copyright">OpenStreetMap</a>'
            url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?key=2b4nj2gRRkpUERQZxBXB`}
          />
        </LayersControl.Overlay>

        <LayersControl.Overlay checked name="MapTiler">
          <TileLayer
            attribution='<a href="https://www.maptiler.com/copyright">MapTiler</a>'
            url={`https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=pUdLG48OR57uT9vDP5mK`}
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
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="LightGray">
          <TileLayer
            attribution='<a href="https://www.maptiler.com/copyright">ThunderForestMaps</a>'
            url="https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
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
        disableClusteringAtZoom={9}
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
                  {event.thumbnail && (
                    <img
                      className="h-40 w-40 object-cover rounded-md flex-shrink"
                      src={event.thumbnail}
                      alt={event.title || "Event Thumbnail"}
                    />
                  )}

                  <div className="flex flex-col justify-between gap-3 flex-grow">
                    <div>
                      <h3 className="text-base line-clamp-6 font-normal  text-gray-900 ">
                        {event.title}
                      </h3>
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
