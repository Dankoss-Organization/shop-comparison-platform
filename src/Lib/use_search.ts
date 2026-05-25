import { useState, useEffect, useRef } from "react";
import { searchApi, type SearchProduct } from "@/Lib/api/search_api.client";

export function useSearch() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [results, setResults] = useState<SearchProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setSuggestions([]);
      setResults([]);
      return;
    }

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const [sugg, res] = await Promise.all([
          searchApi.suggestions(query),
          searchApi.search(query, 6),
        ]);
        setSuggestions(sugg);
        setResults(res.results);
      } catch {
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [query]);

  return { query, setQuery, suggestions, results, loading };
}