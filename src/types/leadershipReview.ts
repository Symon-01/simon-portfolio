// FILE: src/types/leadershipReview.ts

export interface LRReview {
  reviewerName: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
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
  pdfFile: {
    asset: {
      _id: string;
      url: string;
    };
  };
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
  featuredLeader: string;
  leaderTitle: string;
  county: string;
  summary: string;
  tags: string[];
  isFeatured: boolean;
}