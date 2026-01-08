
import HomeToRoomButton from "@/components/home-to-room-button";
import Spline from "@splinetool/react-spline/next";


export default function page() {
  return (
    <main
      className="min-h-screen h-200vh w-full pt-10 px-3 hero-bg-1

    "
    >
      <section className="text-neutral-200 flex gap-2 h-svh w-full ">
        <div className="w-170 pl-19 flex flex-col justify-center relative">
          <h1
            className="text-7xl font-normal font-amarna
          bg-linear-to-r from-neutral-200 to-neutral-600 bg-clip-text text-transparent  
          "
          >
            WayStone <br />
            <span className="text-4xl"> — Where paths quietly cross</span>
          </h1>
          <h6 className="bg-linear-to-r from-white to-neutral-600 bg-clip-text text-transparent font-amarna">
            An Application designed to connect random people — like travelers
            meeting at a crossroads
            {/* in another world */}
          </h6>
          <HomeToRoomButton />
          <span className="absolute h-15 w-15 bottom-32 left-50 rounded-full bg-[#00FF00]/80 blur-[3px]"></span>
          {/* <span className="absolute h-15 w-15 scale-130 top-20 left-20 rounded-full bg-[#00FF00]/60 blur-[3px]"></span> */}
          {/* <span className="absolute h-15 w-15 bottom-43 left-8 rounded-full bg-[#00FF00]/80 blur-[3px]"></span> */}
        </div>

        <div className="min-w-lg w-xl">
          <Spline scene="https://prod.spline.design/AtnunEChDF9ne23D/scene.splinecode" />
        </div>
      </section>
    </main>
  );
}
