import Image from "next/image";
import Link from "next/link";

export function Home(): JSX.Element {
  return (
    <div className="absolute w-full top-0">
      <div className="pb-20 h-screen">
        <div className="relative flex flex-row items-center justify-center h-full w-full z-10">
          <div className="w-full">
            <div className="pt-14 text-center flex flex-row justify-center items-center gap-x-10">
              <div className="hidden md:inline-flex ml-10">
                <Image
                  src="/img/separator-right.svg"
                  width="250"
                  height="17"
                  alt="Bitmon Separator"
                />
              </div>
              <div className="my-4">
                <h1 className="text-3xl">Bitmon</h1>
                <h1 className="text-4xl text-orange">Connect</h1>
              </div>
              <div className="hidden md:inline-flex mr-10">
                <Image
                  src="/img/separator-left.svg"
                  width="250"
                  height="17"
                  alt="Bitmon Separator"
                />
              </div>
            </div>
            <div className="flex flex-row items-center justify-center bg-contain bg-no-repeat bg-center bg-title-background h-[58px] mx-auto my-4">
              <div className="top-0 text-xl text-white text-center">
                <p className="text-white text-md">
                  Connect your in-game credentials to the{" "}
                  <span className="text-orange">Solana</span> network
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg w-[300px] mx-auto py-5">
              <h2 className="text-center text-md">Welcome to Bitmon Connect</h2>
              <h2 className="text-center text-sm">
                Select the game you want to connect
              </h2>
              <div className="my-4">
                <Link href="/connect/minecraft" passHref={false}>
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
