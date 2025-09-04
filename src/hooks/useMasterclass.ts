import axios from "axios";
import { useEffect, useState } from "react";
import type { Masterclass } from "../types";

export const useMasterclass = () => {
  const [masterclass, setMasterclass] = useState<Masterclass[]>([]);;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchMasterclass = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/users/masterclass/all-classes`);
    //   console.log("response.data.data", response.data.data);
      setMasterclass(response.data.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching masterclass data:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMasterclass();
  }, []); // Remove masterclass from dependency array to avoid infinite loop

  return { masterclass, loading, error, refetch: fetchMasterclass };
};