export interface WorkItem {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  tags: string[];
  impact?: string[];
  featured?: boolean;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface Belief {
  title: string;
  description: string;
}