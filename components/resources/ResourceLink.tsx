import { ExternalLink, BookOpen, Video, FileText, Wrench, Code } from "lucide-react";
import type { Resource } from "@/data/careers";

const typeIcons = {
  course: BookOpen,
  video: Video,
  article: FileText,
  tool: Wrench,
  book: BookOpen,
  practice: Code,
};

export default function ResourceLink({
  resource,
}: {
  resource: Resource;
}) {
  const Icon = typeIcons[resource.type] || BookOpen;

  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group"
    >
      <div className="flex items-start gap-4">
        <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon className="h-5 w-5 text-blue-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
              {resource.title}
            </h3>
            <ExternalLink className="h-3 w-3 text-gray-400 flex-shrink-0" />
          </div>
          <p className="text-sm text-gray-500 mt-1">{resource.platform}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded capitalize">
              {resource.type}
            </span>
            {resource.free && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                Free
              </span>
            )}
          </div>
        </div>
      </div>
    </a>
  );
}
