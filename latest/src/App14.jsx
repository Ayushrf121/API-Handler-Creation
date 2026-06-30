import Navbar2 from "../components/Navbar2";
import {Routes,Route} from 'react-router-dom';
import Upload from './pages/Upload';
import Home from './pages/Home';
import Signup2 from './pages/Signup2';
import Login2 from './pages/Login2';
import Profile2 from './pages/Profile2';
import Loader from "../components/Loader";
export default function App14() {
  return (
    <div>
      <Navbar2/>
      <Loader/>
        <Routes>
            <Route path="/upload" element={<Upload/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/profile" element={<Profile2/>}/>
            <Route path="/login" element={<Login2/>}/>
            <Route path="/signup" element={<Signup2/>}/>
        </Routes>
    </div>
  )
}
