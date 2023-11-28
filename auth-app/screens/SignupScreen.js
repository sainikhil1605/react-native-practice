import { useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../utils/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { authenticate } = useContext(AuthContext);

  const signUpHandler = async ({ email, password }) => {
    setIsAuthenticating(true);
    const token = await createUser(email, password);
    authenticate(token);
    setIsAuthenticating(false);
  };
  if (isAuthenticating) return <LoadingOverlay message="Creating User ..." />;
  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignupScreen;
