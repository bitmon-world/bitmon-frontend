import Image from "next/image";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Loader, LoaderSmall } from "../Loader";
import { ButtonBlue, ButtonBlueDisabled, ButtonOrange } from "../Button";
import { mintOneToken } from "../../functions/candy-machine";
import { useWallet } from "@solana/wallet-adapter-react";
import { FC, useState } from "react";
import { GatewayStatus, useGateway } from "@civic/solana-gateway-react";

export const MintPage: FC<{ candyMachine }> = ({ candyMachine }) => {
  const wallet = useWallet();

  const [minting, setMinting] = useState(false);

  const { requestGatewayToken, gatewayStatus } = useGateway();

  return (
    <div className="relative z-10 mx-4 h-full pb-10">
      <div className="pt-8 text-center flex flex-row justify-center items-center gap-x-10">
        <div className="hidden md:inline-flex ml-10">
          <Image
            src="/img/separator-right.svg"
            width="250"
            height="17"
            alt="Bitmon Separator"
          />
        </div>
        <div>
          <h1
            className="text-5xl text-light-orange"
            style={{ fontFamily: "Candal" }}
          >
            Start now
          </h1>
          <h1 className="text-2xl" style={{ fontFamily: "Candal" }}>
            Enter the Bitmon World
          </h1>
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
      <div className="text-center mt-10 justify-center">
        <Image
          className="rounded-lg"
          src="/img/unknown-trainer.png"
          width="250"
          height="250"
          alt="Bitmon Unknown Trainer"
        />
        <h1 className="text-xl mt-6">
          Start your journey minting a Bitmon Trainer!
        </h1>
        <p className="text-md mt-2">
          Bitmon trainers can be customized and the first generation will
          receive a ticket to mint the first Bitmons.
        </p>
        {candyMachine ? (
          <>
            <h1 className="text-lg mt-4">
              Mint Price:{" "}
              {candyMachine.state.price.toNumber() / LAMPORTS_PER_SOL}
            </h1>
            <h1 className="text-lg">
              {candyMachine.state.itemsRedeemed} / 10000 Trainers Minted
            </h1>
          </>
        ) : (
          <div className="mt-4">
            <Loader />
          </div>
        )}
        <div className="mt-5 mx-auto">
          {!wallet ||
          !wallet.connected ||
          !wallet.publicKey ||
          !candyMachine ||
          !candyMachine.program.provider.wallet ? (
            <ButtonBlueDisabled text={"Connect wallet"} />
          ) : minting ? (
            <LoaderSmall />
          ) : (
            <ButtonBlue
              text={"Mint"}
              onClick={async () => {
                setMinting(true);
                await mintOneToken(candyMachine, wallet.publicKey);
                setMinting(false);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
