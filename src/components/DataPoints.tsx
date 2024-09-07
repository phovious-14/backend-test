import { beckettCardDataType, cgcCardDataType, psaCardDataType } from "@/lib/types";

export default function DataPoints({ data }: { data: psaCardDataType | cgcCardDataType | beckettCardDataType | null }) {
  if (!data) {
    return null;  // Handle case where data is null
  }

  return (
    <div>
      {Object.entries(data).map(([key, value]) => (
        <div key={key}>
          <strong>{key}:</strong> {String(value)}
        </div>
      ))}
    </div>
  );
}
