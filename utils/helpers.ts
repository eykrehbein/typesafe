import { useState, useEffect } from "react";
import { ArticleProps, ArticleObject } from "@/utils/types";

export const chunk = <T>(arr: T[], chunkSize = 1, cache = []) => {
  const tmp = [...arr];
  if (chunkSize <= 0) return cache;
  while (tmp.length) cache.push(tmp.splice(0, chunkSize));
  return cache;
};

export const useArticlesList = () => {
  const [posts, setPosts] = useState<ArticleObject>();

  useEffect(() => {
    const f = async () => {
      const res = await fetch("/articles/list.json");

      setPosts(await res.json());
    };

    f();
  }, []);

  return posts;
};

export const generateFriendlyString = (str: string) =>
  str.replace(/([^a-z0-9]+)/gi, "-").toLowerCase();
