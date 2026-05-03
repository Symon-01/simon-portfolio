// FILE: src/types/leadershipReview.ts

export interface LRReview {
  reviewerName: string;
  affiliation?: string;  // Title / Affiliation e.g. "Economist", "MP Kiambu"
  location: string;
  rating: number;
  comment: string;
  date: string;
}

// Lightweight related issue — used for the "Also Read" sidebar card.
// Includes all fields needed to match the AllIssuesGrid card design exactly.
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
  leaderTitle?: string;
  edition: string;
  summary: string;
  volume?: number;
  issueNumber?: number;
  publishedDate?: string;
  tags?: string[];
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
  introCardColor?: 'blue' | 'red' | 'green';
  articleContent?: any[];
  relatedIssue?: LRRelatedIssue;
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