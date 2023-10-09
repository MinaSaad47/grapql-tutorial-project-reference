import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import Project from "./Pages/Project";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:id" element={<Project />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
