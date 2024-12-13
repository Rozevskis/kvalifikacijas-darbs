export default function SideNav() {
  return (
    <>
      <div className="h-screen w-[300px] bg-slate-900 dark:bg-neutral-900  p-[50px] flex flex-col">
        <NavItem name="New" />
      </div>
    </>
  );
}

function NavItem({ name, icon }) {
  return (
    <>
      <div className="text-slate-50 m-2">{name}</div>
    </>
  );
}
