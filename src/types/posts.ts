export interface PostType {
  id: number;
  title: string;
  content: string;
  image: string | null;
  authorId: number;
  createdAt: string;
  authorName: string;
  likesCount: number;
}