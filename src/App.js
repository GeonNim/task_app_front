import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Completed from './components/completed';
import Important from './components/important';
import Proceeding from './components/proceeding';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/completed" element={<Completed />} />
          <Route path="/proceeding" element={<Proceeding />} />
          <Route path="/important" element={<Important />} />
        </Routes>

        <ToastContainer
          position="bottom-center"
          autoClose={1000}
          theme="dark"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
