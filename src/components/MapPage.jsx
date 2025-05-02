import React, { useState, useEffect, useContext } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as XLSX from "xlsx";
import wellknown from "wellknown";
import logo from "../images/Logo.png";
import { AuthContext } from "../context/AuthContext";
import { LAYER_DATA } from "../data/LayerData";

const ratingColor5 = {
  1: "#e74c3c", // Very Poor
  2: "#e67e22", // Poor
  3: "#f1c40f", // Average
  4: "#2ecc71", // Good
  5: "#27ae60"  // Excellent
};

function getMedian(arr) {
  const s = [...arr].sort((a, b) => a - b);
  const m = (s.length - 1) / 2;
  return s.length % 2
    ? s[Math.floor(m)]
    : (s[Math.floor(m)] + s[Math.ceil(m)]) / 2;
}

const areaCenters = {
  Oulu:      [65.0121, 25.4682],
  Helsinki:  [60.1699, 24.9384]
};

const MapPage = () => {
  const { currentUser } = useContext(AuthContext);
  const rawArea = currentUser?.preferences.area || "Oulu";
  // Normalize area string to match your keys exactly
  const area = rawArea.charAt(0).toUpperCase() + rawArea.slice(1).toLowerCase();
  const dataForArea = LAYER_DATA[area] || {};
  const isUser1 = area === "Oulu";

  const initialCenter = areaCenters[area] || areaCenters.Oulu;

  // Fetch WKT CSV → GeoJSON
  const [geoData, setGeoData] = useState(null);
  useEffect(() => {
    fetch("/finland-postal-codes-with-polygons.csv")
      .then(r => r.ok ? r.text() : Promise.reject(r.statusText))
      .then(csv => {
        const wb = XLSX.read(csv, { type: "string" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(ws, { defval: "" });
        const features = rows.map(row => {
          const code = String(row.postinumeroalue || "").trim();
          let geom = null;
          try {
            geom = wellknown.parse(row.multi_polygon);
          } catch {
            console.error("WKT parse failed for", code);
          }
          return { type: "Feature", properties: { postalCode: code }, geometry: geom };
        });
        setGeoData({ type: "FeatureCollection", features });
      })
      .catch(console.error);
  }, []);

  // Toggle states
  const [showChildren, setShowChildren]       = useState(true);
  const [showSchools, setShowSchools]         = useState(false);
  const [showTransport, setShowTransport]     = useState(false);
  const [showHiking, setShowHiking]           = useState(false);
  const [showHousing, setShowHousing]         = useState(false);
  const [showKindergartens, setShowKindergartens] = useState(false);
  const [showBikeLanes, setShowBikeLanes]     = useState(false);
  const [showSkiSlopes, setShowSkiSlopes]     = useState(false);

  const styleCombined = feature => {
    const code = feature.properties.postalCode;
    const keys = [];

    if (showChildren) keys.push("children");
    if (showHousing)  keys.push("housing");
    if (isUser1) {
      if (showSchools)   keys.push("schools");
      if (showTransport) keys.push("transport");
      if (showHiking)    keys.push("hiking");
    } else {
      if (showKindergartens) keys.push("kindergartens");
      if (showBikeLanes)     keys.push("bikeLanes");
      if (showSkiSlopes)     keys.push("skiSlopes");
    }

    const vals = keys
      .map(k => dataForArea[code]?.[k])
      .filter(v => typeof v === "number");

    if (!vals.length) return { fillOpacity: 0 };

    const median = Math.round(getMedian(vals)); 
    return {
      fillColor: ratingColor5[median] || "#ccc",
      weight: 1,
      color: "#fff",
      fillOpacity: 0.7
    };
  };

  // Styles
  const page =       { display: "flex", flexDirection: "column", height: "100vh", fontFamily: "'Roboto', sans-serif'" };
  const header =     { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 2rem", backgroundColor: "#fff", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", zIndex: 1000 };
  const hamburger =  { display: "flex", flexDirection: "column", gap: "4px", cursor: "pointer" };
  const bar =        { width: "25px", height: "3px", backgroundColor: "#24295B" };
  const content =    { display: "flex", flex: 1, position: "relative" };
  const sidebar =    { position: "absolute", top: "100px", left: "1rem", width: "300px", backgroundColor: "rgba(255,255,255,0.97)", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)", padding: "1.5rem", zIndex: 500 };
  const title =      { fontSize: "1.4rem", marginBottom: "0.5rem", color: "#24295B" };
  const desc =       { fontSize: "0.95rem", marginBottom: "1rem", color: "#555", lineHeight: 1.4 };
  const label =      { display: "flex", alignItems: "center", marginBottom: "0.65rem", color: "#333", fontSize: "1rem" };
  const legendTitle ={ fontSize: "1rem", fontWeight: "bold", margin: "1rem 0 0.5rem" };
  const legendItem = { display: "flex", alignItems: "center", marginBottom: "0.25rem" };
  const colorBox = c => ({ width: "16px", height: "16px", backgroundColor: c, marginRight: "0.5rem", border: "1px solid #aaa" });
  const mapArea =    { flex: 1, margin: 0 };
  const footer =     { textAlign: "center", padding: "1rem", backgroundColor: "#fafafa", borderTop: "1px solid #ccc" };
  
  return (
    <div style={page}>
      <header style={header}>
        <img src={logo} alt="NextNest Logo" style={{ height: "40px" }} />
        <div style={hamburger}>
          <div style={bar} /><div style={bar} /><div style={bar} />
        </div>
      </header>

      <div style={content}>
        <div style={sidebar}>
          <h2 style={title}>Customize View</h2>
          <p style={desc}>Toggle these layers to see combined, vibrant median rankings.</p>

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
            <input type="checkbox" checked={showHousing} onChange={e => setShowHousing(e.target.checked)} />
            <span style={{ marginLeft: "0.5rem" }}>Housing Price Index</span>
          </label>

          <div style={legendTitle}>Legend</div>
          {[5,4,3,2,1].map(val => (
            <div key={val} style={legendItem}>
              <span style={colorBox(ratingColor5[val])} />
              {val} {val===5?"Excellent":val===4?"Good":val===3?"Average":val===2?"Poor":"Very Poor"}
            </div>
          ))}
        </div>

        <div style={mapArea}>
          <MapContainer center={initialCenter} zoom={12} style={{ width: "100%", height: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
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
