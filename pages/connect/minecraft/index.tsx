import Image from "next/image";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { toast } from "react-hot-toast";
import {
  ButtonBlue,
  ButtonBlueDisabled,
  ButtonGreen,
  ButtonOrange,
} from "../../../components/Button";
import { updateDb } from "../../../functions/connect/database";
import { shortenString } from "../../../functions/format";

const COLLECTIONS = {
  bitmon: "Bitmon Trainers",
  monkettes: "Monkettes",
};

export function Minecraft(): JSX.Element {
  const wallet = useWallet();

  const [collection, setCollection] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  const modal = useWalletModal();

  function connect(): JSX.Element {
    return wallet.connected ? (
      <ButtonOrange
        text={shortenString(wallet.publicKey.toString(), 9)}
        onClick={() => wallet.disconnect()}
      />
    ) : (
      <ButtonGreen text={"Connect"} onClick={() => modal.setVisible(true)} />
    );
  }

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
                <h1 className="text-3xl">Minecraft</h1>
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
              <p className="top-0 text-xl text-white text-center">
                <p className="text-white text-md">
                  Connect your in-game credentials to the{" "}
                  <span className="text-orange">Solana</span> network
                </p>
              </p>
            </div>
            <div className="bg-white rounded-lg w-[300px] mx-auto py-5">
              <h2 className="text-center text-md">
                Welcome to Minecraft Connect
              </h2>
              {wallet.connected ? null : (
                <h2 className="text-center text-sm mt-3">
                  Connect your wallet to start
                </h2>
              )}
              <div className="flex flex-row justify-center mt-2">
                {connect()}
              </div>
              {wallet.connected ? (
                <div className="mt-5">
                  <Menu as="div" className="relative text-center px-2">
                    <div>
                      <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                        {collection ? (
                          <span>{COLLECTIONS[collection]}</span>
                        ) : (
                          <span>Select a collection</span>
                        )}
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {Object.keys(COLLECTIONS).map((c) => {
                            return (
                              <Menu.Item key={c}>
                                {() => (
                                  <button
                                    onClick={() => setCollection(c)}
                                    className="text-center p-2 w-full text-sm font-medium "
                                  >
                                    {COLLECTIONS[c]}
                                  </button>
                                )}
                              </Menu.Item>
                            );
                          })}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                  <div className="mt-2">
                    <h2 className="text-center text-sm mt-3">
                      Write your Minecraft username
                    </h2>
                    <div className="mt-2 w-full px-2">
                      <input
                        onChange={async (e) => {
                          setUsername(e.target.value);
                        }}
                        type="text"
                        className="h-10 w-full border-2 rounded-lg text-center"
                        placeholder="Username"
                      />
                    </div>
                    <div className="mt-3">
                      {collection && username ? (
                        <ButtonBlue
                          text="Verify"
                          onClick={async () => {
                            const sig = await wallet.signMessage(
                              Buffer.from(collection)
                            );
                            await toast.promise(
                              updateDb(
                                Buffer.from(sig).toString("hex"),
                                collection,
                                username,
                                wallet.publicKey.toBuffer().toString("hex")
                              ),
                              {
                                loading: <b>Verifying NFTs</b>,
                                success: <b>Success</b>,
                                error: (
                                  <b>
                                    Try again and make sure you own an NFT for
                                    the collection specified
                                  </b>
                                ),
                              }
                            );
                          }}
                        />
                      ) : (
                        <ButtonBlueDisabled text="Verify" />
                      )}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Minecraft;
