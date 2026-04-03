import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Authentication/Register';
import Login from './pages/Authentication/Login';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route untuk /register */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Contoh: default redirect ke /register */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;