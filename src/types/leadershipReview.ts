// FILE: src/types/leadershipReview.ts

// ── Reply type ────────────────────────────────────────────────────────────────
export interface LRReply {
  _key: string;
  text: string;
  date: string;
  authorName?: string;
  affiliation?: string;
}

// ── Review type ───────────────────────────────────────────────────────────────
export interface LRReview {
  _key?: string;
  reviewerName: string;
  affiliation?: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  replies?: LRReply[];
}

// ── Related issue (for "Also Read" sidebar card) ──────────────────────────────
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

// ── Full issue (single issue detail page) ────────────────────────────────────
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
  // Colour for the intro paragraph highlight card + all drop caps.
  // Options: 'blue' | 'red' | 'green'. Set in Sanity Studio.
  introCardColor?: 'blue' | 'red' | 'green';
  // Colour for all blockquote / pull-quote cards in this issue.
  // Set INDEPENDENTLY from introCardColor — e.g. blue intro + green quotes.
  quoteColor?: 'blue' | 'red' | 'green';
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

// ── Lightweight summary (grids, portfolio window) ─────────────────────────────
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