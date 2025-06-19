import { DollarSign } from "lucide-react";
import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href="/dashboard"
      className="flex items-center space-x-3 group transition-all duration-200 hover:scale-105"
    >
      <div className="relative">
        <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/25 group-hover:shadow-xl group-hover:shadow-teal-500/40 transition-all duration-200">
          <DollarSign className="h-5 w-5 text-white" />
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-900 shadow-sm"></div>
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-bold text-slate-100 group-hover:text-teal-400 transition-colors duration-200">
          MERN <span className="text-teal-400">INVOICE</span>
        </span>
        <span className="text-xs text-slate-500 -mt-1">Management System</span>
      </div>
    </Link>
  );
};

export default Logo;
