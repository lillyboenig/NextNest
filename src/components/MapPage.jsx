import React, { useState, useEffect, useContext } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as XLSX from "xlsx";
import logo from "../images/Logo.png";
import { AuthContext } from '../context/AuthContext';

const dummyChildrenData = {
  "00100": { children: 35 },
  "00200": { children: 12 },
  "00300": { children: 4 },
  "00400": { children: 25 },
  "00500": { children: null },
};

const areaCenters = {
  Oulu: [65.0121, 25.4682],
  Helsinki: [60.1699, 24.9384],
};

const MapPage = () => {
  const { currentUser } = useContext(AuthContext);
  const prefs = currentUser?.preferences || {};

  const initialCenter = areaCenters[prefs.area] || areaCenters.Oulu;
  const [geoData, setGeoData] = useState(null);
  const [showChildrenOverlay, setShowChildrenOverlay] = useState(
    prefs.children > 0
  );

  useEffect(() => {
    fetch("/finland-postal-codes-with-polygons.csv")
      .then((res) => (res.ok ? res.text() : Promise.reject(res.statusText)))
      .then((csvText) => {
        const wb = XLSX.read(csvText, { type: "string" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(ws, { defval: "" });
        const features = rows.map((row) => {
          const code = String(row.postinumeroalue || "").trim();
          let coords = [];
          try {
            coords = JSON.parse(row.multi_polygon);
          } catch {}
          return {
            type: "Feature",
            properties: { postalCode: code },
            geometry: { type: "Polygon", coordinates: [coords] },
          };
        });
        const fc = { type: "FeatureCollection", features };
        fc.features.forEach((f) => {
          const code = f.properties.postalCode;
          f.properties.children =
            code in dummyChildrenData
              ? dummyChildrenData[code].children
              : null;
        });
        setGeoData(fc);
      })
      .catch(console.error);
  }, []);

  const getColor = (v) => {
    if (v == null) return "#ff0000";
    if (v < 5) return "#0000ff";
    if (v < 15) return "#a2d5ab";
    return "#3ea374";
  };

  const styleFeature = (f) => ({
    fillColor: getColor(f.properties.children),
    weight: 1,
    color: f.properties.children == null ? "#000" : "#fff",
    fillOpacity: 0.7,
    dashArray: "3",
  });
  // =====================================
  // Styles
  // =====================================
  const page = {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    fontFamily: "'Roboto', sans-serif",
  };

  const header = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    zIndex: 1000,
  };

  const logoStyle = { height: "40px", width: "auto" };
  const hamburger = {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    cursor: "pointer",
  };
  const bar = { width: "25px", height: "3px", backgroundColor: "#24295B" };

  const content = { display: "flex", flex: 1, position: "relative" };

  const sidebarWrapper = {
    position: "absolute",
    top: "100px",          // below header
    left: "1rem",
    width: "300px",
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    padding: "1rem",
    zIndex: 500,
  };

  const sidebarTitle = {
    fontSize: "1.25rem",
    marginBottom: "0.75rem",
    color: "#24295B",
  };

  const checkboxLabel = {
    display: "flex",
    alignItems: "center",
    marginBottom: "0.5rem",
    color: "#333",
    fontSize: "1rem",
  };
  const subCheckboxContainer = {
    marginLeft: "1.5rem",
    marginBottom: "0.75rem",
  };

  const aboutBar = {
    position: "absolute",
    bottom: "80px",      // above footer
    left: "1rem",
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: "0.75rem 1rem",
    borderRadius: "4px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    zIndex: 500,
  };
  const plus = {
    fontSize: "1.25rem",
    fontWeight: "bold",
    lineHeight: 1,
  };

  const mapContainer = {
    flex: 1,
    marginTop: "0",        // sits under header
    marginBottom: "0",     // above footer
  };

  const footer = {
    textAlign: "center",
    padding: "1rem",
    backgroundColor: "#fafafa",
    borderTop: "1px solid #ccc",
  };

  return (
    <div style={page}>
      <header style={header}>
        <img src={logo} alt="NextNest Logo" style={logoStyle} />
        {/* hamburger */}
      </header>

      <div style={content}>
        <div style={sidebarWrapper}>
          <h2 style={sidebarTitle}>Your choices</h2>

          <label style={checkboxLabel}>
            <input
              type="checkbox"
              checked={showChildrenOverlay}
              onChange={e => setShowChildrenOverlay(e.target.checked)}
            />
            <span style={{ marginLeft: "0.5rem" }}>Children (Under 18)</span>
          </label>

          {/* … other checkboxes … */}
        </div>

        <div style={mapContainer}>
          <MapContainer
            center={initialCenter}
            zoom={12}
            style={{ width: "100%", height: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {showChildrenOverlay && geoData && (
              <GeoJSON data={geoData} style={styleFeature} />
            )}
          </MapContainer>

          <div style={aboutBar} onClick={() => alert("More info coming soon!")}>
            <span>About the neighborhood</span>
            <span style={plus}>＋</span>
          </div>
        </div>
      </div>

      <footer style={footer}>…</footer>
    </div>
  );
};

export default MapPage;