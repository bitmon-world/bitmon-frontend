import { FC } from "react";
import Image from "next/image";

export interface TrainerAttributes {
  body_type: "male" | "female" | null;
  body_color: string | null;
}

export const TrainerBuilder: FC<{
  attributes: TrainerAttributes;
  setAttributes: (data: TrainerAttributes) => void;
}> = ({ attributes, setAttributes }) => {
  return !attributes.body_type ? (
    <div>
      <div className="flex flex-row items-center justify-between bg-contain bg-no-repeat bg-center bg-title-background h-[54px] mx-auto">
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
          onClick={() =>
            setAttributes({ body_type: "female", body_color: null })
          }
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
          onClick={() => setAttributes({ body_type: "male", body_color: null })}
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
  ) : (
    <div>
      <div className="flex flex-row items-center justify-between bg-contain bg-no-repeat bg-center bg-title-background h-[48px] mx-auto">
        <div className="flex flex-row items-center gap-x-10 items-center mx-auto">
          <div>
            <span
              className="bg-orange text-white text-6xl"
              style={{ fontFamily: "Candal" }}
            >
              02
            </span>{" "}
          </div>
          <div className="text-2xl">
            <span className="text-white">
              Choose your <span className="text-orange">attributes</span>
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-5 w-2/3 mx-auto mt-8">
        <div>
          {!attributes.body_color ? (
            attributes.body_type === "male" ? (
              <Image
                className={"rounded-lg"}
                src="/img/male-body.png"
                width="300"
                height="338"
                alt={"Bitmon Trainer Male Body"}
              />
            ) : (
              <Image
                className={"rounded-lg"}
                src="/img/female-body.png"
                width="300"
                height="338"
                alt={"Bitmon Trainer Female Body"}
              />
            )
          ) : (
            <div />
          )}
        </div>
        <div>
          <div></div>
          <div className="bg-white rounded-lg">
            <div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
