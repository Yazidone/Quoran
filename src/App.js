import { BrowserRouter,Routes,Route } from "react-router-dom";
import './App.css';
import CreateQuran from './pages/CreateQuran';
import Sowar from './pages/Sowar';
import Header from "./Components/Header";

function App() {
  return (
    <>
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path ="/sowar" element={<CreateQuran/>}/>
        <Route path ="/" element={<Sowar/>}/>
        
      </Routes>
     
    </BrowserRouter>
    </>
  );
}

export default App;
