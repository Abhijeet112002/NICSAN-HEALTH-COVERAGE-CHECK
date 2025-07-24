import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useRef } from 'react';

const ResultCard = ({ result }) => {
  const pdfRef = useRef();

  const exportPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('coverage-quote.pdf');
    });
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="mt-6 p-6 rounded-xl bg-gray-100 shadow-lg max-w-md text-center"
      ref={pdfRef}
    >
      <h2 className="text-2xl font-bold text-[#D7263D] mb-2">Recommended Health Cover 🩺</h2>
      <p className="text-xl mb-1">₹ {result.coverAmount.toLocaleString()}</p>
      <p className="text-md text-gray-700 mb-4">
        Monthly Premium: <strong>₹ {result.premium.toLocaleString()}</strong>
      </p>

      <div className="flex justify-center gap-2">
        <button className="bg-[#D7263D] text-white py-3 px-4 rounded-full font-semibold hover:bg-red-700 transition">
          WhatsApp Quote
        </button>
        <button
          onClick={exportPDF}
          className="bg-blue-600 text-white py-3 px-4 rounded-full font-semibold hover:bg-blue-800 transition"
        >
          Download PDF
        </button>
      </div>
    </motion.div>
  );
};

export default ResultCard;

