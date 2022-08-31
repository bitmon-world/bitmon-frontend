import Image from "next/image";
import { createConnectionConfig } from "@nfteyez/sol-rayz";
import { useWallet } from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

import { fetchTrainers } from "../../functions/fetch-trainers";

export default function Creator(): JSX.Element {
  const url =
    process.env.NEXT_PUBLIC_SOLANA_RPC || clusterApiUrl("mainnet-beta");
  const connect = createConnectionConfig(url);

  const wallet = useWallet();

  const [loading, setLoading] = useState(true);

  const [tokens, setTokens] = useState([]);

  const fetch_tokens = useCallback(async () => {
    setLoading(true);

    // Fetch user tokens
    const mints = await fetchTrainers(wallet.publicKey.toBase58(), connect);
    const trainers = [].concat(mints.staked).concat(mints.unstaked);

    setTokens(trainers);
    setLoading(false);
  }, [wallet, connect]);

  useEffect(() => {
    if (!wallet || !wallet.connected || !wallet.publicKey) return;
    fetch_tokens();
  }, [wallet]);

  return (
    <div className="relative z-10 mx-4 h-full pb-10">
      <div className="pt-14 text-center flex flex-row justify-center items-center gap-x-10">
        <div className="hidden md:inline-flex ml-10">
          <Image
            src="/img/separator-right.svg"
            width="250"
            height="17"
            alt="Bitmon Separator"
          />
        </div>
        <div>
          <Image
            src="/img/download.png"
            width="200"
            height="85"
            alt="Bitmon Separator"
          />
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
      <div className="mt-6">
        <div className="flex flex-row items-center justify-center bg-contain bg-no-repeat bg-center bg-title-background h-[88px] mx-auto my-4">
          <div className="top-0 text-xl text-white text-center">
            <p className="text-white text-md">
              If this is your first time downloading the game,
            </p>
            <p>
              <span className="text-orange">create and verify</span> your account to be able to access Bitmon
            </p>
          </div>
        </div>
        <div className="flexArea">
          <div className=" mx-auto py-5 flex-item">
            <div className="my-4">
              <a href="/user" target="_blank" data-inline="true">
                <div
                  className={
                    "w-60 mx-auto rounded-full border-2 shadow shadow-green bg-green border-green display:inline-block"
                  }
                >
                  <button
                    className={
                      "py-1 px-6 text-white text-xl uppercase border-2 border-black rounded-full relative w-full"
                    }
                  >
                    <div className="flex flex-row items-center justify-center">
                      <div>
                        <h1>Create & Verify Account</h1>
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
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center bg-contain bg-no-repeat bg-center bg-title-background h-[88px] mx-auto my-4">
          <div className="top-0 text-xl text-white text-center">
            <p>
              Once your account is created,
            </p>
            <p className="text-white text-md">
              You will need a <a href="https://magiceden.io/marketplace/bitmon_creatures" className="text-orange">Bitmon Creature</a> to play the alpha version of the game.
            </p>
          </div>
        </div>
        <div className="flexArea">
          <div className=" mx-auto py-5 flex-item">
            <div className="my-4">
              <a href="https://magiceden.io/marketplace/bitmon_creatures" target="_blank" data-inline="true">
                <div
                  className={
                    "w-60 mx-auto rounded-full border-2 shadow shadow-green bg-green border-green display:inline-block"
                  }
                >
                  <button
                    className={
                      "py-1 px-6 text-white text-xl uppercase border-2 border-black rounded-full relative w-full"
                    }
                  >
                    <div className="flex flex-row items-center justify-center">
                      <div>
                        <h1>Buy a Bitmon Creature</h1>
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
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center bg-contain bg-no-repeat bg-center bg-title-background h-[58px] mx-auto my-4">
          <div className="top-0 text-xl text-white text-center">
            <p className="text-white text-md">
              Get the alpha version of the {" "}
              <span className="text-orange">Bitmon Adventures</span> game.
            </p>
          </div>
        </div>
        <div className="flexArea">
          {/* btn 1 */}
          <div className=" mx-auto py-5 flex-item">
            <div className="my-4">
              <a href="https://github.com/vibingstudio/vibing-launcher/releases/download/v0.1.3/Vibing.Launcher.Setup.0.1.3.exe" target="_blank" data-inline="true">
                <div
                  className={
                    "w-40 mx-auto rounded-full border-2 shadow shadow-blue bg-blue border-blue display:inline-block"
                  }
                >
                  <button
                    className={
                      "py-1 px-6 text-white text-xl uppercase border-2 border-black rounded-full relative w-full"
                    }
                  >
                    <div className="flex flex-row items-center justify-center">
                      <div>
                        <h1>Microsoft</h1>
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
              </a>
            </div>
          </div>
          {/* btn 2 */}
          <div className="  mx-auto py-5 flex-row">
            <div className="my-4">
              <a href="https://github.com/vibingstudio/vibing-launcher/releases/download/v0.1.3/Vibing.Launcher-0.1.3.dmg" target="_blank" data-inline="true">
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
                        <h1>Macos</h1>
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
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
