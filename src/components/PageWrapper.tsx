import { ReactNode } from "react";



const PageWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <main className="bg-gradient-to-b from-sky-700 to-sky-900 h-screen flex flex-col items-center justify-center">
      {children}
    </main>
  );
}

export default PageWrapper;