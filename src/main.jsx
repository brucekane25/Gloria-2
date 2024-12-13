import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css'; 
import './index.css'
import App from './App.jsx'
createRoot(document.getElementById('root')).render(
    <App />
)
