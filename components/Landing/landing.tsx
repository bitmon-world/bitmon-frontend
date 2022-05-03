import Image from "next/image";
import Link from "next/link";
import { ButtonGreen, ButtonOrange, ButtonRed } from "../Button";

export const Landing = () => {
  
  function btnRed(): JSX.Element {
    return  (
      <ButtonRed
        text="PLAY NOW"
        onClick= {() => {
          window.location.href='/download';
          }}
      />
    )
  }
  return (
    <div className="absolute w-full top-0">
      <div className="landing-background pb-20">
        <div className="flex flex-row justify-center">
          <div className="z-0 absolute opacity-10 pt-20">
            <Image
              src="/icons/bitmon-icon-black.svg"
              width="275"
              height="275"
            />
          </div>
        </div>
        <div className="flex flex-row justify-center items-center pt-28 max-w-[600px] mx-auto">
          <div className="-mr-14 ml-2">
            <Image src="/bitmons/birblu.png" width="272" height="340" />
          </div>
          <div className="z-10">
            <Image src="/bitmons/eldercott.png" width="222" height="340" />
          </div>
          <div className="-ml-14 mr-2">
            <Image src="/bitmons/gullet.png" width="301" height="340" />
          </div>
        </div>
        <div className="text-white text-center text-2xl mx-4 z-10">
          <h1>Welcome to the world of</h1>
        </div>
        <div className="flex flex-row justify-center mx-4">
          <Image src="/img/bitmon.png" width="500" height="219" />
        </div>
        <div className="flex flex-row justify-center mx-4">
              <div className="hidden md:block">{btnRed()}</div>
        </div>
        <br></br>
        <div className="text-white text-center text-2xl pb-20 mx-4">
          <h1>
            The first decentralized videogame created by the people, for the
            people.
          </h1>
        </div>
        <div className="flex flex-row items-center gap-x-8 justify-center py-1 md:py-4 lg:py-8 mx-2">
          <div>
            <Image src="/img/text-home-1.png" width="1100" height="200" />
          </div>
          <div>
            <Image src="/img/trainer_1.png" width="220" height="220" />
          </div>
        </div>
        <div className="flex flex-row items-center gap-x-8 justify-center py-1 md:py-4 lg:py-8 mx-2">
          <div>
            <Image src="/img/trainer_2.png" width="220" height="220" />
          </div>
          <div>
            <Image src="/img/text-home-2.png" width="1100" height="200" />
          </div>
        </div>
      </div>
      <div id="about" className="bg-light-green">
        <div className="flex flex-row justify-end pt-7 mr-10">
          <Image src="/bitmons/viscat.png" width="400" height="286" />
        </div>
        <div className="mx-8 md:mx-20 lg:mx-52 py-12 -mt-16 md:-mt-32 lg:-mt-40">
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
      <div id="litepaper" className="bg-purple relative pb-20">
        <div className="mx-8 md:mx-20 lg:mx-40 pt-32">
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
            <div className="flex flex-row justify-end mt-5">
              <div
                className={
                  "w-40 mx-auto rounded-full border-2 shadow shadow-blue bg-green border-green cursor-pointer"
                }
              >
                <div className="py-1 px-6 text-white text-xl uppercase border-2 border-black rounded-full relative w-full">
                  <Link href={"/pdf/litepaper.pdf"} passHref>
                    <div className="flex flex-row items-center justify-center">
                      <div>
                        <h1>Litepaper</h1>
                      </div>
                      <div className="absolute top-0 right-0 opacity-10">
                        <Image
                          src="/icons/bitmon-icon-white.svg"
                          height="40"
                          width="40"
                        />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="-mt-16">
            <Image src="/bitmons/kirov.png" width="400" height="286" />
          </div>
        </div>
        <div className="absolute bottom-0 right-0 invisible lg:visible">
          <Image src="/img/trainer.png" width="300" height="342" />
        </div>
      </div>
      <div id="roadmap" className="bg-light-blue pt-7 mb-20">
        <div className="mx-8 md:mx-20 lg:mx-40 pt-24">
          <h1 className="text-4xl">The Plan</h1>
          <h1 className="text-orange text-xl">What lies ahead</h1>
          <div className="mt-20">
            <Image src="/img/roadmap.png" width="3000" height="3000" />
          </div>
        </div>
      </div>
    </div>
  );
};
