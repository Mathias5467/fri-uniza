import React, { useState, useEffect } from 'react';
import './Content.css';
import editLogo from './assets/edit.png';

function Content({ subjectsData }) {
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      try {
        if (subjectsData && Array.isArray(subjectsData)) {
          setSubjects(subjectsData);
        } else {
          setSubjects([]);
        }
        setIsLoading(false);
        console.log("Loaded JSON data:", subjectsData);
      } catch (e) {
        setError("Failed to process JSON data.");
        setIsLoading(false);
        console.error("Caught an error:", e);
      }
    }, 2000); // Reduced from 5000 to 2000 for better UX
  }, [subjectsData]);
  
  // Calculate total credits - move inside component or add safety check
  const totalKredity = subjectsData && subjectsData.length > 0 
    ? subjectsData.reduce((sum, subject) => sum + subject.Kredity, 0) 
    : 0;

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

  // Check if we have data to display
  const hasData = subjectsData && Array.isArray(subjectsData) && subjectsData.length > 0;

  if (hasData) {
    return (
      <div className="content">
        {isLoading ? (
          <div className="loading-div">
            <p>Načítavanie predmetov...</p>
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : subjects.length > 0 ? (
          <div className="table-div">
            <h2 className="table-header">Predmety</h2>
            <table className="data-table">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col">Predmet</th>
                  <th scope="col">Skratka</th>
                  <th scope="col">Typ</th>
                  <th scope="col">Kredity</th>
                  <th scope="col">Poznámky</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject, index) => (
                  <tr key={index}>
                    <td>{subject.Predmet}</td>
                    <td>{subject.Skratka}</td>
                    <td>{subject.Typ}</td>
                    <td>{subject.Kredity}</td>
                    <td className="notes-cell">{subject.Poznamky}</td>
                    <td className="edit">
                      <img className="edit-icon" alt="edit" src={editLogo} />
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td><strong>Spolu</strong></td>
                  <td colSpan={2}></td>
                  <td><strong>{totalKredity}</strong></td>
                  <td colSpan={2}></td>
                </tr>
              </tfoot>
            </table>
            <div className="add-button-div">
              <div className="add-button">
                <h2>+</h2>
              </div>
            </div>
          </div>
        ) : (
          <p>No subjects found in the JSON data.</p>
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