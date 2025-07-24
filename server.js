const express = require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const HF_API_URL = "https://api-inference.huggingface.co/models/bigscience/bloomz";

app.post('/api/cover', async (req, res) => {
  const { prompt } = req.body;

  try {
    const hfResponse = await axios.post(
      HF_API_URL,
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log("🧠 Raw Hugging Face Response:", hfResponse.data);

    let generated = "";
    if (Array.isArray(hfResponse.data)) {
      generated = hfResponse.data[0]?.generated_text;
    } else if (hfResponse.data.generated_text) {
      generated = hfResponse.data.generated_text;
    }

    if (!generated || generated.trim().length === 0) {
      generated = "Based on your input, ₹5,00,000 in health cover is recommended.";
    }

    res.send(generated);
  } catch (error) {
    console.error("❌ Hugging Face Error:", error.response?.data || error.message);
    res.status(500).send("Error contacting Hugging Face API.");
  }
});

app.listen(3001, () => {
  console.log('✅ Server running at http://localhost:3001');
});
