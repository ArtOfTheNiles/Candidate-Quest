import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";

import Candidate from "../interfaces/Candidate.interface";
import "../styles/candidate.css";
import { saveCandidatesToLocalStorage } from "../api/IO";


const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate>({} as Candidate);
  const [candidateCache, setCandidateCache] = useState<Candidate[]>([] as Candidate[]);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([] as Candidate[]);
  const [firstLoad, setFirstLoad] = useState(true);

  //#region UseEffects()
  useEffect(() => {
    if(candidate && candidate.name) {
      document.title = "Candidate: " + candidate.name;
    }else{
      document.title = "Candidate Search";
    }
  }, [candidate]);

  useEffect(() => {
    fetchCandidate();
  }, []);

  useEffect(() => {
    saveCandidatesToLocalStorage(savedCandidates);
  }, [savedCandidates]);
  //#endregion

  const fetchCandidate = async () => {
    let data: Candidate = {} as Candidate;
    if(firstLoad){
      setFirstLoad(false);
      console.warn("First load!");
      data = await searchGithubUser("octocat");
      await cacheCandidates();
    }else if(candidateCache.length > 0){
      data = candidateCache.pop() as Candidate;
    }else{
      console.warn("Cache empty! Refreshing cache...");
      await cacheCandidates();
      data = await searchGithubUser("octocat"); //TODO Handle more gracefully, currently running through goes back to octocat every time
    }
    setCandidate(data);
  };

  const cacheCandidates = async () => {
    console.info("Caching candidates...");
    const data = await searchGithub();
    setCandidateCache(data);
  };

  const handleAccept = async () => {
    setSavedCandidates(prevSavedCandidates => {
      if(!prevSavedCandidates){
        console.warn("No saved candidates yet!");
        return [candidate];
      }else{
        const updatedCandidates = [...prevSavedCandidates, candidate];
        return updatedCandidates;
      }
    });
    fetchCandidate();
  };

  const handleReject = async () => {
    fetchCandidate();
  };

  return <div className="candidate-search-container">
    <h1 id="search-title">Search <em>Github User</em> Candidates</h1>

    <div className="search-module">
    <button className="reject" onClick={handleReject}>-</button>

    <section className="candidate-container">
      <img src={candidate.avatar_url ? candidate.avatar_url : "./github-mark-white.png"}
      alt={(candidate.login ? candidate.login : 'user') + ' avatar'} 
      />
      <ul className="candidate-details">
        <li className="username">Username:
          <a href={candidate.html_url ? candidate.html_url : "http://www.github.com/"}>
          {candidate.name ? candidate.name : (candidate.login ? candidate.login : '外国人')}</a>
        </li>
        <li className="location">Location:
          <p>{candidate.location ? candidate.location : 'Earth 🌎'}</p>
        </li>
        <li className="email">Email:
          <p>{candidate.email ? candidate.email : 'Not Public'}</p>
        </li>
        <li className="company">Company:
          <p>{candidate.company ? candidate.company : 'None (Freelancer)'}</p>
        </li>
        {candidate.bio ? (
        <li className="bio">Bio:
          <p>{candidate.bio}</p>
        </li>
        ) : candidate.blog? (
          <li className="blog">
          <a href={candidate.blog}>Blog</a>
        </li>
        ) : (null)
        }
      </ul>
    </section>

    <button className="accept" onClick={handleAccept} autoFocus>+</button>

    </div>
  </div>
};

export default CandidateSearch;
