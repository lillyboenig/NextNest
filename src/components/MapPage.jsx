// src/components/MapPage.jsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import * as XLSX from 'xlsx';
import 'leaflet/dist/leaflet.css';
// Import your GeoJSON file for Finland postal codes
import finGeoJson from '../data/Finland-postal-codes-with-polygons.json';

const MapPage = () => {
  // State for mapping area code -> under-15 percentage from Excel
  const [regionData, setRegionData] = useState({});
  // State for Helsinki translation mapping: postal -> area code
  const [translationMapping, setTranslationMapping] = useState(null);
  // State for merged GeoJSON data
  const [geoData, setGeoData] = useState(null);
  // Toggle for showing the children overlay on the map
  const [showChildrenOverlay, setShowChildrenOverlay] = useState(true);

  // Load and parse the Excel file from the public folder
  useEffect(() => {
    fetch('/Postal-codes-age.xlsx')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.arrayBuffer();
      })
      .then(arrayBuffer => {
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        // Force headers: "Alue" for area code, "vaesto_alle15_p" for percentage.
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          header: ["Alue", "vaesto_alle15_p"],
          defval: ""
        });
        const mapping = {};
        jsonData.forEach(row => {
          if (row.Alue && row.vaesto_alle15_p !== "") {
            mapping[row.Alue] = parseFloat(row.vaesto_alle15_p);
          }
        });
        setRegionData(mapping);
      })
      .catch(error => console.error("Error loading Excel file:", error));
  }, []);

  // Load the Helsinki region mapping CSV file (exported from Numbers)
  useEffect(() => {
    fetch('/Helsinki_Region_Mapping (2).csv')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then(text => {
        // Use XLSX to parse CSV text. Make sure your CSV has headers "area" and "postal"
        const workbook = XLSX.read(text, { type: 'string' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          header: ["area", "postal"],
          defval: ""
        });
        // Build an inverted mapping: key is postal code, value is area code.
        let mapping = {};
        jsonData.forEach(row => {
          // Skip header row if necessary (e.g., if row.area equals "area")
          if (row.area && row.postal && row.area !== "area" && row.postal !== "postal") {
            mapping[row.postal] = row.area;
          }
        });
        setTranslationMapping(mapping);
      })
      .catch(error => console.error("Error loading Helsinki mapping CSV:", error));
  }, []);

  // Helper: Given an area code, return its under-15 percentage.
  const getPercentageForRegion = (areaCode) => {
    return regionData[areaCode] || null;
  };

  // Map a percentage to a green intensity.
  const getColorForPercentage = (p) => {
    if (p === null) return '#ffffff'; // white if no data
    if (p < 10) return '#e0f7e9';
    else if (p < 15) return '#a2d5ab';
    else if (p < 20) return '#70c188';
    else return '#3ea374';
  };

  // Merge the Excel data and translation mapping with the imported GeoJSON.
  useEffect(() => {
    // Wait until both the Excel data and translation mapping are loaded.
    if (Object.keys(regionData).length === 0 || translationMapping === null) return;

    // Make a deep copy of the imported GeoJSON
    let geojsonCopy = JSON.parse(JSON.stringify(finGeoJson));
    // Wrap into FeatureCollection if necessary.
    if (!geojsonCopy.features) {
      if (Array.isArray(geojsonCopy)) {
        geojsonCopy = { type: "FeatureCollection", features: geojsonCopy };
      } else {
        console.error("Invalid GeoJSON structure", geojsonCopy);
        return;
      }
    }

    // For each feature, extract the postal code and translate it to an area code.
    geojsonCopy.features.forEach(feature => {
      const props = feature.properties && Object.keys(feature.properties).length > 0 ? feature.properties : feature;
      // Extract postal code from GeoJSON. Here we check "postinumeroalue" first.
      const postalCode = props.postinumeroalue || props.postalCode || props.ADM3_CODE || props.code || props.Alue;
      // Use the translation mapping to convert the postal code to the area code used in the Excel file.
      const areaCode = translationMapping[postalCode] || postalCode;
      const percentage = areaCode ? getPercentageForRegion(areaCode) : null;
      feature.properties = { ...props, childrenPercentage: percentage };
      console.log(`Merged region: postal ${postalCode} -> area ${areaCode} => ${percentage}`);
    });
    setGeoData(geojsonCopy);
  }, [regionData, translationMapping]);

  // Style function for GeoJSON features.
  const styleFeature = (feature) => {
    const percentage = feature.properties.childrenPercentage;
    return {
      fillColor: getColorForPercentage(percentage),
      weight: 1,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7,
    };
  };

  // Inline styles for layout.
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f4',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#eee',
  };

  const logoStyle = {
    margin: 0,
    fontSize: '1.5rem',
    fontWeight: 'bold',
  };

  const hamburgerMenuStyle = {
    width: '30px',
    height: '30px',
    backgroundColor: '#ccc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const mainContentStyle = {
    flex: 1,
    display: 'flex',
  };

  const sidebarStyle = {
    width: '300px',
    backgroundColor: '#fff',
    padding: '1rem',
    boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
  };

  const sidebarTitleStyle = {
    fontSize: '1.2rem',
    marginBottom: '1rem',
  };

  const checkboxGroupStyle = {
    marginBottom: '1rem',
  };

  const checkboxLabelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
  };

  const aboutButtonStyle = {
    marginTop: '1rem',
    padding: '0.75rem 1rem',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  };

  const mapContainerStyle = {
    flex: 1,
    position: 'relative',
  };

  const footerStyle = {
    textAlign: 'center',
    padding: '1rem',
    backgroundColor: '#eee',
  };

  return (
    <div style={containerStyle}>
      {/* HEADER */}
      <header style={headerStyle}>
        <h1 style={logoStyle}>NextNest</h1>
        <div style={hamburgerMenuStyle}>
          <div style={{ width: '15px', height: '2px', backgroundColor: '#333', marginBottom: '3px' }} />
          <div style={{ width: '15px', height: '2px', backgroundColor: '#333', marginBottom: '3px' }} />
          <div style={{ width: '15px', height: '2px', backgroundColor: '#333' }} />
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
              /> Children (Under 15)
            </label>
            <label style={checkboxLabelStyle}>
              <input type="checkbox" /> Air Quality
            </label>
            <label style={checkboxLabelStyle}>
              <input type="checkbox" /> Criminality
            </label>
          </div>
          <div style={checkboxGroupStyle}>
            <p style={{ marginBottom: '0.5rem' }}>Next Bus-station</p>
            <label style={checkboxLabelStyle}>
              <input type="checkbox" /> 2 minutes walking
            </label>
            <label style={checkboxLabelStyle}>
              <input type="checkbox" /> 5 minutes walking
            </label>
            <label style={checkboxLabelStyle}>
              <input type="checkbox" /> 10 minutes walking
            </label>
            <label style={checkboxLabelStyle}>
              <input type="checkbox" /> 15 minutes walking
            </label>
            <label style={checkboxLabelStyle}>
              <input type="checkbox" /> over 20 minutes of walking
            </label>
          </div>
          <div style={checkboxGroupStyle}>
            <label style={checkboxLabelStyle}>
              <input type="checkbox" /> Supermarkets
            </label>
          </div>
          <button style={aboutButtonStyle}>About the neighborhood</button>
        </aside>

        {/* MAP AREA */}
        <div style={mapContainerStyle}>
          <MapContainer
            center={[60.1699, 24.9384]} // Helsinki center
            zoom={12}
            style={{ width: '100%', height: '100%' }}
          >
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
        <p>&copy; 2025 NextNest</p>
      </footer>
    </div>
  );
};

export default MapPage;
