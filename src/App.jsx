import { useState } from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HomePage } from "./pages/HomePage";
const queryClient = new QueryClient();
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <HomePage />
      </QueryClientProvider>
    </div>
  );
}

export default App;
