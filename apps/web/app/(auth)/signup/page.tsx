"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import bg from "../bgImage.png";
import { useSignup } from "~/hooks/api/auth/useSignup";

export default function SignUpPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [accountType, setAccountType] = useState<"personal" | "bussiness">(
    "personal"
  );

  const [error, setError] = useState("");
  const { registerUserAsync, err, isSuccess, status } = useSignup();

  useEffect(() => {
    if (isSuccess) {
      router.push("/login");
    }
  }, [isSuccess, router]);

  useEffect(() => {
    if (err) {
      const errorMessage = (err as any)?.message || "Failed to create account";
      setError(errorMessage);
    }
  }, [err]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!fullName.trim()) {
      setError("Full name is required");
      return;
    }

    if (!phoneNumber.trim()) {
      setError("Phone number is required");
      return;
    }

    if (!password.trim()) {
      setError("Password is required");
      return;
    }

    try {
      await registerUserAsync({
        fullName: fullName.trim(),
        phoneNumber: phoneNumber.trim(),
        password,
        email: email.trim() || undefined,
        accountType,
      });
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
              Connect.
              <br />
              Chat.
              <br />
              Grow.
            </h2>

            <p className="mt-6 max-w-md text-lg text-white/80">
              Secure messaging built for personal and business communication.
            </p>
          </div>

          <div className="flex items-center justify-center p-10">
            <div className="w-full max-w-md">
              <div className="mb-8">
                <h2 className="text-4xl font-bold text-zinc-900">
                  Create Account
                </h2>

                <p className="mt-2 text-zinc-500">
                  Join indeGram and start connecting.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-700">
                    Account Type
                  </label>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setAccountType("personal")}
                      className={`h-12 rounded-xl border font-medium transition ${
                        accountType === "personal"
                          ? "border-orange-500 bg-orange-500 text-white"
                          : "border-zinc-300 bg-white text-zinc-700"
                      }`}
                    >
                      Personal
                    </button>

                    <button
                      type="button"
                      onClick={() => setAccountType("bussiness")}
                      className={`h-12 rounded-xl border font-medium transition ${
                        accountType === "bussiness"
                          ? "border-orange-500 bg-orange-500 text-white"
                          : "border-zinc-300 bg-white text-zinc-700"
                      }`}
                    >
                      Business
                    </button>
                  </div>
                </div>

                <Input
                  required
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-12"
                />

                <Input
                  required
                  placeholder="+91 9876543210"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="h-12"
                />

                <Input
                  required
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12"
                />

                <Input
                  placeholder="Email (Optional)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                />

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
                  {status === "pending" ? "Creating Account..." : "Create Account"}
                </Button>
              </form>

              <p className="mt-8 text-center text-sm text-zinc-500">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-orange-500 hover:text-orange-600"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}