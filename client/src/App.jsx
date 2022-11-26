import {BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import ModelSelectionPage from "./pages/models-page/ModelsPage";
import HandClassificationPage from "./pages/hand-classification-page/HandClassificationPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/models" element={<ModelSelectionPage />} />
        <Route path="/hand-classification/*" element={<HandClassificationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
