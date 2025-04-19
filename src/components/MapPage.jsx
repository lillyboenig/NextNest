// src/components/MapPage.jsx
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as XLSX from "xlsx";

/*
  Dummy children data for Helsinki (made‑up data).
  Only these postal areas have dummy children percentages;
  other areas in Finland will be left with no data (null).
  Adjust or extend as needed.
*/
const dummyChildrenData = {
  "00100": { children: 35 },
  "00200": { children: 12 },
  "00300": { children: 4 },
  "00400": { children: 25 },
  "00500": { children: null }
};

const MapPage = () => {
  // State for the merged GeoJSON data that includes our children data.
  const [geoData, setGeoData] = useState(null);
  // Toggle for showing the children overlay.
  const [showChildrenOverlay, setShowChildrenOverlay] = useState(false);

  // useEffect to fetch and parse the CSV file into GeoJSON,
  // then merge in the dummy children data.
  useEffect(() => {
    fetch("/finland-postal-codes-with-polygons.csv")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((csvText) => {
        // Parse the CSV text using XLSX.
        const workbook = XLSX.read(csvText, { type: "string" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        // Convert the sheet to JSON.
        // We expect the CSV to have columns such as: postinumeroalue, nimi, ..., multi_polygon, etc.
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
        
        // Convert CSV rows to GeoJSON features.
        const features = jsonData.map((row) => {
          // Use "postinumeroalue" as the postal code.
          const postalCode = row.postinumeroalue ? String(row.postinumeroalue).trim() : "";
          
          // Parse the geometry data from the "multi_polygon" column.
          // We assume that the CSV column "multi_polygon" contains a JSON array of coordinates,
          // for example: "[[25.45,65.00],[25.47,65.00],[25.47,65.02],[25.45,65.02]]"
          let coordinates = [];
          try {
            coordinates = JSON.parse(row.multi_polygon);
          } catch (e) {
            console.error("Error parsing geometry for postal code", postalCode, e);
          }
          
          // Construct a GeoJSON feature.
          // The GeoJSON geometry type "Polygon" expects an array of linear rings,
          // so we wrap the coordinates array in an additional array.
          return {
            type: "Feature",
            properties: { postalCode },
            geometry: {
              type: "Polygon",
              coordinates: [coordinates],
            },
          };
        });

        // Assemble a FeatureCollection.
        const geojson = {
          type: "FeatureCollection",
          features,
        };

        // Merge dummy children data into each feature.
        geojson.features.forEach((feature) => {
          const props = feature.properties || {};
          // Here we expect our CSV provided postal code under the key "postalCode" in our feature.
          // Since we set that above from "postinumeroalue", we use it directly.
          const postalCode = props.postalCode ? String(props.postalCode).trim() : "";
          // Look up dummy data for this postal code.
          const childrenValue = dummyChildrenData.hasOwnProperty(postalCode)
            ? dummyChildrenData[postalCode].children
            : null;
          // Merge dummy children data into the feature properties.
          feature.properties = { ...props, children: childrenValue };
          console.log(`Merged postal code: ${postalCode} -> children: ${childrenValue}`);
        });
        setGeoData(geojson);
      })
      .catch((error) => console.error("Error fetching or parsing CSV:", error));
  }, []);

  // Define color rules based on the children percentage.
  // - Returns red (#ff0000) if the value is null (no data).
  // - Returns blue (#0000ff) if the percentage is below 5.
  // - Otherwise, returns green shades for higher values.
  const getColorForChildren = (value) => {
    if (value === null || value === undefined) return "#ff0000";
    if (value < 5) return "#0000ff";
    if (value < 15) return "#a2d5ab";
    return "#3ea374";
  };

  // Style function for GeoJSON features.
  const styleFeature = (feature) => {
    const value = feature.properties.children;
    return {
      fillColor: getColorForChildren(value),
      weight: 1,
      opacity: 1,
      color: (value === null || value === undefined) ? "black" : "white",
      dashArray: "3",
      fillOpacity: 0.7,
    };
  };

  // Inline styles for basic layout.
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f4f4",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
    backgroundColor: "#eee",
  };

  const logoStyle = { margin: 0, fontSize: "1.5rem", fontWeight: "bold" };

  const hamburgerMenuStyle = {
    width: "30px",
    height: "30px",
    backgroundColor: "#ccc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const mainContentStyle = { flex: 1, display: "flex" };

  const sidebarStyle = {
    width: "300px",
    backgroundColor: "#fff",
    padding: "1rem",
    boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
  };

  const sidebarTitleStyle = { fontSize: "1.2rem", marginBottom: "1rem" };

  const checkboxGroupStyle = { marginBottom: "1rem" };

  const checkboxLabelStyle = { display: "block", marginBottom: "0.5rem" };

  const mapContainerStyle = { flex: 1, position: "relative" };

  const footerStyle = { textAlign: "center", padding: "1rem", backgroundColor: "#eee" };

  return (
    <div style={containerStyle}>
      {/* HEADER */}
      <header style={headerStyle}>
        <h1 style={logoStyle}>Oulu Children Data Demo</h1>
        <div style={hamburgerMenuStyle}>
          <div style={{ width: "15px", height: "2px", backgroundColor: "#333", marginBottom: "3px" }} />
          <div style={{ width: "15px", height: "2px", backgroundColor: "#333", marginBottom: "3px" }} />
          <div style={{ width: "15px", height: "2px", backgroundColor: "#333" }} />
        </div>
      </header>
      {/* MAIN CONTENT */}
      <main style={mainContentStyle}>
        {/* SIDEBAR */}
        <aside style={sidebarStyle}>
          <h2 style={sidebarTitleStyle}>Your choices</h2>
          <div style={checkboxGroupStyle}>
            <label style={checkboxLabelStyle}>
              <input
                type="checkbox"
                checked={showChildrenOverlay}
                onChange={(e) => setShowChildrenOverlay(e.target.checked)}
              />
              {" "}Children (Under 18)
            </label>
          </div>
          <p>
            <em>
              Note: Dummy children data is provided for a few Helsinki postal codes.
              All other areas appear with no data (red).
            </em>
          </p>
        </aside>
        {/* MAP AREA */}
        <div style={mapContainerStyle}>
          <MapContainer center={[65.0121, 25.4682]} zoom={12} style={{ width: "100%", height: "100%" }}>
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {showChildrenOverlay && geoData && (
              <GeoJSON data={geoData} style={styleFeature} />
            )}
          </MapContainer>
        </div>
      </main>
      {/* FOOTER */}
      <footer style={footerStyle}>
        <p>&copy; 2025 Oulu Children Data Demo</p>
      </footer>
    </div>
  );
};

export default MapPage;
