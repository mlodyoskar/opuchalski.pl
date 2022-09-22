export type PostType = {
  date?: string;
  description?: string;
  image?: string;
  slug: string;
  title: string;
  category: 'React' | 'Supabase' | 'CSS' | 'Praca';
  featured: boolean;
};
