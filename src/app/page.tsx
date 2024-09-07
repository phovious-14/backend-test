"use client"

import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import { beckettCardDataType, cgcCardDataType, psaCardDataType } from "@/lib/types";

export default function Home() {
  const [data, setData] = useState<psaCardDataType | cgcCardDataType | beckettCardDataType | null>(null);
  const [gradingType, setGradingType] = useState<string>("");
  const [serialNumber, setSerialNumber] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = () => {
    if (!serialNumber || !gradingType) {
      setError("Please enter a serial number and select a grading type.");
      return;
    }
    setError(null);
    setIsLoading(true);
    axios
      .get(`/api/${gradingType}/${serialNumber}`)
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setData(null);
        setError("An error occurred while fetching data. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSerialNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setSerialNumber(value);
      setError(null);
    } else {
      setError("Please enter numbers only for the serial number.");
    }
  };

  const handleGradingType = (e: ChangeEvent<HTMLSelectElement>) => {
    setGradingType(e.target.value);
    setError(null);
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Card Grading Search</h1>
      
    {/* input of serial number and grading type */}

      <div className="mb-6 max-w-md mx-auto">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            inputMode="numeric"
            value={serialNumber}
            onChange={handleSerialNumber}
            placeholder="Enter serial number (numbers only)"
            className="flex-grow px-4 py-2 rounded-md text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select 
            value={gradingType} 
            onChange={handleGradingType}
            className="px-4 py-2 rounded-md border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select type</option>
            <option value="BGS">BGS</option>
            <option value="PSA">PSA</option>
            <option value="CGC">CGC</option>
          </select>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button
          onClick={handleSearch}
          disabled={isLoading || !serialNumber || !gradingType}
          className="w-full mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {/* load and display data if data is not empty */}

      {isLoading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : data ? (
        Object.keys(data).length === 0 ? (
          <div className="text-center text-red-500 font-semibold">No data found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(data).map(([key, value]) => (
              <div key={key} className="bg-white p-4 rounded-lg shadow">
                <span className="font-semibold text-gray-700">{key}:</span>{' '}
                <span className="text-gray-900">{String(value)}</span>
              </div>
            ))}
          </div>
        )
      ) : null}
    </div>
  );
}