import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        // <Router>
        //   <div className="min-h-screen bg-white">
        //     <Navbar />
        //     <Routes>
        //       <Route path="/" element={<Home />} />
        //     </Routes>
        //   </div>
        // </Router>
        <Home/>
      );
}
export default App;
