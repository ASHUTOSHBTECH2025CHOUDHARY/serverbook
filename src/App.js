import logo from './logo.svg';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Hero from './components/hero';
// import Her from './components/Her';
import About from './components/About'
// import Thought from './components/Thought';
import Contact from './components/Contact';
import Front from './components/Front';
import Signin from './components/Signin';
import Sidebar from './components/Sidebar';
import Quiz from './components/dashcompo/Quiz';
import Login from './components/login';
import Dashboard from './components/Dashboard';
function App() {
  return (
    <div>
     <BrowserRouter>
    <Routes>
      <Route path="/" element={<Front/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/sign" element={<Signin/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/dashboard/quiz" element={<Quiz/>}/>

    
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
