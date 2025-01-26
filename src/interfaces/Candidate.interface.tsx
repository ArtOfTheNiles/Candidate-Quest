interface Candidate {
  readonly login: string;
  readonly name?: string | null;
  readonly avatar_url?: string | null;
  readonly html_url?: string | null;
  readonly location?: string | null;
  readonly email?: string | null;
  readonly company?: string | null;
  readonly bio?: string | null;
  readonly blog?: string | null; // URL
}

export default Candidate;