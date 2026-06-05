import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken");

  if (accessToken) {
    redirect("/");
  }

  return (
    <main className="min-h-screen bg-[oklch(70.7%_0.022_261.325)] text-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <h1 className="text-2xl font-bold">indeGram</h1>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-zinc-300 transition hover:text-white"
          >
            Sign In
          </Link>

          <Link
            href="/signup"
            className="rounded-xl bg-orange-500 px-5 py-2 font-medium transition hover:bg-orange-600"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <section className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-20 px-6 py-20 lg:flex-row">
        <div className="max-w-2xl">
          <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm text-orange-400">
            Real-time Messaging
          </span>

          <h1 className="mt-8 text-5xl font-extrabold leading-tight text-zinc-100 lg:text-7xl">
            Your conversations.
            <br />
            Nothing in the way.
          </h1>

          <p className="mt-6 text-lg text-zinc-300">
            Fast messaging, simple contacts, and real-time
            communication built for everyday conversations.
          </p>

          <div className="mt-10 flex gap-4">
            <Link
              href="/signup"
              className="rounded-2xl bg-orange-500 px-6 py-3 font-semibold transition hover:bg-orange-600"
            >
              Start Messaging
            </Link>

            <Link
              href="/login"
              className="rounded-2xl border border-zinc-500/30 px-6 py-3 font-semibold transition hover:bg-white/5"
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className="w-full max-w-md">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
              <div>
                <p className="font-semibold">Bob</p>
                <p className="text-sm text-green-400">Online</p>
              </div>

              <div className="h-10 w-10 rounded-full bg-orange-500" />
            </div>

            <div className="space-y-4 p-5">
              <div className="max-w-[75%] rounded-2xl bg-zinc-800 p-3">
                Hey, are you free?
              </div>

              <div className="ml-auto max-w-[75%] rounded-2xl bg-orange-500 p-3">
                Yeah, what's up?
              </div>

              <div className="max-w-[75%] rounded-2xl bg-zinc-800 p-3">
                Let's ship IndeGram 🚀
              </div>

              <div className="ml-auto max-w-[75%] rounded-2xl bg-orange-500 p-3">
                On it.
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}