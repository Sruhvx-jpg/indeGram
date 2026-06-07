"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import bg from "../bgImage.png";
import { useLogin } from "~/hooks/api/auth/useLogin";
import { useUserStore } from "~/hooks/userStore";

const COUNTRY_CODES = [
  { code: "91", country: "India", flag: "🇮🇳" },
  { code: "1", country: "USA", flag: "🇺🇸" },
  { code: "44", country: "UK", flag: "🇬🇧" },
  { code: "86", country: "China", flag: "🇨🇳" },
  { code: "81", country: "Japan", flag: "🇯🇵" },
  { code: "33", country: "France", flag: "🇫🇷" },
  { code: "49", country: "Germany", flag: "🇩🇪" },
  { code: "39", country: "Italy", flag: "🇮🇹" },
  { code: "34", country: "Spain", flag: "🇪🇸" },
  { code: "61", country: "Australia", flag: "🇦🇺" },
  { code: "64", country: "New Zealand", flag: "🇳🇿" },
  { code: "27", country: "South Africa", flag: "🇿🇦" },
  { code: "55", country: "Brazil", flag: "🇧🇷" },
  { code: "1", country: "Canada", flag: "🇨🇦" },
  { code: "52", country: "Mexico", flag: "🇲🇽" },
  { code: "82", country: "South Korea", flag: "🇰🇷" },
  { code: "66", country: "Thailand", flag: "🇹🇭" },
  { code: "60", country: "Malaysia", flag: "🇲🇾" },
  { code: "65", country: "Singapore", flag: "🇸🇬" },
  { code: "62", country: "Indonesia", flag: "🇮🇩" },
  { code: "63", country: "Philippines", flag: "🇵🇭" },
  { code: "84", country: "Vietnam", flag: "🇻🇳" },
  { code: "31", country: "Netherlands", flag: "🇳🇱" },
  { code: "41", country: "Switzerland", flag: "🇨🇭" },
  { code: "46", country: "Sweden", flag: "🇸🇪" },
  { code: "47", country: "Norway", flag: "🇳🇴" },
  { code: "45", country: "Denmark", flag: "🇩🇰" },
  { code: "48", country: "Poland", flag: "🇵🇱" },
  { code: "39", country: "Vatican", flag: "🇻🇦" },
  { code: "971", country: "UAE", flag: "🇦🇪" },
];

export default function LoginPage() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser)

  const [countryCode, setCountryCode] = useState("91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const { loginUserAsync, err, isSuccess, status } = useLogin();

  useEffect(() => {
    if (isSuccess) {
      router.push("/main");
    }
  }, [isSuccess, router]);

  useEffect(() => {
    if (err) {
      const errorMessage = (err as any)?.message || "Failed to sign in";
      setError(errorMessage);
    }
  }, [err]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (!phoneNumber.trim()) {
      setError("Phone number is required");
      return;
    }

    if (!password.trim()) {
      setError("Password is required");
      return;
    }

    try {
      const user = await loginUserAsync({
        phoneNumber: `+${countryCode}${phoneNumber.trim()}`,
        password,
      });

      setUser(user)
    } catch (err: any) {
      setError(
        err?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${bg.src})`,
      }}
    >
      <div className="w-full max-w-6xl rounded-[32px] bg-white/95 backdrop-blur-sm p-5 shadow-2xl">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-5">
          <div className="rounded-[28px] bg-orange-500 p-12 flex flex-col justify-center">
            <h1 className="text-6xl font-extrabold text-white">
              indeGram
            </h1>

            <div className="mt-4 h-1 w-24 rounded-full bg-white/40" />

            <h2 className="mt-10 text-4xl font-bold leading-tight text-white">
              Welcome Back.
              <br />
              Continue Your
              <br />
              Conversations.
            </h2>

            <p className="mt-6 max-w-md text-lg text-white/80">
              Sign in to access your messages and communities.
            </p>
          </div>

          <div className="flex items-center justify-center p-10">
            <div className="w-full max-w-md">
              <div className="mb-8">
                <h2 className="text-4xl font-bold text-zinc-900">
                  Sign In
                </h2>

                <p className="mt-2 text-zinc-500">
                  Welcome back to indeGram.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-3">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="h-12 rounded-lg border border-zinc-200 bg-white px-3 text-lg font-medium text-zinc-900 appearance-none cursor-pointer hover:border-zinc-300 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  >
                    {COUNTRY_CODES.map((item) => (
                      <option key={`${item.code}-${item.country}`} value={item.code}>
                        {item.flag} +{item.code}
                      </option>
                    ))}
                  </select>

                  <Input
                    required
                    placeholder="9876543210"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="h-12 flex-1"
                  />
                </div>

                <div className="relative">
                  <Input
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-zinc-500 hover:text-zinc-700 transition"
                  >
                    {showPassword ? "👁️" : "�"}
                  </button>
                </div>

                <div className="flex justify-end">
                  <Link
                    href="/forgot-password"
                    className="text-sm text-orange-500 hover:text-orange-600"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={status === "pending"}
                  className="h-12 w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50"
                >
                  {status === "pending" ? "Signing In..." : "Sign In"}
                </Button>
              </form>

              <p className="mt-8 text-center text-sm text-zinc-500">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-orange-500 hover:text-orange-600"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}