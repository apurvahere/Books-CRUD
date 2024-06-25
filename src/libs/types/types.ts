export interface BookInterface {
  id: string;
  title: string;
  author: string;
  year: string;
  genres: string[];
}

export type TableData = Record<string, unknown>;
