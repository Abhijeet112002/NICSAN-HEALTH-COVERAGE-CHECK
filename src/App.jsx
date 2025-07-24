// import { useState } from 'react';
// import Form from './components/Form';
// import ResultCard from './components/ResultCard';
// import nicsanLogo from './assets/nicsan-logo.png';
// import bgImage from './assets/bg.jpg';

// function App() {
//   const [result, setResult] = useState(null);

//   return (
//     <div
//       className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-4 pt-10"
//       style={{ backgroundImage: `url(${bgImage})` }}
//     >
//       <img
//         src={nicsanLogo}
//         alt="NICSAN Logo"
//         className="max-w-[160px] mx-auto mb-2 mt-4"
//       />
//       <h2 className="text-2xl font-bold text-[#004E98] mb-1">Coverage Check 🛡️</h2>
//       <h4 className="text-black mb-6">Welcome back ✌️</h4>

//       {result && <ResultCard result={result} />}

//       <Form setResult={setResult} />
//       <p className="text-black mb-6">© 2025 NICSAN. All Rights Reserved.</p>
//     </div>
//   );
// }

// export default App;



// App.jsx
import { useState } from 'react';
import Form from './components/Form';
import ResultCard from './components/ResultCard';
import PublicAPI from './components/PublicAPI';
import nicsanLogo from './assets/nicsan-logo.png';
import bgImage from './assets/bg.jpg';

function App() {
  const [result, setResult] = useState(null);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-4 pt-10"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="text-center mb-4">
        <img
          src={nicsanLogo}
          alt="NICSAN Logo"
          className="max-w-[160px] mx-auto mb-3"
        />
        <h1 className="text-2xl font-bold text-[#004E98] mb-1">Coverage Check 🛡️</h1>
        <p className="text-black font-semibold mb-4">Welcome back ✌️</p>
      </div>

      <Form setResult={setResult} />

      {result && <ResultCard result={result} />}

      {/* Show the API field here */}
      <PublicAPI />

      <footer className="text-sm text-black mt-6">
        © 2025 NICSAN. All Rights Reserved.
      </footer>
    </div>
  );
}

export default App;
