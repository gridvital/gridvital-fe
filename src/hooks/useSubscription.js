import { useState, useEffect } from "react";
import { fetchSubscription } from "../services/apis/dashboard.service";

const useSubscription = () => {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const today = new Date().toISOString().slice(0, 10);
    // const cachedDate = localStorage.getItem(CACHE_DATE_KEY);
    // const cachedData = localStorage.getItem(CACHE_DATA_KEY);

    // if (cachedDate === today && cachedData) {
    //   setSubscription(JSON.parse(cachedData));
    //   setLoading(false);
    //   return;
    // }

    (async () => {
      try {
        const res = await fetchSubscription();
        if (res?.success) {
          // localStorage.setItem(CACHE_DATE_KEY, today);
          // localStorage.setItem(CACHE_DATA_KEY, JSON.stringify(res.data));
          setSubscription(res.data);
        }
      } catch {
        // handle silently
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { subscription, loading };
};

export default useSubscription;
