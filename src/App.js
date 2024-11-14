import { BrowserRouter, Routes, Route,  } from 'react-router-dom';
import Home from './Components/Pages/Home';
import Contato from './Components/Pages/contato';
import Empresa from './Components/Pages/empresa';
import NewProject from './Components/Pages/NewProject';
import Projects from './Components/Pages/Projects';
import Container from './Components/Layout/Container';
import NavBar from './Components/Layout/NavBar';
import Project from './Components/Projects/project';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Container customClass="minHeight">
          <Routes>
          <Route  path="/Projects" element={<Projects />} />
            <Route  path="/" element={<Home />} />
            <Route  path="/contato" element={<Contato />} />
            <Route  path="/empresa" element={<Empresa />} />
            <Route  path="/newProject" element={<NewProject />} />
            <Route  path="/project/:id" element={<Project />} />

          </Routes>
        </Container>
      
      </div>
    </BrowserRouter>
  );
}

export default App;
