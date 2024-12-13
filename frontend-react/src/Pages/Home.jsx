import VideoList from "../components/Blocks/VideoList";
import SideNav from "../components/SideNav";

export default function Home() {
  return (
    <>
      <div className="flex">
        <SideNav />
        <VideoList />
      </div>
    </>
  );
}
