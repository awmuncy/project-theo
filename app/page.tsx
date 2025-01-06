import { getAuthCheck } from "@/service/auth";

function LandingPage() {
  return (
    <div>
      <h1>Welcome to Project Theo</h1>
      <p>A web based game from trading assets</p>
      <div>IDK man you are not signed in okay.</div>
    </div>
  );
}

export default async function Home() {
  const auth = await getAuthCheck({
    redirectTo: undefined,
  });

  if (!auth) {
    return <LandingPage />;
  }

  return <DashboardFeelsWrongForAGame />;
}

function DashboardFeelsWrongForAGame() {
  return (
    <>
      <h1>Home</h1>
      <p>Welcome to Fantopia</p>
    </>
  );
}
