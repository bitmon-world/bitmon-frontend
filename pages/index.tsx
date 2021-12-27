import Image from "next/image";
import { ButtonBlue } from "../components/Button";

export default function Home(): JSX.Element {
  return (
    <div className="relative z-10 mx-4 h-full">
      <div className="pt-16 text-center flex flex-row justify-center items-center gap-x-10">
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
        <h1 className="text-xl mt-12">
          Start your journey minting a Bitmon Trainer!
        </h1>
        <p className="text-md mt-2">
          Bitmon trainers can be customized and the first generation will
          receive a ticket to mint the first Bitmons.
        </p>
        <h1 className="text-lg mt-4">0/10000 Trainers Minted</h1>
        <div className="mt-5">
          <ButtonBlue text={"Mint"} onClick={() => console.log("minted")} />
        </div>
      </div>
    </div>
  );
  
}
