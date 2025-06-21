import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

const GoogleLogin = () => {
  const handleGoogleLogin = () => {
    // TODO: update this URL in production
    window.open("http://www.localhost:8080/api/v1/auth/google", "_self");
  };

  return (
    <Button
      variant="outline"
      onClick={handleGoogleLogin}
      className="w-full border-2 border-slate-600 hover:border-teal-500 hover:bg-slate-700/50 py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] text-gray-300 hover:text-white bg-slate-800/50"
    >
      <FcGoogle className="w-5 h-5 mr-3" />
      <span className="font-medium">Continue with Google</span>
    </Button>
  );
};

export default GoogleLogin;
