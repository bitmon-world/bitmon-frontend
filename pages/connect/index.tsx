import Image from "next/image";
import Link from "next/link";

export function Home(): JSX.Element {
  return (
    <div className="absolute w-full top-0">
      <div className="landing-background pb-20 h-screen">
        <div className="flex flex-row justify-center">
          <div className="z-0 absolute opacity-10 pt-20">
            <Image
              src="/icons/bitmon-icon-black.svg"
              width="275"
              height="275"
            />
          </div>
        </div>
        <div className="relative flex flex-row items-center justify-center h-full w-full z-10">
          <div className="w-full">
            <div className="text-center py-5 font-bold">
              <h1 className="text-2xl text-white">Bitmon Connect</h1>
              <p className="text-white text-md">
                Connect your in-game credentials to the Solana network
              </p>
            </div>
            <div className="bg-white rounded-lg w-[300px] mx-auto py-5">
              <h2 className="text-center text-md">Welcome to Bitmon Connect</h2>
              <h2 className="text-center text-sm">
                Select the game you want to connect
              </h2>
              <div className="my-4">
                <Link href="/bitmon" passHref={false}>
                  <div
                    className={
                      "w-40 mx-auto rounded-full border-2 shadow shadow-blue bg-blue border-blue"
                    }
                  >
                    <button
                      className={
                        "py-1 px-6 text-white text-xl uppercase border-2 border-black rounded-full relative w-full"
                      }
                    >
                      <div className="flex flex-row items-center justify-center">
                        <div>
                          <h1>Bitmon</h1>
                        </div>
                        <div className="absolute top-0 right-0 opacity-10">
                          <Image
                            src="/icons/bitmon-icon-white.svg"
                            height="40"
                            width="40"
                          />
                        </div>
                      </div>
                    </button>
                  </div>
                </Link>
              </div>
              <div className="my-4">
                <Link href="/minecraft" passHref={false}>
                  <div
                    className={
                      "w-40 mx-auto rounded-full border-2 shadow shadow-blue bg-blue border-blue"
                    }
                  >
                    <button
                      className={
                        "py-1 px-6 text-white text-xl uppercase border-2 border-black rounded-full relative w-full"
                      }
                    >
                      <div className="flex flex-row items-center justify-center">
                        <div>
                          <h1>Minecraft</h1>
                        </div>
                        <div className="absolute top-0 right-0 opacity-10">
                          <Image
                            src="/icons/bitmon-icon-white.svg"
                            height="40"
                            width="40"
                          />
                        </div>
                      </div>
                    </button>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
