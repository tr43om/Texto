// styles
import "./App.scss";

// react router
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

// components
import { Home } from "./pages/home/Home";
import { Signup } from "./pages/signup/Signup";
import { Login } from "./pages/login/Login";
import { useAuthContext } from "./hooks/useAuthContext";
import { Register } from "./pages/register/Register";
import { AnimatedRoutes } from "./components/AnimatedRoutes";

function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <BrowserRouter>
      {authIsReady && (
        <>
          <AnimatedRoutes user={user} />
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
