// FILE: src/types/leadershipReview.ts

export interface LRReview {
  reviewerName: string;
  affiliation?: string;  // NEW: Title / Affiliation e.g. "Economist", "MP Kiambu"
  location: string;
  rating: number;
  comment: string;
  date: string;
}

// Lightweight related issue — used for the "Also Read" sidebar card
export interface LRRelatedIssue {
  title: string;
  slug: { current: string };
  coverImage: {
    asset: {
      _id: string;
      url: string;
    };
  };
  featuredLeader: string;
  edition: string;
  summary: string;
}

export interface LeadershipReviewIssue {
  _id: string;
  title: string;
  slug: { current: string };
  issueNumber: number;
  volume: number;
  edition: string;
  publishedDate: string;
  coverImage: {
    asset: {
      _id: string;
      url: string;
    };
    hotspot?: object;
  };
  mastheadBackground?: {
    asset?: {
      _id: string;
      url: string;
    };
  };
  ogImage?: {
    asset?: {
      _id: string;
      url: string;
    };
  };
  pdfFile: {
    asset: {
      _id: string;
      url: string;
    };
  };
  // Accent colour chosen in Sanity for the intro card and pull quotes.
  // Values: 'blue' | 'red' | 'green'. Defaults to 'blue' if not set.
  introCardColor?: 'blue' | 'red' | 'green';
  // Full article written in Sanity Studio as Portable Text — the "Read Online" version.
  // Optional: if absent, only the PDF view is shown and no toggle appears.
  articleContent?: any[];
  // Optional issue recommended to readers in the sidebar "Also Read" card.
  relatedIssue?: LRRelatedIssue;
  // NEW: Custom prompt shown inside the response textarea — editable per issue in Sanity.
  // Falls back to a default string in the component if not set.
  responsePrompt?: string;
  featuredLeader: string;
  leaderTitle: string;
  county: string;
  constituency: string;
  summary: string;
  tags: string[];
  isFeatured: boolean;
  reviews: LRReview[];
}

// Lightweight version used in grids and the portfolio window
export interface LeadershipReviewIssueSummary {
  _id: string;
  title: string;
  slug: { current: string };
  issueNumber: number;
  volume: number;
  edition: string;
  publishedDate: string;
  coverImage: {
    asset: {
      _id: string;
      url: string;
    };
  };
  ogImage?: {
    asset?: {
      _id: string;
      url: string;
    };
  };
  featuredLeader: string;
  leaderTitle: string;
  county: string;
  summary: string;
  tags: string[];
  isFeatured: boolean;
}