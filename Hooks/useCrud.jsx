import { useState, useEffect } from "react";
import { supabaseServer } from "@/lib/supabaseServer";

export const useCrud = (table) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabaseServer.from(table).select("*");

    if (!error) setData(data);
    setLoading(false);
  };

  const createItem = async (payload) => {
    const { error } = await supabaseServer.from(table).insert([payload]);
    if (error) throw error;
    await fetchData();
  };

  const deleteItem = async (id) => {
    const { error } = await supabaseServer.from(table).delete().eq("id", id);
    if (error) throw error;
    await fetchData();
  };

  const updateItem = async (id, payload) => {
    const { error } = await supabaseServer
      .from(table)
      .update(payload)
      .eq("id", id);

    if (error) throw error;
    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, createItem, deleteItem, updateItem };
};
