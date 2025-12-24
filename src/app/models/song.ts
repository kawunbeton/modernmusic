export interface Song {
  id: number;
  title: string;
  artist: string;
  genre: string;
  tags: string[];
  isCover: boolean;
  imageUrl: string;
  sourceUrl: string;
  description?: string;
}