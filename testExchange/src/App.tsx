import { Routes, Route } from "react-router-dom";
import ExchangePage from "./pages/exchangePage/ExchangePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ExchangePage />}></Route>
    </Routes>
  );
}

export default App;
