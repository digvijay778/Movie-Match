import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

/**
 * Layout component for MovieMatch app.
 * Wraps all pages with Navbar, optional Sidebar, and main content area.
 */
const Layout = ({ children, showSidebar = false }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 to-neutral-800">
      <div className="flex">
        {showSidebar && <Sidebar />}

        <div className="flex-1 flex flex-col">
          <Navbar />

          <main className="flex-1 overflow-y-auto px-2 sm:px-4 md:px-8 py-4">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
