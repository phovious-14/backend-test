import { beckettCardDataType, cgcCardDataType, psaCardDataType } from "@/lib/types";

export default function DataPoints({ data }: { data: psaCardDataType | cgcCardDataType | beckettCardDataType }) {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.entries(data).map(([key, value]) => (
        <div key={key}>
          <strong>{key}:</strong> {String(value)}
        </div>
      ))}
    </div>
  );
}
