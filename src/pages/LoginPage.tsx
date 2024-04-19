import LoginForm from "../components/auth/LoginForm";
import { Link } from "react-router-dom";
const LoginPage: React.FC = () => {
  return (
    <div>
      <LoginForm />
      <Link to="/register" />
    </div>
  );
};

export default LoginPage;
