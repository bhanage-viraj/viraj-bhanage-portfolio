export type ProjectMedia =
  | { type: "video"; src: string; poster?: string; previewSrc?: string }
  | { type: "image"; src: string; alt: string }
  | { type: "placeholder"; intended: "video" | "image" };

export type NarrativeSection = {
  heading: string;
  body: string;
};

export type ProjectFact = {
  label: string;
  value: string;
};

export type ProjectExperiment = {
  setup: string;
  recall: string;
  fpr: string;
  field: string;
};

export type ProjectNumbers = {
  heading: string;
  facts: ProjectFact[];
  experiments: ProjectExperiment[];
  takeaway: string;
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectLogo = {
  src: string;
  alt: string;
  /** Square app icon rather than a wide wordmark. */
  icon?: boolean;
};

export type Project = {
  slug: string;
  caseId: string;
  title: string;
  category?: string;
  cardSubheading: string;
  cardTeaser: string;
  logo?: ProjectLogo;
  tech: string[];
  media: ProjectMedia;
  images: ProjectMedia[];
  narrative: NarrativeSection[];
  numbers?: ProjectNumbers;
  links: ProjectLink[];
  openSource?: boolean;
};

export type PressItem = {
  outlet: string;
  subheading: string;
  href: string;
  date: string;
  excerptTodo?: boolean;
};

export type ExperienceItem = {
  org: string;
  title: string;
  dates: string;
  body: string;
  titleTodo?: boolean;
};

export type KaggleCategory = {
  name: "Datasets" | "Notebooks";
  tier: string;
  gold: number;
  silver: number;
  bronze: number;
  rank: number;
  of: number;
  highest: number;
};

export type KaggleStats = {
  live: boolean;
  label: string;
  profileUrl: string;
  datasets: KaggleCategory;
  notebooks: KaggleCategory;
  asOf?: string;
  fetchedAt?: string;
};
