type Props = {
  children: React.ReactNode;
  tabs: React.ReactNode;
};

export default async function Layout({ children, tabs }: Props) {
  return (
    <div>
      {children}

      {tabs}
    </div>
  );
}
