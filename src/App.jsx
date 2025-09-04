import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import Content from './Content';

function App() {
  const [subjectsData, setSubjectsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataID, setDataID] = useState(""); // Default to bc1

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        console.log(`Loading data from: ./data/${dataID}.json`); // Debug log
        const module = await import(`./data/${dataID}.json`);
        setSubjectsData(module.default);
        console.log('Data loaded successfully:', module.default); // Debug log
      } catch (error) {
        console.error(`Failed to load data from ./data/${dataID}.json:`, error);
        setSubjectsData([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [dataID]); // This will re-run whenever dataID changes

  // Function to handle ID changes from Nav
  const handleNavClick = (newID) => {
    setDataID(newID);
  };

  if (isLoading) {
    return <div className="loading">Loading {dataID} data...</div>;
  }

  return (
    <div className="container">
      <Nav onNavClick={handleNavClick} currentDataID={dataID} />
      <Content subjectsData={subjectsData} />
    </div>
  );
}

export default App;