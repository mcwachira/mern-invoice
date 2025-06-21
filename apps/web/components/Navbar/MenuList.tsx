"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserCog, BarChart, FileText, Users, ShieldCheck } from "lucide-react";
import useAuthUser from "@/hooks/useAuthUserHooks";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    label: "Manage Profile",
    icon: <UserCog className="h-5 w-5" />,
    path: "/profile",
  },
  {
    label: "Dashboard",
    icon: <BarChart className="h-5 w-5" />,
    path: "/dashboard",
  },
  {
    label: "Documents",
    icon: <FileText className="h-5 w-5" />,
    path: "/documents",
  },
  {
    label: "Customers",
    icon: <Users className="h-5 w-5" />,
    path: "/customers",
  },
];

const MenuList = ({ expanded = false }: { expanded?: boolean }) => {
  const pathname = usePathname();
  const { isAdmin } = useAuthUser();

  const allMenuItems = [
    ...menuItems,
    ...(isAdmin
      ? [
          {
            label: "Admin Panel",
            icon: <ShieldCheck className="h-5 w-5" />,
            path: "/users",
          },
        ]
      : []),
  ];

  return (
    <nav className="space-y-2">
      {allMenuItems.map((item) => {
        const isActive = pathname === item.path;

        return (
          <Link
            key={item.path}
            href={item.path}
            className={cn(
              "relative w-full flex items-center rounded-xl text-left transition-all duration-200 group",
              expanded ? "space-x-3 px-3 py-2.5" : "justify-center p-2.5",
              isActive
                ? "bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-lg shadow-teal-500/25"
                : "text-slate-400 hover:text-teal-400 hover:bg-slate-800/50",
            )}
          >
            {/* Active indicator */}
            {isActive && expanded && (
              <div className="absolute left-0 w-1 h-6 bg-white rounded-r-full opacity-80" />
            )}

            {/* Icon */}
            <div
              className={cn(
                "flex-shrink-0 transition-transform duration-200",
                isActive
                  ? "text-white"
                  : "group-hover:scale-110 group-hover:text-teal-400",
                !expanded && "mx-auto",
              )}
            >
              {item.icon}
            </div>

            {/* Label */}
            {expanded && (
              <span
                className={cn(
                  "font-medium transition-all duration-200 truncate",
                  isActive
                    ? "text-white"
                    : "text-slate-300 group-hover:text-teal-400",
                )}
              >
                {item.label}
              </span>
            )}

            {/* Tooltip for collapsed state */}
            {!expanded && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-lg">
                {item.label}
              </div>
            )}

            {/* Hover background effect */}
            {!isActive && (
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-500/0 to-emerald-500/0 group-hover:from-teal-500/10 group-hover:to-emerald-500/10 transition-all duration-200" />
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default MenuList;
