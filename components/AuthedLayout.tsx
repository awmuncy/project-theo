import authLayout from "./AuthLayout.module.scss";
import { Header } from "./Header";
import { getAuthCheck } from "@/service/auth";
import { Sidebar } from "./Sidebar";
import { SignOutButton } from "@clerk/nextjs";
import playfulButton from "./PlayfulButton.module.scss";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default async function AuthedLayout({ children }: Props) {
  const auth = await getAuthCheck();

  if (!auth) {
    redirect("/");
    return <div>You must be signed in to view this page.</div>;
  }
  return (
    <div className={authLayout.authLayout}>
      <div className={authLayout.header}>
        <Header />
      </div>
      <div className={authLayout.sidebar}>
        <Sidebar />
      </div>
      <div className={authLayout.content}>{children}</div>
      <div className={authLayout.footer}></div>
      <div className={authLayout.drawer}>Drawer</div>
    </div>
  );
}
