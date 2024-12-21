import Header from "./Components/Header";
import Footer from "./Components/Footer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import AdminPage from "./Pages/AdminPage";
import UserPage from "./Pages/UserPage";
import ProtectedRoutes from "./Components/ProtectedRoutes";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header></Header>
        <main>
          <Routes>
            <Route path="/" element={<LoginPage></LoginPage>} />
            <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
            <Route path="/admin" element={<ProtectedRoutes role='admin' element={<AdminPage></AdminPage>}/>} /> 
            <Route path="/user" element={<ProtectedRoutes role='user' element={<AdminPage></AdminPage>}/>} />
            <Route path="*" element={<Navigate to='/' replace/>}/>
          </Routes>
        </main>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
