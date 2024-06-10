import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './Components/DashBoard';
import Details from './Components/Details';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path='/details' element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
