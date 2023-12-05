import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import SignaturePage from './components/SignaturePage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-pdf/:pdfUrl" element={<SignaturePage />} />
      </Routes>
    </Router>
  );
}

export default App;
