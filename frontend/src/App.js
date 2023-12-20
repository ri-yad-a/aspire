import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Applications from "./pages/Applications";
import Jobs from "./pages/Jobs";
import Interviews from "./pages/Interviews";
import AdminLogin from "./pages/AdminLogin";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/admin",
    element: <AdminLogin/>,
  },
  {
    path: "/signup",
    element: <SignUp/>,
  },
  {
    path: "/adminDashboard",
    element: <div>
      <AdminDashboard/>
      <Footer/>
    </div>,
  },
  {
    path: "/applications",
    element: <div>
      <Navbar/>
      <Applications/>
      <Footer/>
      </div>,
  },
  {
    path: "/jobs",
    element: <div>
    <Navbar/>
    <Jobs/>
    <Footer/>
    </div>,
  },
  {
    path: "/interviews",
    element: <div>
    <Navbar/>
    <Interviews/>
    <Footer/>
    </div>,
  },
  {
    path: "/profile",
    element: <div>
    <Navbar/>
    <Profile/>
    <Footer/>
    </div>,
  }
]);

function App() {
  return (
    <div className="App">
      <div className="container">
        <RouterProvider router={router}/>
      </div>
    </div>
  );
}

export default App;
