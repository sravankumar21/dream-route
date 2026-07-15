import { Clock } from "lucide-react";

export default function DayInLife({ content }: { content: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-blue-600" />
        <h2 className="text-xl font-bold text-gray-900">A Day in the Life</h2>
      </div>
      <p className="text-gray-700 leading-relaxed">{content}</p>
    </div>
  );
}
