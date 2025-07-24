import { useEffect, useState } from 'react';

const PublicAPI = () => {
  const [apiName, setApiName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://api.publicapis.org/entries');
        const data = await res.json();
        const firstApiName = data.entries[0].API;
        setApiName(firstApiName);

        await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/responses`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            Prefer: 'return=minimal'
          },
          body: JSON.stringify({ api_name: firstApiName })
        });
      } catch (err) {
        console.error('Error fetching or saving:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="text-center mt-6 text-white">
      <h2 className="text-xl font-bold">📡 Public API Fetched:</h2>
      <p className="mt-2 text-2xl">{apiName || 'Loading...'}</p>
    </div>
  );
};

export default PublicAPI;
