"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  Loader2,
  Upload,
  CheckCircle,
  ArrowLeft,
  User,
  Building,
  Globe,
  Phone,
  Home,
  Badge,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/Spinner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import validator from "validator";
import axios from "axios";
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from "@/features/users/usersApiSlice";
import { toast } from "sonner";

const EditProfilePage = () => {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const { data } = useGetUserProfileQuery(undefined);
  const [updateMyProfile, { data: updateData, isLoading, isSuccess }] =
    useUpdateUserProfileMutation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      phoneNumber: "",
      address: "",
      businessName: "",
      city: "",
      country: "",
      avatar: "",
    },
  });

  const avatar = watch("avatar");
  const phoneNumber = watch("phoneNumber");

  const isValidPhoneNumber = validator.isMobilePhone(phoneNumber || "");

  useEffect(() => {
    const userProfile = data?.userProfile;
    if (userProfile) {
      Object.entries(userProfile).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [data, setValue]);

  useEffect(() => {
    if (isSuccess) {
      router.push("/profile");
      toast.success(updateData?.message);
    }
  }, [isSuccess, updateData, router]);

  const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("logo", file);
    setUploading(true);

    try {
      const { data } = await axios.patch("/api/v1/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setValue("avatar", data);
    } catch (err) {
      toast.error("File upload failed");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (formData: any) => {
    try {
      await updateMyProfile(formData).unwrap();
    } catch (err: any) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  const personalFields = [
    { label: "First Name", key: "firstName", icon: User, type: "text" },
    { label: "Last Name", key: "lastName", icon: User, type: "text" },
    { label: "Username", key: "username", icon: Badge, type: "text" },
    { label: "Phone Number", key: "phoneNumber", icon: Phone, type: "tel" },
    { label: "Address", key: "address", icon: Home, type: "text" },
  ];

  const businessFields = [
    {
      label: "Business Name",
      key: "businessName",
      icon: Building,
      type: "text",
    },
    { label: "City", key: "city", icon: Globe, type: "text" },
    { label: "Country", key: "country", icon: Globe, type: "text" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-emerald-400 w-8 h-8" />
            <div>
              <h1 className="text-3xl font-bold text-white">Update Profile</h1>
              <p className="text-gray-400 text-sm">Keep your info up to date</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>

        {isLoading ? (
          <Spinner />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Avatar */}
            <Card className="bg-slate-800/50">
              <CardContent className="p-6">
                <h3 className="text-white mb-4 font-semibold flex items-center gap-2">
                  <Upload className="w-5 h-5 text-emerald-400" />
                  Profile Picture
                </h3>

                <div className="flex gap-6 items-center">
                  <div className="relative">
                    {avatar ? (
                      <img
                        src={avatar}
                        alt="Avatar"
                        className="w-24 h-24 rounded-full border-4 border-emerald-400/30 object-cover"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-slate-700 rounded-full flex items-center justify-center">
                        <User className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <Label htmlFor="avatar" className="text-gray-300">
                      Avatar URL
                    </Label>
                    <Input
                      {...register("avatar")}
                      placeholder="https://example.com/avatar.jpg"
                      className="mt-2"
                    />

                    {/* Hidden File Input */}
                    <input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      onChange={uploadFileHandler}
                      className="hidden"
                    />

                    <div className="mt-4 flex gap-4 items-center">
                      <Label htmlFor="logo-upload">
                        <Button
                          type="button"
                          variant="secondary"
                          className="bg-emerald-600 hover:bg-emerald-700 text-white"
                          disabled={uploading}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Upload New Avatar
                        </Button>
                      </Label>

                      {uploading && (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Uploading...
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personal Info */}
            <Card className="bg-slate-800/50">
              <CardContent className="p-6">
                <h3 className="text-white mb-4 font-semibold flex items-center gap-2">
                  <User className="w-5 h-5 text-emerald-400" />
                  Personal Information
                </h3>

                <div className="grid sm:grid-cols-2 gap-6">
                  {personalFields.map(({ label, key, icon: Icon, type }) => (
                    <div key={key}>
                      <Label className="text-gray-300 flex items-center gap-2">
                        <Icon className="w-4 h-4 text-emerald-400" />
                        {label}
                      </Label>
                      <Input
                        type={type}
                        {...register(key)}
                        className={`mt-2 ${
                          key === "phoneNumber" &&
                          phoneNumber &&
                          !isValidPhoneNumber
                            ? "border-red-500"
                            : ""
                        }`}
                        placeholder={`Enter your ${label.toLowerCase()}`}
                      />
                      {key === "phoneNumber" &&
                        phoneNumber &&
                        !isValidPhoneNumber && (
                          <p className="text-sm text-red-400 mt-1">
                            Invalid phone number (e.g. +254712345678)
                          </p>
                        )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Business Info */}
            <Card className="bg-slate-800/50">
              <CardContent className="p-6">
                <h3 className="text-white mb-4 font-semibold flex items-center gap-2">
                  <Building className="w-5 h-5 text-emerald-400" />
                  Business Information
                </h3>

                <div className="grid sm:grid-cols-2 gap-6">
                  {businessFields.map(({ label, key, icon: Icon, type }) => (
                    <div key={key}>
                      <Label className="text-gray-300 flex items-center gap-2">
                        <Icon className="w-4 h-4 text-emerald-400" />
                        {label}
                      </Label>
                      <Input
                        type={type}
                        {...register(key)}
                        className="mt-2"
                        placeholder={`Enter your ${label.toLowerCase()}`}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="text-center">
              <Button
                type="submit"
                disabled={
                  uploading || isLoading || (!isValidPhoneNumber && phoneNumber)
                }
                className="px-10 py-3 bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Update Profile
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditProfilePage;
