import Login from './Components/LogIn/Login';
import SignUp from './Components/SignUp/SignUp';
import Home from './Components/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PasswordReset from './Components/PasswordReset/PasswordReset';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/forgotpassword" element={<PasswordReset/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
