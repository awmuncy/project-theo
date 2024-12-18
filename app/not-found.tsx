import Image from "next/image";
import Layout from "@/components/Layouts.module.scss";

export default function Custom404() {
  return (
    <div className={Layout.wishingTree}>
      <h1>404 - Page Not Found</h1>
      <Image
        src="/images/trashceritops.webp"
        height="300"
        width="300"
        alt="Trashceritops"
      ></Image>
    </div>
  );
}
