import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import Content from './Content';

function App() {
  const [subjectsDataWinter, setWinterSubjects] = useState([]);
  const [subjectsDataSummer, setSummerSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataID, setDataID] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const winterModule = await import(`./data/${dataID}Summer.json`);
        const summerModule = await import(`./data/${dataID}Winter.json`);
        setWinterSubjects(winterModule.default);
        setSummerSubjects(summerModule.default);
      } catch (error) {
        console.error(`Failed to load data from ./data/${dataID}.json:`, error);
        setSummerSubjects([]);
        setWinterSubjects([]);
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
    return <div className="loading"></div>;
  }

  return (
    <div className="container">
      <Nav onNavClick={handleNavClick} currentDataID={dataID} />
      <Content winterData={subjectsDataWinter} summerData={subjectsDataSummer} />
    </div>
  );
}

export default App;