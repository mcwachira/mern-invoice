import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

const GoogleLogin = () => {
  const handleGoogleLogin = () => {
    // TODO: change this in production
    window.open("http://www.localhost:8080/api/v1/auth/google", "_self");
  };

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2 cursor-pointer"
      onClick={handleGoogleLogin}
    >
      <FcGoogle className="text-2xl" />
      <span>Continue with Google</span>
    </Button>
  );
};

export default GoogleLogin;
