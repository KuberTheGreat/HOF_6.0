import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from "./components/Sidebar";
// import Chatbot from "./pages/Chatbot";
import GrievanceForm from "./pages/GrievanceForm";

function App() {
    return (
        <div>
            <Home/>
        </div>
    );
}
export default App;
