import LandingPage from "@/components/LandingPage";
import { getAuthCheck } from "@/service/auth";

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
