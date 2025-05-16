import React, { useState } from "react";

const AreaUnitConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromUnit, setFromUnit] = useState("ropani");
  const [toUnit, setToUnit] = useState("katha");
  const [convertedValue, setConvertedValue] = useState(null);

  // Conversion rates based on the provided data
  const conversionRates = {
    ropani: {
      aana: 16,
      paisa: 64,
      dam: 256,
      squareFeet: 5476,
      squareMeter: 508.74,
      kattha: 0.075,
      bigha: 0.01331,
    },
    aana: {
      ropani: 1 / 16,
      paisa: 4,
      dam: 16,
      squareFeet: 342.25,
      squareMeter: 31.8,
      kattha: 0.0046875,
      bigha: 0.000831875,
    },
    paisa: {
      ropani: 1 / 64,
      aana: 1 / 4,
      dam: 4,
      squareFeet: 85.56,
      squareMeter: 7.95,
      kattha: 0.001171875,
      bigha: 0.00020796875,
    },
    dam: {
      ropani: 1 / 256,
      aana: 1 / 16,
      paisa: 1 / 4,
      squareFeet: 21.39,
      squareMeter: 1.99,
      kattha: 0.00029296875,
      bigha: 0.0000519921875,
    },
    squareFeet: {
      ropani: 1 / 5476,
      aana: 1 / 342.25,
      paisa: 1 / 85.56,
      dam: 1 / 21.39,
      squareMeter: 0.0929,
      kattha: 1 / 3645,
      bigha: 1 / 72900,
    },
    squareMeter: {
      ropani: 1 / 508.74,
      aana: 1 / 31.8,
      paisa: 1 / 7.95,
      dam: 1 / 1.99,
      squareFeet: 10.764,
      kattha: 1 / 338.63,
      bigha: 1 / 6772.63,
    },
    kattha: {
      ropani: 13.31,
      aana: 212.96,
      paisa: 851.84,
      dam: 3407.36,
      squareFeet: 3645,
      squareMeter: 338.63,
      bigha: 0.05,
    },
    bigha: {
      ropani: 13.31,
      aana: 212.96,
      paisa: 851.84,
      dam: 3407.36,
      squareFeet: 72900,
      squareMeter: 6772.63,
      kattha: 20,
    },
  };

  // Handle conversion
  const handleConversion = () => {
    const rate = conversionRates[fromUnit][toUnit];
    setConvertedValue(amount * rate);
  };

  return (
    <div className="container mx-auto px-4 py-20 md:mt-36 mt-14">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Area Unit Converter</h1>

      {/* Converter Input Section */}
      <div className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-lg mb-12">
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            placeholder="Enter amount"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700">From Unit</label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
          >
            {Object.keys(conversionRates).map((unit) => (
              <option key={unit} value={unit}>
                {unit.charAt(0).toUpperCase() + unit.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700">To Unit</label>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
          >
            {Object.keys(conversionRates).map((unit) => (
              <option key={unit} value={unit}>
                {unit.charAt(0).toUpperCase() + unit.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={handleConversion}
            className="w-full py-3 md:py-4 px-8 rounded text-lg tracking-wide font-semibold text-white bg-blue-700 hover:bg-blue-600 focus:outline-none"
          >
            Convert
          </button>
        </div>

        {/* Result Display */}
        {convertedValue !== null && (
          <div className="mt-6 text-center">
            <h3 className="text-xl font-semibold text-gray-800">
              Converted Value: {convertedValue.toFixed(2)} {toUnit.charAt(0).toUpperCase() + toUnit.slice(1)}
            </h3>
          </div>
        )}
      </div>

      {/* Conversion Tables */}
      <div className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-lg mb-12">
        <h2 className="text-2xl font-semibold mb-4">Conversion Tables</h2>

        {/* Ropani System Table */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Ropani System</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Ropani</th>
                  <th className="px-4 py-2">Aana</th>
                  <th className="px-4 py-2">Paisa</th>
                  <th className="px-4 py-2">Dam</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 text-center">1</td>
                  <td className="px-4 py-2 text-center">16</td>
                  <td className="px-4 py-2 text-center">64</td>
                  <td className="px-4 py-2 text-center">256</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Bigha System Table */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Bigha System</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Bigha</th>
                  <th className="px-4 py-2">Kattha</th>
                  <th className="px-4 py-2">Dhur</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 text-center">1</td>
                  <td className="px-4 py-2 text-center">20</td>
                  <td className="px-4 py-2 text-center">400</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Feet/Meter Table */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Feet/Meter</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Sq. Feet</th>
                  <th className="px-4 py-2">Sq. Meter</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 text-center">5476</td>
                  <td className="px-4 py-2 text-center">508.74</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Unit Calculation Section */}
      <div className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Unit Calculation</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li className="mb-2">
            <strong>1 Bigha</strong> = 20 Kattha = 6772.63 m² = 72900 sq.ft. = 13.31 Ropani
          </li>
          <li className="mb-2">
            <strong>1 Kattha</strong> = 20 Dhur = 338.63 m² = 3645 sq.ft.
          </li>
          <li className="mb-2">
            <strong>1 Dhur</strong> = 16.93 m² = 182.25 sq.ft.
          </li>
          <li className="mb-2">
            <strong>1 Ropani</strong> = 16 Aana = 64 Paisa = 508.72 m² = 5476 sq.ft. = 256 Daam = 4 Ilka
          </li>
          <li className="mb-2">
            <strong>1 Aana</strong> = 4 Paisa = 31.80 m² = 342.25 sq.ft. = 16 Daam
          </li>
          <li className="mb-2">
            <strong>1 Paisa</strong> = 4 Daam = 7.95 m² = 85.56 sq.ft.
          </li>
          <li className="mb-2">
            <strong>1 Daam</strong> = 1.99 m² = 21.39 sq.ft.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AreaUnitConverter;