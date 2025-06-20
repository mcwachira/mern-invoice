// ProfileInfo.tsx - Enhanced Profile Component
"use client";
import useAuthUser from "@/hooks/useAuthUserHooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LogOut,
  Gauge,
  UserCircle,
  ChevronUp,
  MoreHorizontal,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { useState, useEffect } from "react";
import { useLogOutUserMutation } from "@/features/auth/authApiSlice";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface User {
  username: string;
  avatar?: string;
  firstName: string;
  lastName: string;
}

const ProfileInfo = ({
  user,
  expanded = true,
}: {
  user: User;
  expanded?: boolean;
}) => {
  const { isAdmin } = useAuthUser();
  const router = useRouter();
  const [logoutUser, { data, isSuccess }] = useLogOutUserMutation();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      router.push("/auth/login");
    } catch (err: any) {
      toast.error(err?.message || "Logout failed");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Logged out successfully");
    }
  }, [isSuccess, data]);

  const userInitials =
    user?.firstName && user?.lastName
      ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
      : user?.username?.[0]?.toUpperCase() || "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "w-full flex items-center rounded-xl hover:bg-slate-800/50 transition-all duration-200 group",
            expanded ? "space-x-3 p-2 justify-between" : "p-3 justify-center",
          )}
        >
          <div
            className={cn(
              "flex items-center min-w-0",
              expanded ? "space-x-3" : "justify-center",
            )}
          >
            {/* Avatar */}
            <Avatar className="h-10 w-10 ring-2 ring-teal-500/20 group-hover:ring-teal-500/40 transition-all duration-200 flex-shrink-0">
              <AvatarImage src={user?.avatar} alt={user?.username} />
              <AvatarFallback className="bg-gradient-to-br from-teal-500 to-emerald-600 text-white font-semibold text-sm">
                {userInitials}
              </AvatarFallback>
            </Avatar>

            {/* User Info */}
            {expanded && (
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-semibold text-slate-200 truncate">
                  {user?.firstName && user?.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : user?.username}
                </p>
                <div className="flex items-center space-x-2">
                  <span
                    className={cn(
                      "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
                      isAdmin
                        ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                        : "bg-teal-500/20 text-teal-300 border border-teal-500/30",
                    )}
                  >
                    {isAdmin ? "Admin" : "User"}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Dropdown Indicator */}
          <div className="flex-shrink-0">
            {expanded ? (
              <ChevronUp className="h-4 w-4 text-slate-500 group-hover:text-teal-400 transition-colors" />
            ) : (
              <MoreHorizontal className="h-4 w-4 text-slate-500 group-hover:text-teal-400 transition-colors" />
            )}
          </div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-64 p-2 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 shadow-2xl rounded-xl"
        align={expanded ? "end" : "start"}
        side={expanded ? "top" : "right"}
        sideOffset={expanded ? 8 : 12}
      >
        {/* Profile Header */}
        <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-600/30 mb-2">
          <Avatar className="h-12 w-12 ring-2 ring-teal-500/30 shadow-lg">
            <AvatarImage src={user?.avatar} alt={user?.username} />
            <AvatarFallback className="bg-gradient-to-br from-teal-500 to-emerald-600 text-white font-semibold">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-slate-100 truncate">
              {user?.firstName && user?.lastName
                ? `${user.firstName} ${user.lastName}`
                : user?.username}
            </p>
            <p className="text-sm text-slate-400 truncate">@{user?.username}</p>
            <span
              className={cn(
                "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mt-1",
                isAdmin
                  ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                  : "bg-teal-500/20 text-teal-300 border border-teal-500/30",
              )}
            >
              {isAdmin ? "Administrator" : "Standard User"}
            </span>
          </div>
        </div>

        <DropdownMenuSeparator className="my-2 bg-slate-700/50" />

        {/* Menu Items */}
        <DropdownMenuItem
          onClick={() => router.push("/profile")}
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800/50 hover:text-teal-400 text-slate-300 transition-colors cursor-pointer focus:bg-slate-800/50 focus:text-teal-400"
        >
          <UserCircle className="h-4 w-4" />
          <span className="font-medium">View Profile</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => router.push("/dashboard")}
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800/50 hover:text-teal-400 text-slate-300 transition-colors cursor-pointer focus:bg-slate-800/50 focus:text-teal-400"
        >
          <Gauge className="h-4 w-4" />
          <span className="font-medium">Dashboard</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-2 bg-slate-700/50" />

        <DropdownMenuItem
          onClick={handleLogout}
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-500/10 hover:text-red-400 text-red-400 transition-colors cursor-pointer focus:bg-red-500/10 focus:text-red-400"
        >
          <LogOut className="h-4 w-4" />
          <span className="font-medium">Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileInfo;
