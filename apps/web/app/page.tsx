import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { api } from "~/trpc/server";

export default async function Home() {
  const { status } = await api.health.getHealth.query();

  const cookieStore = await cookies()
  const accessToken = cookieStore.get("access_token")

  if(accessToken) {
    redirect("/main")
  }
  else {
    redirect("/landing")
  }
  

  return (
    <main className="min-h-screen min-w-screen flex justify-center items-center">
      <div>
        <h1 className="text-3xl">indeGram</h1>
        <h2>Server Status: {status}</h2>
      </div>
    </main>
  );
}
