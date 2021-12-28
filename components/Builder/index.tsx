import { FC, useState } from "react";
import Image from "next/image";
import { ButtonBlue, ButtonBlueDisabled } from "../Button";
import { BODY_COLORS } from "../../constants";
import { classNames } from "../../functions/classnames";

export interface TrainerAttributes {
  body_type: "male" | "female" | null;
  body_color: string | null;
}

enum AttributeSelection {
  BodyColor,
  Mouth,
  Eyes,
  Eyebrows,
  Nose,
  Hair,
  BackHair,
  Accessory,
  Clothes,
  Background,
}

export const TrainerBuilder: FC<{
  attributes: TrainerAttributes;
  setAttributes: (data: TrainerAttributes) => void;
  toggleTitle: (toggle: boolean) => void;
}> = ({ attributes, setAttributes, toggleTitle }) => {
  const [selected, setSelected] = useState<AttributeSelection>(
    AttributeSelection.BodyColor
  );

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
          onClick={() => {
            setAttributes({ body_type: "female", body_color: null });
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
            setAttributes({ body_type: "male", body_color: null });
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
  ) : (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-5 w-4/5 mx-auto mt-12">
        <div className="flex flex-row justify-center md:mt-20 max-h-[338px] items-center">
          {!attributes.body_color ? (
            attributes.body_type === "male" ? (
              <Image
                className={"rounded-lg mt-10"}
                src="/img/male-body.png"
                width="300"
                height="338"
                alt={"Bitmon Trainer Male Body"}
              />
            ) : (
              <Image
                className={"rounded-lg mt-10"}
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
        <div className="col-span-2">
          <div>
            <div className="flex flex-row items-center justify-between bg-contain bg-no-repeat bg-center bg-title-background h-[48px] mx-auto">
              <div className="flex flex-row items-center gap-x-10 items-center mx-auto">
                <div>
                  <span
                    className="bg-orange text-white text-4xl md:text-6xl"
                    style={{ fontFamily: "Candal" }}
                  >
                    02
                  </span>{" "}
                </div>
                <div className="text-xl">
                  <span className="text-white">
                    Choose your <span className="text-orange">attributes</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-x-2 mt-7 items-center justify-center">
              <button
                onClick={() => {
                  if (selected === AttributeSelection.BodyColor) return;
                  setSelected(selected - 1);
                }}
              >
                <Image
                  src="/icons/builder/builder-left-arrow.svg"
                  width="30px"
                  height="30px"
                />
              </button>
              <div>
                <button
                  onClick={() => setSelected(AttributeSelection.BodyColor)}
                >
                  {selected === AttributeSelection.BodyColor ? (
                    <Image
                      src="/icons/builder/skin-color-selected.svg"
                      width="50px"
                      height="50px"
                    />
                  ) : (
                    <Image
                      src="/icons/builder/skin-color.svg"
                      width="40px"
                      height="40px"
                    />
                  )}
                </button>
              </div>
              <div>
                <button onClick={() => setSelected(AttributeSelection.Mouth)}>
                  {selected === AttributeSelection.Mouth ? (
                    <Image
                      src="/icons/builder/mouth-selected.svg"
                      width="50px"
                      height="50px"
                    />
                  ) : (
                    <Image
                      src="/icons/builder/mouth.svg"
                      width="40px"
                      height="40px"
                    />
                  )}
                </button>
              </div>
              <div>
                <button onClick={() => setSelected(AttributeSelection.Eyes)}>
                  {selected === AttributeSelection.Eyes ? (
                    <Image
                      src="/icons/builder/eyes-selected.svg"
                      width="50px"
                      height="50px"
                    />
                  ) : (
                    <Image
                      src="/icons/builder/eyes.svg"
                      width="40px"
                      height="40px"
                    />
                  )}
                </button>
              </div>
              <div>
                <button
                  onClick={() => setSelected(AttributeSelection.Eyebrows)}
                >
                  {selected === AttributeSelection.Eyebrows ? (
                    <Image
                      src="/icons/builder/eyebrows-selected.svg"
                      width="50px"
                      height="50px"
                    />
                  ) : (
                    <Image
                      src="/icons/builder/eyebrows.svg"
                      width="40px"
                      height="40px"
                    />
                  )}
                </button>
              </div>
              <div>
                <button onClick={() => setSelected(AttributeSelection.Nose)}>
                  {selected === AttributeSelection.Nose ? (
                    <Image
                      src="/icons/builder/nose-selected.svg"
                      width="50px"
                      height="50px"
                    />
                  ) : (
                    <Image
                      src="/icons/builder/nose.svg"
                      width="40px"
                      height="40px"
                    />
                  )}
                </button>
              </div>
              <div>
                <button onClick={() => setSelected(AttributeSelection.Hair)}>
                  {selected === AttributeSelection.Hair ? (
                    <Image
                      src="/icons/builder/hair-selected.svg"
                      width="50px"
                      height="50px"
                    />
                  ) : (
                    <Image
                      src="/icons/builder/hair.svg"
                      width="40px"
                      height="40px"
                    />
                  )}
                </button>
              </div>
              <div>
                <button
                  onClick={() => setSelected(AttributeSelection.BackHair)}
                >
                  {selected === AttributeSelection.BackHair ? (
                    <Image
                      src="/icons/builder/back-hair-selected.svg"
                      width="50px"
                      height="50px"
                    />
                  ) : (
                    <Image
                      src="/icons/builder/back-hair.svg"
                      width="40px"
                      height="40px"
                    />
                  )}
                </button>
              </div>
              <div>
                <button
                  onClick={() => setSelected(AttributeSelection.Accessory)}
                >
                  {selected === AttributeSelection.Accessory ? (
                    <Image
                      src="/icons/builder/accessories-selected.svg"
                      width="50px"
                      height="50px"
                    />
                  ) : (
                    <Image
                      src="/icons/builder/accessories.svg"
                      width="40px"
                      height="40px"
                    />
                  )}
                </button>
              </div>
              <div>
                <button onClick={() => setSelected(AttributeSelection.Clothes)}>
                  {selected === AttributeSelection.Clothes ? (
                    <Image
                      src="/icons/builder/clothes-selected.svg"
                      width="50px"
                      height="50px"
                    />
                  ) : (
                    <Image
                      src="/icons/builder/clothes.svg"
                      width="40px"
                      height="40px"
                    />
                  )}
                </button>
              </div>
              <div>
                <button
                  onClick={() => setSelected(AttributeSelection.Background)}
                >
                  {selected === AttributeSelection.Background ? (
                    <Image
                      src="/icons/builder/background-selected.svg"
                      width="50px"
                      height="50px"
                    />
                  ) : (
                    <Image
                      src="/icons/builder/background.svg"
                      width="40px"
                      height="40px"
                    />
                  )}
                </button>
              </div>
              <button
                onClick={() => {
                  if (selected === AttributeSelection.Background) return;
                  setSelected(selected + 1);
                }}
              >
                <Image
                  src="/icons/builder/builder-right-arrow.svg"
                  width="30px"
                  height="30px"
                />
              </button>
            </div>
            <div className="bg-white/30 rounded-lg h-[400px] mt-5 overflow-y-scrollable">
              <div className="grid grid-cols-2 md:grid-cols-3">
                {Object.keys(BODY_COLORS).map((i) => {
                  const color = "bg-[" + BODY_COLORS[i].color + "]";
                  return (
                    <div
                      key={i}
                      className={classNames(
                        "p-5 h-20 w-20 rounded-full border-4 border-white",
                        color
                      )}
                    />
                  );
                })}
              </div>
            </div>
            <div className="flex flex-row justify-end gap-x-3 mt-5">
              <div>
                <div
                  className={
                    "w-22 mx-auto rounded-full border-2 shadow shadow-orange bg-orange border-orange"
                  }
                >
                  <button
                    className={
                      "px-1 py-1 text-white text-xl uppercase border-2 border-black rounded-full relative w-full"
                    }
                  >
                    <div className="flex flex-row items-center justify-center">
                      <Image
                        src="/icons/builder/dice.svg"
                        width="25"
                        height="25"
                      />
                    </div>
                  </button>
                </div>
              </div>
              <div>
                <div
                  className={
                    "w-22 mx-auto rounded-full border-2 shadow shadow-orange bg-orange border-orange"
                  }
                >
                  <button
                    className={
                      "px-1 py-1 text-white text-xl uppercase border-2 border-black rounded-full relative w-full"
                    }
                    onClick={() =>
                      setAttributes({
                        body_type: attributes.body_type,
                        body_color: null,
                      })
                    }
                  >
                    <div className="flex flex-row items-center justify-center">
                      <Image
                        src="/icons/builder/restart.svg"
                        width="25"
                        height="25"
                      />
                    </div>
                  </button>
                </div>
              </div>
              <div>
                {attributes.body_type && attributes.body_color ? (
                  <ButtonBlue
                    text="Finish"
                    onClick={() => console.log("finish")}
                  />
                ) : (
                  <ButtonBlueDisabled text={"Finish"} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
