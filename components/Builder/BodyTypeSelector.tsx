import Image from "next/image";
import { FC } from "react";

export const BodyTypeSelector: FC<{
  setAttribute: (key: string, value: string) => void;
  toggleTitle: (boolean) => void;
}> = ({ setAttribute, toggleTitle }) => {
  return (
    <div>
      <div className="relative z-20 flex flex-row items-center justify-between bg-contain bg-no-repeat bg-center bg-title-background h-[54px] mx-auto">
        <div className="flex flex-row items-center gap-x-10 items-center mx-auto">
          <div>
            <span
              className="bg-orange text-white text-6xl"
              style={{ fontFamily: "Candal" }}
            >
              01
            </span>{" "}
          </div>
          <div className="text-2xl">
            <span className="text-white">
              Choose your <span className="text-orange">appearance</span>
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 w-2/4 mx-auto mt-8">
        <button
          onClick={() => {
            setAttribute("body_type", "female");
            toggleTitle(false);
          }}
        >
          <div className="flex items-center justify-center cursor-pointer hover:drop-shadow-lg hover:shadow-black">
            <Image
              className={"rounded-lg"}
              src="/img/female-body.png"
              width="300"
              height="338"
              alt={"Bitmon Trainer Female Body"}
            />
          </div>
        </button>
        <button
          onClick={() => {
            setAttribute("body_type", "male");
            toggleTitle(false);
          }}
        >
          <div className="flex items-center justify-center cursor-pointer hover:drop-shadow-lg hover:shadow-black">
            <Image
              className={"rounded-lg"}
              src="/img/male-body.png"
              width="300"
              height="338"
              alt={"Bitmon Trainer Male Body"}
            />
          </div>
        </button>
      </div>
    </div>
  );
};
