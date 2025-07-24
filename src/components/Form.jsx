import { useState } from 'react';

function Form({ setResult }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    city: '',
    income: '',
    dependents: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const prompt = `Suggest an ideal health cover amount in INR for the following user:\n\nName: ${formData.name}\nAge: ${formData.age}\nCity: ${formData.city}\nAnnual Income: ₹${formData.income}\nNumber of Dependents: ${formData.dependents}`;

    try {
      const response = await fetch("http://localhost:3001/api/cover", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const reply = await response.text();
      console.log("🧠 HF Reply:", reply);

      const match = reply.match(/₹\s?([\d,]+)/);
      let coverAmount = 500000;

      if (match && match[1]) {
        coverAmount = parseInt(match[1].replace(/,/g, ''));
      } else {
        const numMatch = reply.match(/(\d{5,7})/);
        if (numMatch) {
          coverAmount = parseInt(numMatch[1]);
        }
      }

      const premium = Math.round(coverAmount * 0.009);

      setResult({
        name: formData.name,
        coverAmount,
        premium,
      });

    } catch (err) {
      console.error(err);
      alert('❌ Failed to fetch recommendation from your server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-form">
      <div>
        <label className="block text-white mb-1" htmlFor="name">Full Name</label>
        <input
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          type="text"
          className="glass-input w-full"
          required
        />
      </div>

      <div>
        <label className="block text-white mb-1" htmlFor="age">Age</label>
        <input
          name="age"
          id="age"
          value={formData.age}
          onChange={handleChange}
          type="number"
          className="glass-input w-full"
          required
        />
      </div>

      <div>
        <label className="block text-white mb-1" htmlFor="city">City</label>
        <input
          name="city"
          id="city"
          value={formData.city}
          onChange={handleChange}
          type="text"
          className="glass-input w-full"
          required
        />
      </div>

      <div>
        <label className="block text-white mb-1" htmlFor="income">Annual Income (₹)</label>
        <input
          name="income"
          id="income"
          value={formData.income}
          onChange={handleChange}
          type="number"
          className="glass-input w-full"
          required
        />
      </div>

      <div>
        <label className="block text-white mb-1" htmlFor="dependents">Number of Dependents</label>
        <input
          name="dependents"
          id="dependents"
          value={formData.dependents}
          onChange={handleChange}
          type="number"
          className="glass-input w-full"
          required
        />
      </div>

      <button
        type="submit"
        className="glass-button mt-2"
        disabled={loading}
      >
        {loading ? 'Checking...' : 'Check Coverage'}
      </button>
    </form>
  );
}

export default Form;


