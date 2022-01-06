import Image from "next/image";

export const Landing = () => {
  return (
    <div className="absolute w-full top-0">
      <div className="landing-background">
        <div className="flex flex-row justify-center">
          <div className="z-0 absolute opacity-10 pt-20">
            <Image
              src="/icons/bitmon-icon-black.svg"
              width="275"
              height="275"
            />
          </div>
        </div>
        <div className="flex flex-row justify-center items-center pt-28 mx-4">
          <div className="-mx-48">
            <Image src="/bitmons/birblu.png" width="350" height="250" />
          </div>
          <div className="z-10">
            <Image src="/bitmons/eldercott.png" width="350" height="250" />
          </div>
          <div className="-mx-48">
            <Image src="/bitmons/gullet.png" width="350" height="250" />
          </div>
        </div>
        <div className="text-white text-center text-xl mx-4">
          <h1>Welcome to the world of</h1>
        </div>
        <div className="flex flex-row justify-center mx-4">
          <Image src="/img/bitmon.png" width="500" height="219" />
        </div>
        <div className="text-white text-center text-xl pb-20 mx-4">
          <h1>
            The first decentralized videogame created by the people, for the
            people.
          </h1>
        </div>
      </div>

      <div id="about"></div>
      <div></div>
      <div id="roadmap"></div>
      <div id="faq"></div>
    </div>
  );
};
