import {BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import ModelSelectionPage from "./pages/models-page/ModelsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/models" element={<ModelSelectionPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
