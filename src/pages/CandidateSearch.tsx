import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";

import octocat  from "../../notes/octocat.json";
import Candidate from "../interfaces/Candidate.interface";
import "../styles/candidate.css";

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate>({} as Candidate);
  useEffect(() => {
    fetchCandidate();
    if(candidate !== null || candidate !== undefined) {
      document.title = "Candidate: " + candidate.name;
    }else{
      document.title = "Candidate Search";
    }
  }, []);

  // const fetchCandidate = async () => {
  //   const data = await searchGithubUser('octocat');
  //   setCandidate(data);
  // }; // Grabs Octocat user data from Github API
  // Use this on first page load then go to new candidate on accept/reject

  const fetchCandidate = async () => {
    const data: Candidate = octocat;
    setCandidate(data);
    // console.log("Candidate currently looks like: "+JSON.stringify(data, null, 2));
  }; 


  const handleAccept = async () => {
    // TODO Also add to saved list
    fetchCandidate();
  };

  const handleReject = async () => {
    fetchCandidate();
  };

  return <div className="candidate-search-container">
    <h1 id="search-title">Search <em>Github User</em> Candidates</h1>
    <section className="candidate-container">
      <img src={candidate.avatar_url ? candidate.avatar_url : "../../public/github-mark-white.png"} alt={candidate.login + ' avatar'} />
      <ul className="candidate-details">
        <li className="username">Username:
          <a href={candidate.html_url ? candidate.html_url : "http://www.github.com/"}>
          {candidate.name}</a>
        </li>
        <li className="location">Location:
          <p>{candidate.location}</p>
        </li>
        <li className="email">Email:
          <p>{candidate.email}</p>
        </li>
        <li className="company">Company:
          <p>{candidate.company}</p>
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
      <button className="reject" onClick={handleReject}>-</button>
      <button className="accept" onClick={handleAccept} autoFocus>+</button>
  </div>
};

export default CandidateSearch;
