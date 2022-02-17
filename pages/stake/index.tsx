import Image from "next/image";
import {
  createConnectionConfig,
} from "@nfteyez/sol-rayz";
import { useWallet } from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";
import { useCallback, useEffect, useState } from "react";
import { Loader } from "../../components/Loader";
import { ConnectWalletWarning } from "../../components/ConnectWalletWarning";
import { fetchTrainers } from "../../functions/fetch-trainers";
import { MetadataData } from "@metaplex-foundation/mpl-token-metadata";
import { TrainerImage } from "../../components/TrainerImage";
import {
  ButtonBlue,
} from "../../components/Button";

export default function Stake(): JSX.Element {
  enum View {
    STAKED,
    UNSTAKED,
  }

  const url =
    process.env.NEXT_PUBLIC_SOLANA_RPC || clusterApiUrl("mainnet-beta");
  const connect = createConnectionConfig(url);

  const wallet = useWallet();

  const [loading, setLoading] = useState(true);

  const [tokens, setTokens] = useState<{
    staked: MetadataData[];
    unstaked: MetadataData[];
  }>({ staked: [], unstaked: [] });

  const fetch_tokens = useCallback(async () => {
    setLoading(true);

    // Fetch user tokens
    const mints = await fetchTrainers(wallet.publicKey.toBase58(), connect);

    setTokens({ staked: mints.staked, unstaked: mints.unstaked });
    setLoading(false);
  }, [wallet, connect]);

  useEffect(() => {
    if (!wallet || !wallet.connected || !wallet.publicKey) return;
    fetch_tokens();
  }, [wallet]);

  const [view, setView] = useState(View.UNSTAKED);

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
            src="/img/trainer-staking.png"
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
        {wallet.connected ? (
          loading ? (
            <Loader />
          ) : (
            <div className="text-center">
              <div className="flex flex-row items-center justify-center bg-contain bg-no-repeat bg-center bg-title-background h-[58px] mx-auto">
                <p className="top-0 text-xl text-white">
                  Stake your Bitmon <span className="text-orange">trainer</span>{" "}
                  to earn <span className="text-orange">$BIT</span>
                </p>
              </div>
              <div className="flex flex-row items-center justify-center w-full my-6">
                <div className="bg-white rounded-lg py-2 px-4">
                  <h1 className="text-orange">Warning!</h1>
                  <h1>
                    You won't be able to use your trainers until you unstake
                    them and wait for a 7 days lock period.
                  </h1>
                </div>
              </div>
              <div className="flex flex-row items-center justify-center mx-auto mt-2">
                {view === View.STAKED ? (
                  <>
                    <div
                      className={
                        "mx-2 opacity-40 rounded-full border-2 shadow shadow-blue bg-blue border-blue"
                      }
                    >
                      <button
                        className={
                          "py-1 px-6 text-white text-xl uppercase border-2 border-black rounded-full relative cursor-not-allowed"
                        }
                      >
                        <div className="flex flex-row items-center justify-center">
                          <div>
                            <h1>Staked</h1>
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
                    <div
                      className={
                        "mx-2 rounded-full border-2 shadow shadow-blue bg-blue border-blue"
                      }
                    >
                      <button
                        className={
                          "py-1 px-6 text-white text-xl uppercase border-2 border-black rounded-full relative"
                        }
                        onClick={() => setView(View.UNSTAKED)}
                      >
                        <div className="flex flex-row items-center justify-center">
                          <div>
                            <h1>Unstaked</h1>
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
                  </>
                ) : (
                  <>
                    <div
                      className={
                        "mx-2 rounded-full border-2 shadow shadow-blue bg-blue border-blue"
                      }
                    >
                      <button
                        className={
                          "py-1 px-6 text-white text-xl uppercase border-2 border-black rounded-full relative"
                        }
                        onClick={() => setView(View.STAKED)}
                      >
                        <div className="flex flex-row items-center justify-center">
                          <div>
                            <h1>Staked</h1>
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
                    <div
                      className={
                        "opacity-40 mx-2 rounded-full border-2 shadow shadow-blue bg-blue border-blue"
                      }
                    >
                      <button
                        className={
                          "py-1 px-6 text-white text-xl uppercase border-2 border-black rounded-full relative cursor-not-allowed"
                        }
                      >
                        <div className="flex flex-row items-center justify-center">
                          <div>
                            <h1>Unstaked</h1>
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
                  </>
                )}
              </div>
              {view === View.STAKED ? (
                <div className="text-center mt-5">
                  <div className="flex flex-row items-center justify-center">
                    <div className="bg-purple rounded-lg py-2 px-4">
                      <p className="text-xl text-white ">Staked Trainers</p>
                    </div>
                  </div>
                  <div className="z-10 mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-3/4 mx-auto">
                    {tokens.staked.map((t) => {
                      return (
                        <TrainerImage
                          link={false}
                          key={t.mint}
                          uri={t.data.uri}
                          mint={t.mint}
                        />
                      );
                    })}
                  </div>
                </div>
              ) : null}
              {view === View.UNSTAKED ? (
                <div className="text-center mt-5">
                  <div className="flex flex-row items-center justify-center">
                    <div className="bg-purple rounded-lg py-2 px-4">
                      <p className="text-xl text-white ">Unstaked Trainers</p>
                    </div>
                  </div>
                  <div className="z-10 mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-3/4 mx-auto">
                    {tokens.unstaked.map((t) => {
                      return (
                          <div className="bg-white rounded-lg py-2">
                            <TrainerImage
                                link={false}
                                key={t.mint}
                                uri={t.data.uri}
                                mint={t.mint}
                            />
                            <div className="mt-2">
                              <ButtonBlue text="Stake" onClick={ () => console.log("stake")} />
                            </div>
                          </div>

                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          )
        ) : (
          <ConnectWalletWarning />
        )}
      </div>
    </div>
  );
}
