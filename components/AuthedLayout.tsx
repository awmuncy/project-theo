import { SignOutButton } from "@clerk/nextjs";
import authLayout from "./AuthLayout.module.scss";
import { Header } from "./Header";
import { getAuthCheck } from "@/service/auth";

type Props = {
  children: React.ReactNode;
};

async function SignedInUser() {
  const auth = await getAuthCheck();

  if (!auth) return <div>You must be signed in to view this page.</div>;

  return (
    <div className="flex items-center gap-2">
      <span className="text-xl font-bold">Signed in as </span>
      <span className="text-xl font-bold"> {auth.name}</span>
    </div>
  );
}

export default async function AuthedLayout({ children }: Props) {
  return (
    <div className={authLayout.authLayout}>
      <div className={authLayout.header}>
        <Header />
      </div>
      <div className={authLayout.sidebar}>Sidebar</div>
      <div className={authLayout.content}>{children}</div>
      <div className={authLayout.footer}>
        <SignedInUser />

        <SignOutButton />
      </div>
    </div>
  );
}
