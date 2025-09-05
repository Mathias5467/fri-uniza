import React, { useState } from 'react';
import editLogo from './assets/edit.png';
import plus from './assets/plus.png';
function SubjectTable({ subjects, semester, title }) {
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortedSubjects, setSortedSubjects] = useState(subjects);
  const [alphaOrderSymbol, setAlphaOrderSymbol] = useState('↓');
  const [numOrderSymbol, setNumOrderSymbol] = useState('↓');

  // Update sorted subjects when props change
  React.useEffect(() => {
    setSortedSubjects(subjects);
  }, [subjects]);

  const sortAlpha = () => {
    let orderedSubjects;
    if (sortOrder === 'asc') {
      orderedSubjects = [...sortedSubjects].sort((a, b) => b.Predmet.localeCompare(a.Predmet));
      setSortOrder('desc');
      setAlphaOrderSymbol("↑");
    } else {
      orderedSubjects = [...sortedSubjects].sort((a, b) => a.Predmet.localeCompare(b.Predmet));
      setSortOrder('asc');
      setAlphaOrderSymbol("↓");
    }
    setSortedSubjects(orderedSubjects);
  };

  const sortNumber = () => {
    let orderedSubjects;
    if (sortOrder === 'asc') {
      orderedSubjects = [...sortedSubjects].sort((a, b) => b.Kredity - a.Kredity);
      setSortOrder('desc');
      setNumOrderSymbol("↑");
    } else {
      orderedSubjects = [...sortedSubjects].sort((a, b) => a.Kredity - b.Kredity);
      setSortOrder('asc');
      setNumOrderSymbol("↓");
    }
    setSortedSubjects(orderedSubjects);
  };

  // Calculate total credits
  const totalKredity = sortedSubjects && sortedSubjects.length > 0 
    ? sortedSubjects.reduce((sum, subject) => sum + subject.Kredity, 0) 
    : 0;

  if (!subjects || subjects.length === 0) {
    return (
      <div className="no-subjects">
        <p>Žiadne predmety pre {semester} semester.</p>
      </div>
    );
  }

  return (
    <div className="subject-table-container">
      <style jsx>{`
        .subject-table-container {
          width: 100%;
          margin-bottom: 2rem;
        }

        .semester-title {
          font-size: 1.5rem;
          text-align: center;
          margin-bottom: 1rem;
          color: #ba8b1c;
          font-weight: 600;
        }

        .subject-table {
          background-color: #181818;
          box-shadow: 0px 0px 10px #ffffff30;
          width: 70%;
          margin: 0 auto;
          transition: 0.3s;
          border-collapse: collapse;
          box-sizing: border-box;
        }

        .subject-table tr {
          border-bottom: 1px solid #ffffff8a;
        }

        .subject-table tfoot > tr {
          border-bottom: none;
        }

        .subject-table tr:hover {
          background-color: #ffffff20;
        }

        .subject-table th {
          background-color: #ba8b1c;
          white-space: nowrap;
          color: #ffffffcb;
          padding: 0.5rem 1rem;
          text-align: center;
        }

        .subject-table th:hover {
          cursor: pointer;
        }

        .subject-table td {
          padding: 0.5rem 1rem;
          text-align: center;
          color: #ffffff;
        }

        .edit-icon {
          width: 1rem;
        }

        .notes-cell {
          width: 200px;
          max-width: 200px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .no-subjects {
          text-align: center;
          padding: 2rem;
          color: #ffffff8a;
          font-style: italic;
        }

        .sortable-header {
          cursor: pointer;
          user-select: none;
          transition: background-color 0.3s;
        }

        @media (max-width: 768px) {
          .subject-table {
            width: 85%;
          }
        }
      `}</style>

      <h3 className="semester-title">{title || `${semester} semester`}</h3>
      
      <table className="subject-table">
        <thead>
          <tr>
            <th onClick={sortAlpha} className="sortable-header">
              Predmet {alphaOrderSymbol}
            </th>
            <th>Skratka</th>
            <th>Typ</th>
            <th onClick={sortNumber} className="sortable-header">
              Kredity {numOrderSymbol}
            </th>
            <th>Poznámky</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sortedSubjects.map((subject, index) => (
            <tr key={`${subject.Skratka}-${index}`}>
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
          <tr>
            <td colspan={5}></td>
            <td>
              <div className="add-button">
                <img alt="plus" src={plus}></img>
              </div>
            </td>
          </tr>
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
    </div>
  );
}

export default SubjectTable;