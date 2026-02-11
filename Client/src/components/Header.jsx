import { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContent } from "../context/AppContext";
import GetStartedButton from "./GetStarted";

const Header = () => {
  const { userData } = useContext(AppContent);

  return (
    <section className="relative w-full bg-gradient-to-b from-gray-50 to-white pt-32 pb-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* Avatar */}
        <div className="relative inline-block mb-8">
          <img
            src={assets.header_img}
            alt="Header"
            className="mx-auto w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full 
                       object-cover shadow-xl ring-4 ring-indigo-100"
          />
        </div>

        {/* Greeting */}
        <h1 className="flex justify-center items-center gap-3 
                       text-2xl sm:text-3xl md:text-4xl 
                       font-semibold text-gray-800 mb-3">
          Hey{" "}
          <span className="text-indigo-600">
            {userData ? userData.name : "Developer"}
          </span>{" "}
          <img
            src={assets.hand_wave}
            alt="wave"
            className="w-7 h-7 animate-bounce"
          />
        </h1>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl 
                       font-bold text-gray-900 leading-tight mb-6">
          Welcome to <span className="text-indigo-600">VipulStack</span>
        </h2>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-10">
          Start exploring powerful tools designed to enhance your productivity 
          and streamline your workflow.
        </p>

        {/* CTA */}
        <GetStartedButton />
      </div>
    </section>
  );
};

export default Header;
