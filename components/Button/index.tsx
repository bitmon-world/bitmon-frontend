import Image from "next/image";
import { FC } from "react";
import { Loader } from "../Loader";

export const ButtonBlue: FC<{
  text: string;
  onClick: () => void;
}> = ({ text, onClick }) => {
  return (
    <div
      className={
        "w-40 mx-auto rounded-full border-2 shadow shadow-blue bg-blue border-blue"
      }
    >
      <button
        className={
          "py-1 px-6 text-white text-xl uppercase border-2 border-black rounded-full relative w-full"
        }
        onClick={() => onClick()}
      >
        <div className="flex flex-row items-center justify-center">
          <div>
            <h1>{text}</h1>
          </div>
          <div className="absolute top-0 right-0 opacity-10">
            <Image src="/icons/bitmon-icon-white.svg" height="40" width="40" />
          </div>
        </div>
      </button>
    </div>
  );
};

export const ButtonGreen: FC<{
  text: string;
  onClick: () => void;
}> = ({ text, onClick }) => {
  return (
    <div
      className={
        "w-40 mx-auto rounded-full border-2 shadow shadow-blue bg-green border-green"
      }
    >
      <button
        className="py-1 px-6 text-white text-xl uppercase border-2 border-black rounded-full relative w-full"
        onClick={() => onClick()}
      >
        <div className="flex flex-row items-center justify-center">
          <div>
            <h1>{text}</h1>
          </div>
          <div className="absolute top-0 right-0 opacity-10">
            <Image src="/icons/bitmon-icon-white.svg" height="40" width="40" />
          </div>
        </div>
      </button>
    </div>
  );
};

export const ButtonOrange: FC<{
  text: string;
  onClick: () => void;
}> = ({ text, onClick }) => {
  return (
    <div
      className={
        "w-42 mx-auto rounded-full border-2 shadow shadow-blue bg-orange border-orange"
      }
    >
      <button
        className="py-1 px-6 text-white text-xl uppercase border-2 border-black rounded-full relative w-full"
        onClick={() => onClick()}
      >
        <div className="flex flex-row items-center justify-center">
          <div>
            <h1>{text}</h1>
          </div>
          <div className="absolute top-0 right-0 opacity-10">
            <Image src="/icons/bitmon-icon-white.svg" height="40" width="40" />
          </div>
        </div>
      </button>
    </div>
  );
};
