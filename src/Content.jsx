import React, { useState, useEffect } from 'react';
import './Content.css';
import SubjectTable from './SubjectTable';

function Content({ winterData, summerData }) {
  const [winterSubjects, setWinterSubjects] = useState([]);
  const [summerSubjects, setSummerSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      try {
        if (winterData && Array.isArray(winterData)) {
          setWinterSubjects(winterData);
        } else {
          setWinterSubjects([]);
        }
        
        if (summerData && Array.isArray(summerData)) {
          setSummerSubjects(summerData);
        } else {
          setSummerSubjects([]);
        }
        
        setIsLoading(false);
      } catch (e) {
        setError("Failed to process JSON data.");
        setIsLoading(false);
        console.error("Caught an error:", e);
      }
    }, 2000);
  }, [winterData, summerData]);

  // Welcome message logic
  let time = new Date().getHours();
  let welcomeMessage;
  if (time < 9) {
    welcomeMessage = "Dobré ráno!";
  } else if (time < 18) {
    welcomeMessage = "Dobrý deň!";
  } else {
    welcomeMessage = "Dobrý večer!";
  }

  // Check if we have any data to display
  const hasData = (winterData && Array.isArray(winterData) && winterData.length > 0) || 
                  (summerData && Array.isArray(summerData) && summerData.length > 0);

  if (hasData) {
    return (
      <div className="content">
        {isLoading ? (
          <div className="loading-div">
            <p>Načítavanie predmetov...</p>
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="table-div">
            <h2 className="table-header">Predmety</h2>
            
            {/* Winter Semester Table */}
            {winterSubjects.length > 0 && (
              <SubjectTable 
                subjects={winterSubjects} 
                semester="zimný" 
                title="Zimný semester"
              />
            )}
            
            {/* Summer Semester Table */}
            {summerSubjects.length > 0 && (
              <SubjectTable 
                subjects={summerSubjects} 
                semester="letný" 
                title="Letný semester"
              />
            )}
            
            
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="content loading-div">
        <div className="welcome-screen">
          <h1>{welcomeMessage}</h1>
          <p>Vyberte ročník pre zobrazenie predmetov.</p>
        </div>
      </div>
    );
  }
}

export default Content;