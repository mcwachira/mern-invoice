"use client";

import Spinner from "@/components/Spinner";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { logOut } from "@/features/auth/authSlice";
import {
  useGetUserProfileQuery,
  useDeleteMyAccountMutation,
} from "@/features/users/usersApiSlice";
import {
  BadgeCheck,
  Building,
  Globe,
  Home,
  Mail,
  Pencil,
  Phone,
  Pin,
  Power,
  Trash2,
  User,
  UserMinus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const ProfilePage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetUserProfileQuery(undefined);
  const [deleteMyAccount] = useDeleteMyAccountMutation();
  const [openDialog, setOpenDialog] = useState(false);

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const deleteHandler = async () => {
    try {
      await deleteMyAccount(undefined).unwrap();
      dispatch(logOut());
      toast.success("Your account has been deleted. Sad to see you go 😢");
    } catch (err: any) {
      toast.error(err.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <BadgeCheck className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-400" />
              <div className="absolute inset-0 blur-sm bg-emerald-400/20 rounded-full"></div>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              User Profile
            </h1>
          </div>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
            Manage your account information and preferences
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Spinner />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Avatar and Basic Info Section */}
            <div className="text-center mb-8">
              <div className="relative inline-block mb-6">
                {data?.userProfile?.avatar ? (
                  <Avatar
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-emerald-400/30 shadow-xl"
                    src={data.userProfile.avatar}
                  />
                ) : (
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border-4 border-emerald-400/30 flex items-center justify-center shadow-xl">
                    <User className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" />
                  </div>
                )}
                <div className="absolute inset-0 rounded-full bg-emerald-400/10 blur-xl"></div>
              </div>

              {data?.userProfile?.firstName && data?.userProfile?.lastName && (
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                  {data.userProfile.firstName} {data.userProfile.lastName}
                </h2>
              )}
              {data?.userProfile?.email && (
                <p className="text-emerald-400 text-sm sm:text-base">
                  {data.userProfile.email}
                </p>
              )}
            </div>

            {/* Profile Information Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Personal Information Card */}
              <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 shadow-xl">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                    <User className="w-5 h-5 text-emerald-400" />
                    Personal Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/30 border border-slate-600/30">
                      <Power className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <div className="flex-1 text-sm">
                        <span className="text-gray-400">Provider: </span>
                        <span className="text-white font-medium">
                          {capitalize(
                            data?.userProfile?.provider || "Not specified",
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/30 border border-slate-600/30">
                      <Mail className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <div className="flex-1 text-sm">
                        <span className="text-gray-400">Email: </span>
                        <span className="text-white font-medium break-all">
                          {data?.userProfile?.email || "Not provided"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/30 border border-slate-600/30">
                      <User className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <div className="flex-1 text-sm">
                        <span className="text-gray-400">First Name: </span>
                        <span className="text-white font-medium">
                          {data?.userProfile?.firstName || "Not provided"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/30 border border-slate-600/30">
                      <User className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <div className="flex-1 text-sm">
                        <span className="text-gray-400">Last Name: </span>
                        <span className="text-white font-medium">
                          {data?.userProfile?.lastName || "Not provided"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/30 border border-slate-600/30">
                      <BadgeCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <div className="flex-1 text-sm">
                        <span className="text-gray-400">Username: </span>
                        <span className="text-white font-medium">
                          {data?.userProfile?.username || "Not provided"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/30 border border-slate-600/30">
                      <Home className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <div className="flex-1 text-sm">
                        <span className="text-gray-400">Address: </span>
                        <span className="text-white font-medium">
                          {data?.userProfile?.address || "Not provided"}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Business Information Card */}
              <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 shadow-xl">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                    <Building className="w-5 h-5 text-emerald-400" />
                    Business Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/30 border border-slate-600/30">
                      <Building className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <div className="flex-1 text-sm">
                        <span className="text-gray-400">Business Name: </span>
                        <span className="text-white font-medium">
                          {data?.userProfile?.businessName || "Not provided"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/30 border border-slate-600/30">
                      <Pin className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <div className="flex-1 text-sm">
                        <span className="text-gray-400">City: </span>
                        <span className="text-white font-medium">
                          {data?.userProfile?.city || "Not provided"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/30 border border-slate-600/30">
                      <Globe className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <div className="flex-1 text-sm">
                        <span className="text-gray-400">Country: </span>
                        <span className="text-white font-medium">
                          {data?.userProfile?.country || "Not provided"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/30 border border-slate-600/30">
                      <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <div className="flex-1 text-sm">
                        <span className="text-gray-400">Phone: </span>
                        <span className="text-white font-medium">
                          {data?.userProfile?.phoneNumber || "Not provided"}
                        </span>
                      </div>
                    </div>

                    {/* Empty state message for business section if no data */}
                    {!data?.userProfile?.businessName &&
                      !data?.userProfile?.city &&
                      !data?.userProfile?.country &&
                      !data?.userProfile?.phoneNumber && (
                        <div className="text-center py-8">
                          <Building className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                          <p className="text-gray-400 text-sm">
                            Complete your business information to get started
                          </p>
                        </div>
                      )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button
                onClick={() => router.push(`/profile/edit`)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25"
                variant="default"
              >
                <Pencil className="mr-2 h-5 w-5" />
                Edit Profile
              </Button>

              <Button
                onClick={() => setOpenDialog(true)}
                variant="destructive"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
              >
                <UserMinus className="mr-2 h-5 w-5" />
                Delete Account
              </Button>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="bg-slate-800 border-slate-700 rounded-xl text-white">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-white flex items-center gap-2">
                <Trash2 className="w-5 h-5 text-red-400" />
                Delete Account
              </DialogTitle>
              <DialogDescription className="text-gray-300 mt-2">
                Are you sure you want to permanently delete your account? This
                action cannot be undone and will remove all your data.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-6">
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <Button
                  onClick={() => setOpenDialog(false)}
                  variant="outline"
                  className="flex-1 bg-transparent border-slate-600 text-gray-300 hover:bg-slate-700 hover:text-white"
                >
                  Cancel
                </Button>
                <Button
                  onClick={deleteHandler}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  variant="destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Account
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ProfilePage;
