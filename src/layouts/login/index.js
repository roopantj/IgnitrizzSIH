import VuiInput from "components/VuiInput";
import { Redirect } from "react-router-dom";
const Login = () => {
  const auth = localStorage.getItem("accessToken");
  if (auth) return <Redirect to="/" />;

  return (
    <div>
      <VuiInput type="text" />
    </div>
  );
};
export default Login;
