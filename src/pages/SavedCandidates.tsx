import { useEffect, useState } from 'react';

import { saveCandidatesToLocalStorage, loadCandidatesFromLocalStorage } from '../api/IO';
import Candidate from '../interfaces/Candidate.interface';
import '../styles/candidateTable.css'

const SavedCandidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([] as Candidate[]);


  useEffect(() => {
    const loadedCandidates = loadCandidatesFromLocalStorage();
    setCandidates(loadedCandidates);
  }, []);

  useEffect(() => {
    saveCandidatesToLocalStorage(savedCandidates);
  }, [savedCandidates]);

  const handleReject = (index: number) => {
    // console.warn("Rejecting candidate at index: " + index);
    setCandidates((prevCandidates) => {
      const newCandidates = [...prevCandidates];
      newCandidates.splice(index, 1);
      return newCandidates;
    });
  };

  return (
    <>
      <h1>Your <em>Potential</em> Candidates</h1>
      <table>
        <thead>
          <tr>
            <th>Icon</th>
            <th>Name</th>
            <th>Profile</th> {/* github url */}
            <th>Location</th>
            <th>Company</th>
            <th>About</th> {/* Bio or Blog */}
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
        {candidates.map((candidate) => (
            <tr key={candidates.indexOf(candidate)}>
              <td className="icon">
                <img src={candidate.avatar_url ? candidate.avatar_url : "./github-mark-white.png" } 
                alt={(candidate.login ? candidate.login : 'user') + ' avatar'}
                />
              </td>
              <td className="name">
                {candidate.name ? candidate.name : (
                  candidate.login ? candidate.login : '👻 (none)'
                )}
              </td>
              <td className={`profile ${candidate.html_url ? "" : "missing-data"}`}>
                <a href={candidate.html_url ? candidate.html_url : "about:blank" } target="_blank" rel="noopener noreferrer">Profile</a>
              </td>
              <td className={`location ${candidate.location ? "" : "missing-data"}`}>
                {candidate.location ? candidate.location : '🌎 (none)'}
              </td>
              <td className={`company ${candidate.company ? "" : "missing-data"}`}>
                {candidate.company ? candidate.company : '🏢 (none)'}
              </td>
              <td className={`about ${candidate.bio || candidate.blog ? "" : "missing-data"}`}>
                {(candidate.bio || candidate.blog) ? (candidate.bio ? candidate.bio : candidate.blog) : '🚫 (none)'}
              </td>
              <td>
                <button className="reject" onClick={() => handleReject(candidates.indexOf(candidate))}>-</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default SavedCandidates;
