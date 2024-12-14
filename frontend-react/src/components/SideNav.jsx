export default function SideNav() {
  return (
    <>
      <div className="h-screen w-[300px] bg-slate-900 dark:bg-neutral-900  p-[30px] flex flex-col shadow-lg">
        <NavItem name="New" />
        <NavItem name="Features" />
        <NavItem name="Here" />
      </div>
    </>
  );
}

function NavItem({ name, icon }) {
  return (
    <>
      <div className="text-slate-50 m-2 hover:text-slate-300 cursor-pointer hover:scale-[1.05] hover:bg-neutral-800 px-2 py-1 rounded">
        {name}
      </div>
    </>
  );
}
