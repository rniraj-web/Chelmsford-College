import newsData from "@/data/news.json";

export interface NewsItem {
  id: number;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
}

const allNews = newsData.news as NewsItem[];

export function getNews(): NewsItem[] {
  return [...allNews].sort((a, b) => b.date.localeCompare(a.date));
}

export function formatNewsDate(date: string): string {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
