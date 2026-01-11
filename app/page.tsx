import HomeToRoomButton from "@/components/home-to-room-button";
import Spline from "@splinetool/react-spline/next";

export default function page() {
  return (
    <main className="min-h-svh w-full hero-bg-2 md:hero-bg-1 px-9 md:px-18 pt-30 relative">
      <section className="flex flex-col md:flex-row items-center gap-5 text-neutral-200">
        <div className="w-full md:max-w-160 flex flex-col justify-center text-center md:text-start">
          <h1
            className="font-normal font-amarna text-5xl md:text-7xl
          bg-linear-to-r from-neutral-200 to-neutral-600 bg-clip-text text-transparent  
          "
          >
            WayStone <br />
            <span className="block mt-2 text-lg sm:text-xl md:text-4xl">
              {" "}
              — Where paths quietly cross
            </span>
          </h1>

          <h6 className="mt-4 text-sm sm:text-base md:text-lg md:pl-14 bg-linear-to-r from-white to-neutral-600 bg-clip-text text-transparent font-amarna">
            An Application designed to connect random people 
            {/*— like travelers meeting at a crossroads in another world */}
          </h6>
          <div className="mt-6 flex justify-center md:justify-start md:pl-20">
            <HomeToRoomButton />
          </div>
          <div className="mt-6 flex justify-center md:justify-start md:pl-20 relative">
            <span className="hidden md:block absolute h-15 w-15 -bottom-2 left-50 rounded-full bg-[#00FF00]/80 blur-[3px]" />
            <span className="md:hidden absolute h-15 w-15 -bottom-5 right-19 rounded-full bg-[#00FF00]/80 blur-[3px]" />
          </div>
        </div>

        <div className="hidden md:flex md:-mt-10 md:h-120 md:w-150 justify-center">
          <Spline
            scene="https://prod.spline.design/AtnunEChDF9ne23D/scene.splinecode"
            className="lg:w-130 lg:h-130"
          />
        </div>
      </section>
    </main>
  );
}
