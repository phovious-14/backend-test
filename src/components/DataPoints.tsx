"use client"

import { beckettCardDataType, cgcCardDataType, psaCardDataType } from "@/lib/types"

export default function DataPoints({data}: {data : psaCardDataType | cgcCardDataType | beckettCardDataType | null}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(data).map(([key, value]) => (
              <div key={key} className="bg-white p-4 rounded-lg shadow">
                <span className="font-semibold text-gray-700">{key}:</span>{' '}
                <span className="text-gray-900">{String(value)}</span>
              </div>
            ))}
          </div>
    )
}