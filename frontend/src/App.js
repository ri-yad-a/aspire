import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Applications from "./pages/Applications";
import Jobs from "./pages/Jobs";
import Interviews from "./pages/Interviews";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/signup",
    element: <SignUp/>,
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
