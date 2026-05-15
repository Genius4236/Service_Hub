import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, User, AlertCircle, CheckCircle, Loader } from "lucide-react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (pwd) => {
    return pwd.length >= 6;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Validation
      if (!name || !email || !password || !confirmPassword) {
        setError("Please fill in all fields");
        setLoading(false);
        return;
      }

      if (!validatePassword(password)) {
        setError("Password must be at least 6 characters long");
        setLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }

      // Create user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update profile with name
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      setSuccess("Account created successfully! Redirecting...");
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (err) {
      if (err.code === "auth/configuration-not-found") {
        setError("Firebase Authentication is not configured. Please enable it in Firebase Console under Authentication > Sign-in method > Email/Password.");
      } else if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered. Please login instead.");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak. Use at least 6 characters.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email address.");
      } else {
        setError(err.message || "Registration failed. Please try again.");
      }
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0014] to-black flex items-center justify-center px-4 py-12">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Card */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
          <div className="relative bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-2">
                Create Account
              </h1>
              <p className="text-gray-400 text-sm">Join us today</p>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            )}

            {/* Success Alert */}
            {success && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-green-200 text-sm">{success}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleRegister} className="space-y-4">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <div className="relative group/input">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur opacity-0 group-hover/input:opacity-20 transition duration-500"></div>
                  <div className="relative flex items-center">
                    <User className="absolute left-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 transition"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative group/input">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur opacity-0 group-hover/input:opacity-20 transition duration-500"></div>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-3 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 transition"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative group/input">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur opacity-0 group-hover/input:opacity-20 transition duration-500"></div>
                  <div className="relative flex items-center">
                    <Lock className="absolute left-3 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 transition"
                      placeholder="At least 6 characters"
                    />
                  </div>
                </div>
              </div>

              {/* Confirm Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative group/input">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur opacity-0 group-hover/input:opacity-20 transition duration-500"></div>
                  <div className="relative flex items-center">
                    <Lock className="absolute left-3 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 transition"
                      placeholder="Confirm your password"
                    />
                  </div>
                </div>
              </div>

              {/* Terms & Conditions */}
              <label className="flex items-start gap-2 cursor-pointer text-sm">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded bg-white/5 border border-white/10 cursor-pointer mt-0.5"
                />
                <span className="text-gray-400">
                  I agree to the{" "}
                  <a href="#" className="text-indigo-400 hover:text-indigo-300">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-indigo-400 hover:text-indigo-300">
                    Privacy Policy
                  </a>
                </span>
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 relative group/btn overflow-hidden"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur opacity-75 group-hover/btn:opacity-100 transition duration-1000 group-disabled/btn:opacity-50"></div>
                <div className="relative flex items-center justify-center gap-2 px-6 py-3 bg-black rounded-lg group-hover/btn:bg-black/50 transition">
                  {loading ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    "Create Account"
                  )}
                </div>
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black/80 text-gray-500">
                  Already have an account?
                </span>
              </div>
            </div>

            {/* Login Link */}
            <Link
              to="/login"
              className="block w-full text-center py-3 rounded-lg border border-white/10 text-white hover:bg-white/5 transition"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-center text-gray-500 text-xs mt-6">
          Need help?{" "}
          <a href="#" className="text-indigo-400 hover:text-indigo-300">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
