import { beckettCardDataType, cgcCardDataType, psaCardDataType } from "@/lib/types";

export default function DataPoints({ data }: { data: psaCardDataType | cgcCardDataType | beckettCardDataType }) {

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
