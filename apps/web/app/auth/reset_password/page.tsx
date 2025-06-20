"use client";

import { useEffect, useState } from "react";
import {
  EyeOff,
  Eye,
  Lock,
  Shield,
  CheckCircle,
  Send,
  RotateCcw,
} from "lucide-react";

const PasswordResetPage = () => {
  const [level, setLevel] = useState(0);
  const [strength, setStrength] = useState({
    label: "Very Weak",
    color: "#ef4444",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const [formData, setFormData] = useState({
    password: "",
    passwordConfirm: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleShowHidePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowHideConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event?.preventDefault();
  };

  const strengthIndicator = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strengthColor = (level) => {
    const colors = {
      0: { label: "Very Weak", color: "#ef4444" },
      1: { label: "Weak", color: "#f97316" },
      2: { label: "Fair", color: "#eab308" },
      3: { label: "Good", color: "#22c55e" },
      4: { label: "Strong", color: "#10b981" },
      5: { label: "Very Strong", color: "#059669" },
    };
    return colors[level] || colors[0];
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(temp);
    setStrength(strengthColor(temp));
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (field === "password") {
      changePassword(value);
    }

    // Clear errors when user types
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: null,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.passwordConfirm) {
      newErrors.passwordConfirm = "Please confirm your password";
    } else if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert("Password reset successful!");
    }, 2000);
  };

  const getStrengthColor = (level) => {
    if (level <= 1) return "from-red-500 to-red-600";
    if (level <= 2) return "from-orange-500 to-orange-600";
    if (level <= 3) return "from-yellow-500 to-yellow-600";
    if (level <= 4) return "from-teal-500 to-teal-600";
    return "from-emerald-500 to-emerald-600";
  };

  const getStrengthWidth = (level) => {
    return `${(level / 5) * 100}%`;
  };

  useEffect(() => {
    changePassword("");
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-teal-200/30 border-t-teal-400 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3">
                <div className="p-3 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full">
                  <RotateCcw className="text-2xl text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Reset Password
                </h1>
                <p className="text-slate-400 text-sm sm:text-base">
                  Enter your new password to finish the reset process.
                </p>
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200 flex items-center gap-2">
                <Lock className="w-4 h-4 text-teal-400" />
                Password
              </label>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField("")}
                  className={`w-full pl-12 pr-16 py-4 border-2 text-white bg-slate-800/50 rounded-xl transition-all duration-300 placeholder:text-slate-400 focus:outline-none ${
                    focusedField === "password"
                      ? "border-teal-400 shadow-lg shadow-teal-500/20 bg-slate-800/70"
                      : "border-slate-600 hover:border-slate-500"
                  } ${errors.password ? "border-red-500" : ""}`}
                />
                <Lock
                  className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                    focusedField === "password"
                      ? "text-teal-400"
                      : "text-slate-400"
                  }`}
                />
                <button
                  type="button"
                  onClick={handleShowHidePassword}
                  onMouseDown={handleMouseDownPassword}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-700/50 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-slate-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-slate-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">{errors.password}</p>
              )}

              {/* Enhanced Password Strength Indicator */}
              {formData.password && (
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${getStrengthColor(level)} transition-all duration-500 ease-out`}
                        style={{
                          width: getStrengthWidth(level),
                        }}
                      />
                    </div>
                    <span className="text-xs font-medium text-slate-300 min-w-[2rem]">
                      {level}/5
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield
                      className="w-4 h-4"
                      style={{ color: strength.color }}
                    />
                    <p
                      className="text-sm font-medium"
                      style={{ color: strength.color }}
                    >
                      {strength.label}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200 flex items-center gap-2">
                <Shield className="w-4 h-4 text-teal-400" />
                Confirm Password
              </label>
              <div className="relative group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.passwordConfirm}
                  onChange={(e) =>
                    handleInputChange("passwordConfirm", e.target.value)
                  }
                  onFocus={() => setFocusedField("passwordConfirm")}
                  onBlur={() => setFocusedField("")}
                  className={`w-full pl-12 pr-16 py-4 border-2 text-white bg-slate-800/50 rounded-xl transition-all duration-300 placeholder:text-slate-400 focus:outline-none ${
                    focusedField === "passwordConfirm"
                      ? "border-teal-400 shadow-lg shadow-teal-500/20 bg-slate-800/70"
                      : "border-slate-600 hover:border-slate-500"
                  } ${errors.passwordConfirm ? "border-red-500" : ""}`}
                />
                <Shield
                  className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                    focusedField === "passwordConfirm"
                      ? "text-teal-400"
                      : "text-slate-400"
                  }`}
                />
                <button
                  type="button"
                  onClick={handleShowHideConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-700/50 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5 text-slate-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-slate-400" />
                  )}
                </button>
                {formData.passwordConfirm &&
                  formData.passwordConfirm === formData.password && (
                    <CheckCircle className="absolute right-14 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400" />
                  )}
              </div>
              {errors.passwordConfirm && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.passwordConfirm}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <Send className="w-5 h-5" />
              Reset Password
            </button>

            {/* Security Notice */}
            <div className="text-center">
              <p className="text-xs text-slate-400">
                Your password will be encrypted and stored securely
              </p>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
            <Shield className="w-4 h-4 text-teal-400" />
            <span>256-bit SSL encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetPage;
