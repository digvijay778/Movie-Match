import { LoaderIcon, Film } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";

const PageLoader = () => {
  const { theme } = useThemeStore();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center" data-theme={theme}>
      <LoaderIcon className="animate-spin size-10 text-yellow-500 mb-4" />
      <div className="flex items-center gap-2 text-lg font-mono text-yellow-500">
        <Film className="size-6" />
        Loading MovieMatch...
      </div>
    </div>
  );
};
export default PageLoader;
