"use client";
import { Menu, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { isExpired } from "react-jwt";
import { useEffect, useState } from "react";
import { logOut } from "@/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Logo from "./Logo";
import ProfileInfo from "./ProfileInfo";
import MenuList from "./MenuList";

const AuthNav = () => {
  const { user, googleToken } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleDrawerToggle = () => setOpen((prev) => !prev);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (googleToken && isExpired(googleToken)) {
      dispatch(logOut());
      router.push("/login");
      toast.warning("Your session has expired, login again");
    }
  }, [googleToken]);

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen bg-slate-900/95 backdrop-blur-xl border-r border-slate-700/50 shadow-2xl transition-all duration-300 ease-in-out",
          open ? "w-64" : "w-16",
          isMobile && !open && "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-700/50 min-h-[73px]">
            <div
              className={cn(
                "transition-opacity duration-200",
                open ? "opacity-100" : "opacity-0",
              )}
            >
              <Logo />
            </div>

            {/* Fixed Toggle Button Position */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDrawerToggle}
              className={cn(
                "h-8 w-8 p-0 hover:bg-teal-500/10 hover:text-teal-400 text-slate-400 transition-colors flex-shrink-0",
                !open && "mx-auto",
              )}
            >
              {open ? (
                <ChevronLeft className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 py-4 px-2 overflow-y-auto">
            <MenuList expanded={open} />
          </div>

          {/* Profile Section - Fixed Centering */}
          <div className="border-t border-slate-700/50 p-4 mt-auto">
            <div className={cn(!open && "flex justify-center")}>
              <ProfileInfo user={user} expanded={open} />
            </div>
          </div>
        </div>
      </aside>

      {/* Top Navbar - Fixed */}
      <header
        className={cn(
          "fixed top-0 right-0 z-30 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 shadow-lg transition-all duration-300 ease-in-out",
          open && !isMobile ? "left-64" : "left-16",
          isMobile && "left-0",
        )}
      >
        <div className="flex items-center justify-between px-4 py-3 h-[73px]">
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button - Better Positioning */}
            {isMobile && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDrawerToggle}
                className="h-10 w-10 p-0 hover:bg-teal-500/10 hover:text-teal-400 text-slate-300 transition-colors md:hidden rounded-lg"
              >
                {open ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            )}

            {/* Mobile Logo */}
            {isMobile && (
              <div className="md:hidden">
                <Logo />
              </div>
            )}
          </div>

          {/* Top Right Section */}
          <div className="flex items-center space-x-4">
            {/* Welcome Message */}
            <div className="hidden sm:block">
              <p className="text-sm text-slate-400">
                Welcome back,{" "}
                <span className="font-semibold text-teal-400">
                  {user?.firstName || user?.username}
                </span>
              </p>
            </div>

            {/* Mobile Profile */}
            <div className="sm:hidden">
              <ProfileInfo user={user} expanded={false} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Wrapper - Fixed Spacing */}
      <div
        className={cn(
          "transition-all duration-300 ease-in-out pt-[73px]", // Fixed header height
          open && !isMobile ? "ml-64" : "ml-16",
          isMobile && "ml-0",
        )}
      >
        {/* Content will be rendered here by Next.js pages */}
      </div>
    </>
  );
};

export default AuthNav;
