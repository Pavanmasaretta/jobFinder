import './App.css'
import{BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from "../src/pages/register.jsx"
import Login from "../src/pages/login.jsx"
import Create from "./pages/create";
import Jobs from "./pages/jobs";
import JobDetail from "./pages/jobDetail";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/create" element={<Create/>} />
          <Route path="/jobs" element={<Jobs/>} />
          <Route path="/jobs/:id" element={<JobDetail/>} />
          <Route path="/" element={<Jobs/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
