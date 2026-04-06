import { useEffect, useState } from "react";
import { supabaseServer } from "@/lib/supabaseServer";

export const useFetchData = (table) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabaseServer
      .from(table)
      .select("*")
      .then(({ data }) => {
        setData(data?.[0]); // single row
        setLoading(false);
      });
  }, [table]);

  return { data, loading };
};
