import {BrowserRouter,Routes,Route} from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import About from "./pages/About";
import Header1 from "./components/Header1";
import Page404 from "./pages/Page404";


function App() {
  return (
    <BrowserRouter>
      <Header1 />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Page404 />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
