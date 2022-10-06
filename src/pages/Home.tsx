import { AnimatedPage, SafeArea } from "@components";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <AnimatedPage>
      <main className="w-full overflow-hidden bg-home bg-fixed bg-cover bg-center text-white">
        <SafeArea className="h-screen flex flex-col justify-between">
          <div className="w-full h-full flex justify-center items-center">
            <Link
              to="/dashboard"
              className="bg-[rgba(255,255,255,.2)] mt-12 px-5 py-2 text-xl font-medium rounded backdrop-blur skew-x-[-6deg] duration-300 hover:shadow-xl hover:shadow-[#ff00007f]"
            >
              See more
            </Link>
          </div>

          <div className="w-full flex justify-center items-end pb-5">
            <img src="/svgs/logo.svg" alt="Logo" className="object-fit w-60" />
          </div>
        </SafeArea>
      </main>
    </AnimatedPage>
  );
};

export default Home;
