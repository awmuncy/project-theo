import lp from "./LandingPage.module.scss";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className={lp.landingPage}>
      <Image
        className={lp.bgImage}
        height="1024"
        width="1792"
        src="/images/LPBackground.webp"
        alt="Landing Page Background"

      />
      <h1>Welcome to Project Theo</h1>
      <p>
        Here we will put a big banner with a cool background and a button to
        sign in.
      </p>
      <p>
        Here we will but a section with no BG with a paragraph about the game
      </p>
      <p>Finally, we will but a PNG of a single creature above the footer.</p>
    </div>
  );
}
