import lp from "./LandingPage.module.scss";

export default function LandingPage() {
  return (
    <div className={lp.landingPage}>
      <h1>Welcome to Project Theo</h1>
      <p>A web based game from trading assets</p>
      <div>IDK man you are not signed in okay.</div>
    </div>
  );
}
