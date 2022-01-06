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
      <div id="about" className="bg-light-green">
        <div className="flex flex-row justify-end pt-7">
          <Image src="/bitmons/viscat.png" width="300" height="214" />
        </div>
        <div className="mx-8 md:mx-20 lg:mx-40 py-12 -mt-16 md:-mt-32 lg:-mt-40">
          <h1 className="text-orange text-xl">About us</h1>
          <h1 className="text-4xl">What is Bitmon?</h1>
          <div className="pb-20 max-w-3xl text-justify">
            <p className="py-4">
              Bitmon is a P2E game made in a collaboration by Kindynos, Vibing
              Studios and Maki Studios, where you can play, breed, trade and
              fight with decentralized monsters.
            </p>
            <p className="py-4">
              Bitmon is a collection of 10k Bitmon PFP trainers that will serve
              as an access to the BitmonDAO.
            </p>
            <p className="py-4">
              Bitmon was conceived from the vision that anyone can create a
              video game based on it since CC0 rights of the Bitmons will be
              given so that any person, creator, artist, or developer can make a
              product from the art and mechanics of the video game. People will
              be able to request funding from the DAO, which will be controlled
              by the bitmon trainers, to make art derivations from it, examples
              can be an anime, web series, manga, videogame, trading card game,
              or anything bitmon related. The first decentralized videogame
              brand.
            </p>
          </div>
        </div>
      </div>
      <div id="whitepaper" className="bg-purple">
        <div className="mx-40 py-10 pt-32">
          <h1 className="text-orange text-xl">Unlock your</h1>
          <h1 className="text-4xl uppercase text-white">Trainer Potential</h1>
          <div className="pb-20 max-w-3xl text-justify text-white">
            <p className="py-4">
              Bitmon wants to be the first video game created by the people, for
              the people. With a treasury that will help hire and reward new art
              products derived from it.
            </p>
            <p className="py-4">
              The trainers will also get event passes to catch new bitmons,
              breed their Bitmons, fight with them in the video game created by
              the Bitmon Core team while also being able to receive airdrops
              from new events, a token used for buying items and breeding, and
              decide what to do with the treasury.
            </p>
            <div className="flex flex-row justify-end"></div>
          </div>
        </div>
      </div>
      <div id="roadmap"></div>
      <div id="faq"></div>
    </div>
  );
};
