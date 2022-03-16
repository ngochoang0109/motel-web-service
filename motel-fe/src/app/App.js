import { Route, Routes } from "react-router-dom";
import Layout from "../components/user/Layout/Layout";
import RegisterPage from "./../page/RegisterPage/RegisterPage";
import LoginPage from "./../page/LoginPage/LoginPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout></Layout>}>

      </Route>
      <Route path="register" element={<RegisterPage />}>

      </Route>

      <Route path="login" element={<LoginPage />}>

      </Route><Route path="register" element={<RegisterPage />}>

      </Route>

      <Route path="login" element={<LoginPage />}>

      </Route>
    </Routes>

  );
}

export default App;