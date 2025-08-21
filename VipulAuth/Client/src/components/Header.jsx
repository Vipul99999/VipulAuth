import { useContext } from 'react';
import { assets } from '../assets/assets';
import { AppContent } from '../context/AppContext';
import GetStartedButton from './GetStarted'
const Header = () => {
  const { userData } = useContext(AppContent);

  return (
    <div className="w-full bg-white pt-32 pb-16">
      <div className="max-w-screen-xl xl:max-w-screen-2xl mx-auto px-4 md:px-10 text-center text-gray-800">
        {/* Avatar */}
        <img
          src={assets.header_img}
          alt="Header"
          className="mx-auto w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full mb-6"
        />

        {/* Greeting */}
        <h1 className="flex justify-center items-center gap-2 text-2xl sm:text-3xl md:text-4xl font-semibold mb-2">
          Hey {userData ? userData.name : 'Developer'}!
          <img
            src={assets.hand_wave}
            alt="hand wave"
            className="w-6 h-6 sm:w-8 sm:h-8"
          />
        </h1>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl font-bold mb-4 leading-snug">
          Welcome to our app
        </h2>

        {/* Description */}
        <p className="mb-8 max-w-2xl mx-auto text-base sm:text-lg text-gray-600">
          Let’s start with a quick product tour and we’ll have you up and running in no time!
        </p>

        {/* CTA Button */}
        {/* <button className="border border-gray-500 rounded-full px-8 py-3 hover:bg-gray-100 transition-all text-base font-medium">
           StartedGet
        </button> */}
        <GetStartedButton/>
      </div>
    </div>
  );
};

export default Header;
