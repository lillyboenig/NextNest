// src/components/MapPage.jsx
import React, { useState, useEffect, useContext } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as XLSX from "xlsx";
import wellknown from "wellknown";
import logo from "../images/Logo.png";
import { AuthContext } from "../context/AuthContext";
import { OULU_LAYER_DATA } from "../data/OuluLayerData";

// 1–5 color scale
const ratingColor5 = {
  1: "#eb5757",  // red
  2: "#f2994a",  // orange
  3: "#f2c94c",  // yellow
  4: "#6fcf97",  // yellow-green
  5: "#27ae60",  // green
};

// median helper
function getMedian(arr) {
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = (sorted.length - 1) / 2;
  if (sorted.length % 2 === 1) {
    return sorted[Math.floor(mid)];
  } else {
    const lo = sorted[Math.floor(mid)],
          hi = sorted[Math.ceil(mid)];
    return (lo + hi) / 2;
  }
}

const areaCenters = {
  Oulu: [65.0121, 25.4682],
  Helsinki: [60.1699, 24.9384],
};

const MapPage = () => {
  const { currentUser } = useContext(AuthContext);
  const prefs = currentUser?.preferences || {};
  const isUser1 = currentUser?.email === "user1@example.com";

  const initialCenter = areaCenters[prefs.area] || areaCenters.Oulu;

  // load + parse WKT → GeoJSON
  const [geoData, setGeoData] = useState(null);
  useEffect(() => {
    fetch("/finland-postal-codes-with-polygons.csv")
      .then((res) => (res.ok ? res.text() : Promise.reject(res.statusText)))
      .then((csvText) => {
        const wb = XLSX.read(csvText, { type: "string" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(ws, { defval: "" });

        const features = rows.map((row) => {
          const code = String(row.postinumeroalue || "").trim();
          let geometry = null;
          try {
            geometry = wellknown.parse(row.multi_polygon);
          } catch (e) {
            console.error("WKT→GeoJSON failed for", code, e);
          }
          return {
            type: "Feature",
            properties: { postalCode: code },
            geometry,
          };
        });

        setGeoData({ type: "FeatureCollection", features });
      })
      .catch(console.error);
  }, []);

  // which layers are toggled
  const [showChildren, setShowChildren] = useState(prefs.children > 0);
  const [showSchools, setShowSchools] = useState(false);
  const [showTransport, setShowTransport] = useState(false);
  const [showHiking, setShowHiking] = useState(false);
  const [showHousingPrices, setShowHousingPrices] = useState(false);
  const [showKindergartens, setShowKindergartens] = useState(false);
  const [showBikeLanes, setShowBikeLanes] = useState(false);
  const [showSkiSlopes, setShowSkiSlopes] = useState(false);

  // combined–style function
  const styleCombined = (feature) => {
    const code = feature.properties.postalCode;
    const selectedKeys = [];

    if (showChildren) selectedKeys.push("children");
    if (showHousingPrices) selectedKeys.push("housing");
    if (isUser1) {
      if (showSchools) selectedKeys.push("schools");
      if (showTransport) selectedKeys.push("transport");
      if (showHiking) selectedKeys.push("hiking");
    } else {
      if (showKindergartens) selectedKeys.push("kindergartens");
      if (showBikeLanes) selectedKeys.push("bikeLanes");
      if (showSkiSlopes) selectedKeys.push("skiSlopes");
    }

    // gather raw 1–3 ratings
    const ratings = selectedKeys
      .map((key) => OULU_LAYER_DATA[code]?.[key])
      .filter((v) => typeof v === "number");

    if (ratings.length === 0) {
      return { fillOpacity: 0 }; // nothing selected → fully transparent
    }

    // median across 1–3
    const medianRaw = getMedian(ratings);
    // scale to 1–5
    const scaled = (medianRaw - 1) * 2 + 1;
    const rating5 = Math.round(scaled);

    return {
      fillColor: ratingColor5[rating5] || "#ccc",
      weight: 1,
      color: "#fff",
      fillOpacity: 0.5,       // semi-transparent
    };
  };

  // styles...
  const page = { display: "flex", flexDirection: "column", height: "100vh", fontFamily: "'Roboto', sans-serif" };
  const header = { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 2rem", backgroundColor: "#fff", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", zIndex: 1000 };
  const hamburger = { display: "flex", flexDirection: "column", gap: "4px", cursor: "pointer" };
  const bar = { width: "25px", height: "3px", backgroundColor: "#24295B" };
  const content = { display: "flex", flex: 1, position: "relative" };
  const sidebar = {
    position: "absolute",
    top: "100px",
    left: "1rem",
    width: "300px",
    backgroundColor: "rgba(255,255,255,0.97)",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    padding: "1.5rem",
    zIndex: 500,
  };
  const sidebarTitle = { fontSize: "1.4rem", marginBottom: "0.5rem", color: "#24295B" };
  const sidebarDesc = { fontSize: "0.95rem", marginBottom: "1rem", color: "#555", lineHeight: 1.4 };
  const label = { display: "flex", alignItems: "center", marginBottom: "0.65rem", color: "#333", fontSize: "1rem" };
  const mapContainer = { flex: 1, margin: 0 };
  const footer = { textAlign: "center", padding: "1rem", backgroundColor: "#fafafa", borderTop: "1px solid #ccc" };

  return (
    <div style={page}>
      <header style={header}>
        <img src={logo} alt="NextNest Logo" style={{ height: "40px" }} />
        <div style={hamburger}>
          <div style={bar} />
          <div style={bar} />
          <div style={bar} />
        </div>
      </header>

      <div style={content}>
        <div style={sidebar}>
          <h2 style={sidebarTitle}>Customize View</h2>
          <p style={sidebarDesc}>
            Toggle these layers and see a combined, color-coded median ranking (1–5) for each area.
          </p>

          <label style={label}>
            <input type="checkbox" checked={showChildren} onChange={e => setShowChildren(e.target.checked)} />
            <span style={{ marginLeft: "0.5rem" }}>Children (Under 18)</span>
          </label>

          {isUser1 ? (
            <>
              <label style={label}>
                <input type="checkbox" checked={showSchools} onChange={e => setShowSchools(e.target.checked)} />
                <span style={{ marginLeft: "0.5rem" }}>Nearby Schools</span>
              </label>
              <label style={label}>
                <input type="checkbox" checked={showTransport} onChange={e => setShowTransport(e.target.checked)} />
                <span style={{ marginLeft: "0.5rem" }}>Public Transit</span>
              </label>
              <label style={label}>
                <input type="checkbox" checked={showHiking} onChange={e => setShowHiking(e.target.checked)} />
                <span style={{ marginLeft: "0.5rem" }}>Hiking Trails</span>
              </label>
            </>
          ) : (
            <>
              <label style={label}>
                <input type="checkbox" checked={showKindergartens} onChange={e => setShowKindergartens(e.target.checked)} />
                <span style={{ marginLeft: "0.5rem" }}>Nearby Kindergartens</span>
              </label>
              <label style={label}>
                <input type="checkbox" checked={showBikeLanes} onChange={e => setShowBikeLanes(e.target.checked)} />
                <span style={{ marginLeft: "0.5rem" }}>Bike Lanes</span>
              </label>
              <label style={label}>
                <input type="checkbox" checked={showSkiSlopes} onChange={e => setShowSkiSlopes(e.target.checked)} />
                <span style={{ marginLeft: "0.5rem" }}>Ski Slopes</span>
              </label>
            </>
          )}

          <label style={label}>
            <input type="checkbox" checked={showHousingPrices} onChange={e => setShowHousingPrices(e.target.checked)} />
            <span style={{ marginLeft: "0.5rem" }}>Housing Price Index</span>
          </label>
        </div>

        <div style={mapContainer}>
          <MapContainer center={initialCenter} zoom={12} style={{ width: "100%", height: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
            {geoData && <GeoJSON data={geoData} style={styleCombined} />}
          </MapContainer>
        </div>
      </div>

      <footer style={footer}>
        <nav>
          <a href="/support" style={{ margin: "0 1rem", color: "#24295B" }}>Support</a>
          <a href="/data-security" style={{ margin: "0 1rem", color: "#24295B" }}>Data Security</a>
          <a href="/info" style={{ margin: "0 1rem", color: "#24295B" }}>Info</a>
        </nav>
        <p style={{ color: "#777", marginTop: "0.5rem" }}>&copy; 2025 NextNest</p>
      </footer>
    </div>
  );
};

export default MapPage;
