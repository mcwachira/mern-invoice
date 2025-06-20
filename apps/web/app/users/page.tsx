"use client";

import { useGetAllUsersQuery } from "@/features/users/usersApiSlice";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Eye,
  Trash2,
  CheckCircle,
  XCircle,
  Calendar,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface User {
  id: string;
  username: string;
  email: string;
  provider: string;
  active: boolean;
  isEmailVerified: boolean;
  roles: string[];
  createdAt: string;
}

export default function UserListPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const { data, isLoading, isSuccess, isError, error } = useGetAllUsersQuery(
    "allUsersList",
    {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    },
  );

  useEffect(() => {
    if (isError) toast.error(error?.data?.message || "An error occurred");
  }, [isError, error]);

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "user":
        return "bg-teal-500/20 text-teal-400 border-teal-500/30";
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case "google":
        return "🌐";
      case "github":
        return "💻";
      case "email":
        return "📧";
      default:
        return "👤";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const columns: ColumnDef<User>[] = useMemo(
    () => [
      {
        accessorKey: "username",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="text-slate-300 hover:text-white p-0 h-auto font-medium"
            >
              User
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 flex items-center justify-center text-white font-semibold">
              {row.original.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="text-white font-medium">
                {row.original.username}
              </div>
              <div className="text-slate-400 text-sm">{row.original.email}</div>
            </div>
          </div>
        ),
        filterFn: (row, id, value) => {
          const username = row.original.username.toLowerCase();
          const email = row.original.email.toLowerCase();
          const searchValue = value.toLowerCase();
          return username.includes(searchValue) || email.includes(searchValue);
        },
      },
      {
        accessorKey: "provider",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="text-slate-300 hover:text-white p-0 h-auto font-medium"
            >
              Provider
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="flex items-center gap-2 text-slate-300">
            <span>{getProviderIcon(row.original.provider)}</span>
            <span className="capitalize">{row.original.provider}</span>
          </div>
        ),
      },
      {
        accessorKey: "active",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="text-slate-300 hover:text-white p-0 h-auto font-medium"
            >
              Status
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              {row.original.active ? (
                <span className="flex items-center gap-1 text-emerald-400">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  Active
                </span>
              ) : (
                <span className="flex items-center gap-1 text-red-400">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  Inactive
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              {row.original.isEmailVerified ? (
                <CheckCircle className="w-4 h-4 text-emerald-400" />
              ) : (
                <XCircle className="w-4 h-4 text-red-400" />
              )}
              <span className="text-xs text-slate-400">
                {row.original.isEmailVerified ? "Verified" : "Unverified"}
              </span>
            </div>
          </div>
        ),
        filterFn: (row, id, value) => {
          if (value === "all") return true;
          if (value === "active") return row.original.active;
          if (value === "inactive") return !row.original.active;
          if (value === "verified") return row.original.isEmailVerified;
          if (value === "unverified") return !row.original.isEmailVerified;
          return true;
        },
      },
      {
        accessorKey: "roles",
        header: "Roles",
        cell: ({ row }) => (
          <div className="flex flex-wrap gap-1">
            {row.original.roles.map((role: string) => (
              <span
                key={role}
                className={`px-2 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(role)}`}
              >
                {role}
              </span>
            ))}
          </div>
        ),
        filterFn: (row, id, value) => {
          if (value === "all") return true;
          return row.original.roles.includes(value);
        },
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="text-slate-300 hover:text-white p-0 h-auto font-medium"
            >
              Joined
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="flex items-center gap-2 text-slate-300">
            <Calendar className="w-4 h-4 text-slate-400" />
            {formatDate(row.original.createdAt)}
          </div>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="p-2 hover:bg-slate-700"
              onClick={() => {
                // Handle view action
                console.log("View user:", row.original.id);
              }}
            >
              <Eye className="w-4 h-4 text-slate-400 hover:text-teal-400" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-2 hover:bg-slate-700"
              onClick={() => {
                // Handle delete action
                console.log("Delete user:", row.original.id);
              }}
            >
              <Trash2 className="w-4 h-4 text-red-400" />
            </Button>
          </div>
        ),
      },
    ],
    [],
  );

  const users = data?.users || [];

  const table = useReactTable({
    data: users,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 1,
      },
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            User Management
          </h1>
          <p className="text-slate-400 mt-1">
            Manage and monitor user accounts
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Input
              placeholder="Search users..."
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="max-w-sm bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
            />
            <select
              value={
                (table.getColumn("roles")?.getFilterValue() as string) ?? "all"
              }
              onChange={(e) =>
                table
                  .getColumn("roles")
                  ?.setFilterValue(
                    e.target.value === "all" ? undefined : e.target.value,
                  )
              }
              className="px-4 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            <select
              value={
                (table.getColumn("active")?.getFilterValue() as string) ?? "all"
              }
              onChange={(e) =>
                table
                  .getColumn("active")
                  ?.setFilterValue(
                    e.target.value === "all" ? undefined : e.target.value,
                  )
              }
              className="px-4 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="verified">Verified</option>
              <option value="unverified">Unverified</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-lg border border-slate-700 bg-slate-800/50 backdrop-blur">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="border-slate-700 hover:bg-slate-700/50"
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="text-slate-300">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="border-slate-700 hover:bg-slate-700/50"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-slate-400"
                  >
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="text-sm text-slate-400">
            Showing{" "}
            {table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              1}{" "}
            to{" "}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) *
                table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length,
            )}{" "}
            of {table.getFilteredRowModel().rows.length} entries
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="bg-slate-800/50 border-slate-600 text-white hover:bg-slate-700"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: table.getPageCount() }, (_, i) => (
                <Button
                  key={i}
                  variant={
                    table.getState().pagination.pageIndex === i
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  onClick={() => table.setPageIndex(i)}
                  className={
                    table.getState().pagination.pageIndex === i
                      ? "bg-teal-500 hover:bg-teal-600"
                      : "bg-slate-800/50 border-slate-600 text-white hover:bg-slate-700"
                  }
                >
                  {i + 1}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="bg-slate-800/50 border-slate-600 text-white hover:bg-slate-700"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
