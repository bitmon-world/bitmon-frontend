import { FC, useCallback, useEffect, useState } from "react";
import ReactGA from "react-ga4";
import Image from "next/image";
import { ButtonBlue, ButtonBlueDisabled } from "../Button";
import { Loader } from "../Loader";
import { mergeTraits } from "../../functions/merge-images";
import { useWallet } from "@solana/wallet-adapter-react";
import { upload } from "../../functions/upload";
import { clusterApiUrl } from "@solana/web3.js";
import { createConnectionConfig } from "@nfteyez/sol-rayz";
import { sendSignedTransaction } from "../../functions/sendTransaction";
import { FEMALE_CLOTHES, MALE_CLOTHES } from "../../constants/traits/clothes";
import { BODY_COLOR } from "../../constants/traits/body";
import { MOUTH } from "../../constants/traits/mouth";
import { EYE, EYE_COLOR } from "../../constants/traits/eye";
import { EYEBROW } from "../../constants/traits/eyebrow";
import { NOSE } from "../../constants/traits/nose";
import {
  BACK_HAIR,
  BEARD,
  HAIR,
  HAIR_COLOR,
} from "../../constants/traits/hair";
import { ACCESSORY } from "../../constants/traits/accessory";
import { BACKGROUND } from "../../constants/traits/background";
import { BodyTypeSelector } from "./BodyTypeSelector";
import { FACE_ACCESSORY } from "../../constants/traits/face-accessory";
import { GLASSES } from "../../constants/traits/glasses";
import { TrainerAttributes, TrainerBuiltImage } from "./BuiltImage";
import { Popover, Transition } from "@headlessui/react";
import {
  ATTRIBUTES_AMOUNT,
  ATTRIBUTES_INDEX,
  ATTRIBUTES_PREFIX,
} from "../../constants";

export const TrainerBuilder: FC<{
  attributes: TrainerAttributes;
  setAttributes: (data: TrainerAttributes) => void;
  toggleTitle: (toggle: boolean) => void;
  mint: string | string[];
}> = ({ attributes, setAttributes, toggleTitle, mint }) => {
  const [selected, setSelected] = useState<ATTRIBUTES_INDEX>(
    ATTRIBUTES_INDEX.BODY_COLOR
  );

  const url =
    process.env.NEXT_PUBLIC_SOLANA_RPC || clusterApiUrl("mainnet-beta");
  const connect = createConnectionConfig(url);

  function random() {
    const clothes =
      attributes.body_type === "female" ? FEMALE_CLOTHES : MALE_CLOTHES;

    const randomAttributes: TrainerAttributes = {
      body_type: attributes.body_type,
      body_color: randomIntFromInterval(
        1,
        Object.keys(BODY_COLOR).length
      ).toString(),

      mouth: randomIntFromInterval(1, Object.keys(MOUTH).length).toString(),
      eye: randomIntFromInterval(1, Object.keys(EYE).length).toString(),
      eye_color: randomIntFromInterval(
        1,
        Object.keys(EYE_COLOR).length
      ).toString(),
      eyebrow: randomIntFromInterval(1, Object.keys(EYEBROW).length).toString(),
      nose: randomIntFromInterval(1, Object.keys(NOSE).length).toString(),
      hair: randomIntFromInterval(1, Object.keys(HAIR).length).toString(),
      back_hair: randomIntFromInterval(
        1,
        Object.keys(BACK_HAIR).length
      ).toString(),
      back_hair_color: randomIntFromInterval(
        1,
        Object.keys(HAIR_COLOR).length
      ).toString(),
      hair_color: randomIntFromInterval(
        1,
        Object.keys(HAIR_COLOR).length
      ).toString(),
      beard: randomIntFromInterval(1, Object.keys(BEARD).length).toString(),
      beard_color: randomIntFromInterval(
        1,
        Object.keys(HAIR_COLOR).length
      ).toString(),
      accessory: randomIntFromInterval(
        1,
        Object.keys(ACCESSORY).length
      ).toString(),
      face_accessory: randomIntFromInterval(
        1,
        Object.keys(FACE_ACCESSORY).length
      ).toString(),
      clothes: randomIntFromInterval(1, Object.keys(clothes).length).toString(),
      background: randomIntFromInterval(
        1,
        Object.keys(BACKGROUND).length
      ).toString(),
      glasses: randomIntFromInterval(1, Object.keys(GLASSES).length).toString(),
    };

    setAttributes(randomAttributes);
  }

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const [finish, setFinish] = useState<boolean>(false);
  const [building, setBuilding] = useState<boolean>(false);
  const [builtImg, setBuiltImg] = useState<string>("");

  const merge_images = useCallback(
    async (attr) => {
      setBuilding(true);
      const image = await mergeTraits(attr);
      setBuiltImg(image);
      setBuilding(false);
    },
    [attributes]
  );

  useEffect(() => {
    if (!finish) return;
    merge_images(attributes);
  }, [finish, attributes]);

  const wallet = useWallet();

  const [uploading, setUploading] = useState(false);

  const [finishUpload, setFinishUpload] = useState({
    finished: false,
    success: false,
  });

  async function uploadAttributes(wallet, attributes) {
    setUploading(true);
    const address = wallet.publicKey.toBase58();
    const sig = await wallet.signMessage(Buffer.from(address));
    const response = await upload(
      attributes,
      wallet.publicKey.toString(),
      wallet.publicKey.toBuffer().toString("hex"),
      Buffer.from(sig).toString("hex"),
      mint
    );
    ReactGA.event({
      category: "Upload",
      action: "UploadAttributes",
      label: "UploadAttributes",
      value: response.success ? 1 : 0,
    });
    const tx = await wallet.signTransaction(response.data);
    const broadcast = await sendSignedTransaction({
      signedTransaction: tx,
      connection: connect,
    });
    setFinishUpload({
      finished: true,
      success: broadcast.txid !== "" && broadcast.slot !== 0,
    });
    setUploading(false);
  }

  async function setAttribute(key: string, value: string) {
    const newAttributes = Object.assign({}, attributes);
    newAttributes[key] = value;
    setAttributes(newAttributes);
  }

  function renderAttributes(selected: ATTRIBUTES_INDEX): any {
    switch (selected) {
      case ATTRIBUTES_INDEX.BODY_COLOR:
        return Object.keys(BODY_COLOR).map((i) => {
          return (
            <div
              key={i}
              className="flex flex-row items-center justify-center h-32 w-32 mx-auto"
            >
              <button onClick={() => setAttribute("body_color", i)}>
                <svg width="100" height="100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="white"
                    strokeWidth="4"
                    fill={BODY_COLOR[i]}
                  />
                </svg>
              </button>
            </div>
          );
        });
      case ATTRIBUTES_INDEX.MOUTH:
      case ATTRIBUTES_INDEX.NOSE:
      case ATTRIBUTES_INDEX.EYEBROW:
      case ATTRIBUTES_INDEX.FACE_ACCESSORY:
      case ATTRIBUTES_INDEX.GLASSES:
        const attributes = [];
        for (let i = 1; i <= ATTRIBUTES_AMOUNT[selected]; i++) {
          attributes.push(
            <div
              key={i}
              className="flex flex-row items-center justify-center mx-auto bg-attribute-background bg-no-repeat bg-center h-[150px] w-[220px]"
            >
              <button
                className="h-[150px] w-[220px] overflow-hidden"
                onClick={() =>
                  setAttribute(ATTRIBUTES_PREFIX[selected], i.toString())
                }
              >
                <div className="relative h-[200px] w-[220px] -mt-8">
                  <div>
                    <Image
                      className="object-crop"
                      src={
                        "/traits/" +
                        ATTRIBUTES_PREFIX[selected] +
                        "/" +
                        i.toString() +
                        ".png"
                      }
                      width={300}
                      height={300}
                    />
                  </div>
                </div>
              </button>
            </div>
          );
        }
        return attributes;
      case ATTRIBUTES_INDEX.BACKGROUND:
        const backgrounds = [];
        for (let i = 1; i <= ATTRIBUTES_AMOUNT[selected]; i++) {
          backgrounds.push(
            <div
              key={i}
              className="flex flex-row items-center justify-center mx-auto bg-attribute-background bg-no-repeat bg-center h-[150px] w-[220px]"
            >
              <button
                className="h-[150px] w-[220px] overflow-hidden"
                onClick={() =>
                  setAttribute(ATTRIBUTES_PREFIX[selected], i.toString())
                }
              >
                <div className="relative h-[200px] w-[220px] mt-6">
                  <div>
                    <Image
                      className="object-crop"
                      src={
                        "/traits/" +
                        ATTRIBUTES_PREFIX[selected] +
                        "/" +
                        i.toString() +
                        ".png"
                      }
                      width={100}
                      height={100}
                    />
                  </div>
                </div>
              </button>
            </div>
          );
        }
        return backgrounds;
      case ATTRIBUTES_INDEX.ACCESSORY:
        const accessories = [];
        for (let i = 1; i <= ATTRIBUTES_AMOUNT[selected]; i++) {
          accessories.push(
            <div
              key={i}
              className="flex flex-row items-center justify-center mx-auto bg-attribute-background bg-no-repeat bg-center h-[150px] w-[220px]"
            >
              <button
                className="h-[150px] w-[220px] overflow-hidden"
                onClick={() =>
                  setAttribute(ATTRIBUTES_PREFIX[selected], i.toString())
                }
              >
                <div className="relative h-[200px] w-[220px]">
                  <div>
                    <Image
                      className="object-crop"
                      src={
                        "/traits/" +
                        ATTRIBUTES_PREFIX[selected] +
                        "/" +
                        i.toString() +
                        ".png"
                      }
                      width={300}
                      height={300}
                    />
                  </div>
                </div>
              </button>
            </div>
          );
        }
        return accessories;
      default:
        return <div />;
    }
  }

  return !attributes.body_type ? (
    <BodyTypeSelector setAttribute={setAttribute} toggleTitle={toggleTitle} />
  ) : finish ? (
    building ? (
      <div>
        <div className="flex flex-row items-center justify-center bg-contain bg-no-repeat bg-center bg-title-background h-[48px] mx-auto">
          <div className="flex flex-row items-center items-center mx-auto">
            <div className="text-xl">
              <span className="text-white">
                Building your trainer{" "}
                <span className="text-orange">attributes</span>
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center mx-auto mt-10">
          <Loader />
        </div>
      </div>
    ) : (
      <div>
        <div className="flex flex-row items-center justify-between bg-contain bg-no-repeat bg-center bg-title-background h-[48px] mx-auto">
          <div className="flex flex-row items-center gap-x-10 items-center mx-auto">
            <div>
              <span
                className="bg-orange text-white text-4xl md:text-6xl"
                style={{ fontFamily: "Candal" }}
              >
                03
              </span>{" "}
            </div>
            <div className="text-xl">
              <span className="text-white">
                Upload your <span className="text-orange">attributes</span>
              </span>
            </div>
          </div>
        </div>
        {builtImg !== "" && (
          <>
            <div className="mt-10 flex flex-row items-center justify-center w-[300px] h-[300px] mx-auto">
              <Image
                className="rounded-lg"
                src={builtImg}
                width={500}
                height={500}
              />
            </div>
            {finishUpload.finished && finishUpload.success ? (
              <>
                <div className="text-center mt-5 bg-green py-2 px-4 text-white w-64 mx-auto">
                  <h1 style={{ fontFamily: "Candal" }}>Upload successful</h1>
                </div>
                <div className="text-center mt-2 mx-auto">
                  <h1>Your image will take some time to load</h1>
                </div>
              </>
            ) : (
              <div className="text-center mt-5">
                {uploading ? (
                  <Loader />
                ) : (
                  <>
                    <ButtonBlue
                      text={"Upload"}
                      onClick={async () => {
                        await uploadAttributes(wallet, attributes);
                      }}
                    />
                    {finishUpload.finished && !finishUpload.success && (
                      <>
                        <div className="text-center mt-5 bg-orange py-2 px-4 text-white w-64 mx-auto">
                          <h1 style={{ fontFamily: "Candal" }}>
                            Upload failed
                          </h1>
                        </div>
                        <div className="text-center mt-2 mx-auto">
                          <h1>Try again</h1>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            )}
          </>
        )}
      </div>
    )
  ) : (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-5 w-4/5 mx-auto mt-12">
        <TrainerBuiltImage attributes={attributes} />
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
                  if (selected === ATTRIBUTES_INDEX.BODY_COLOR) return;
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
                  onClick={() => setSelected(ATTRIBUTES_INDEX.BODY_COLOR)}
                >
                  {selected === ATTRIBUTES_INDEX.BODY_COLOR ? (
                    <Image
                      src="/icons/builder/body-color-selected.svg"
                      width="50px"
                      height="50px"
                    />
                  ) : (
                    <Image
                      src="/icons/builder/body-color.svg"
                      width="40px"
                      height="40px"
                    />
                  )}
                </button>
              </div>
              <div>
                <button onClick={() => setSelected(ATTRIBUTES_INDEX.MOUTH)}>
                  {selected === ATTRIBUTES_INDEX.MOUTH ? (
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
                <button onClick={() => setSelected(ATTRIBUTES_INDEX.EYE)}>
                  {selected === ATTRIBUTES_INDEX.EYE ? (
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
                <button onClick={() => setSelected(ATTRIBUTES_INDEX.EYEBROW)}>
                  {selected === ATTRIBUTES_INDEX.EYEBROW ? (
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
                <button onClick={() => setSelected(ATTRIBUTES_INDEX.NOSE)}>
                  {selected === ATTRIBUTES_INDEX.NOSE ? (
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
                <button onClick={() => setSelected(ATTRIBUTES_INDEX.HAIR)}>
                  {selected === ATTRIBUTES_INDEX.HAIR ? (
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
                <button onClick={() => setSelected(ATTRIBUTES_INDEX.BACK_HAIR)}>
                  {selected === ATTRIBUTES_INDEX.BACK_HAIR ? (
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
                <button onClick={() => setSelected(ATTRIBUTES_INDEX.BEARD)}>
                  {selected === ATTRIBUTES_INDEX.BEARD ? (
                    <Image
                      src="/icons/builder/beard-selected.svg"
                      width="50px"
                      height="50px"
                    />
                  ) : (
                    <Image
                      src="/icons/builder/beard.svg"
                      width="40px"
                      height="40px"
                    />
                  )}
                </button>
              </div>
              <div>
                <button onClick={() => setSelected(ATTRIBUTES_INDEX.ACCESSORY)}>
                  {selected === ATTRIBUTES_INDEX.ACCESSORY ? (
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
                <button
                  onClick={() => setSelected(ATTRIBUTES_INDEX.FACE_ACCESSORY)}
                >
                  {selected === ATTRIBUTES_INDEX.FACE_ACCESSORY ? (
                    <Image
                      src="/icons/builder/face-accessories-selected.svg"
                      width="50px"
                      height="50px"
                    />
                  ) : (
                    <Image
                      src="/icons/builder/face-accessories.svg"
                      width="40px"
                      height="40px"
                    />
                  )}
                </button>
              </div>
              <div>
                <button onClick={() => setSelected(ATTRIBUTES_INDEX.CLOTHES)}>
                  {selected === ATTRIBUTES_INDEX.CLOTHES ? (
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
                <button onClick={() => setSelected(ATTRIBUTES_INDEX.GLASSES)}>
                  {selected === ATTRIBUTES_INDEX.GLASSES ? (
                    <Image
                      src="/icons/builder/glasses-selected.svg"
                      width="50px"
                      height="50px"
                    />
                  ) : (
                    <Image
                      src="/icons/builder/glasses.svg"
                      width="40px"
                      height="40px"
                    />
                  )}
                </button>
              </div>
              <div>
                <button
                  onClick={() => setSelected(ATTRIBUTES_INDEX.BACKGROUND)}
                >
                  {selected === ATTRIBUTES_INDEX.BACKGROUND ? (
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
                  if (selected === ATTRIBUTES_INDEX.BACKGROUND) return;
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
            <div className="relative bg-white/30 rounded-lg h-[400px] mt-5 overflow-y-scroll z-20">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {renderAttributes(selected)}
              </div>
            </div>
            <div className="flex flex-row justify-end gap-x-3 mt-5">
              {selected === ATTRIBUTES_INDEX.HAIR ||
              selected === ATTRIBUTES_INDEX.BACK_HAIR ||
              selected === ATTRIBUTES_INDEX.BEARD ||
              selected === ATTRIBUTES_INDEX.EYE ? (
                <Popover>
                  <div>
                    <div className={"w-26 mx-auto"}>
                      <Popover.Button
                        className={
                          "text-white text-xl uppercase relative w-full"
                        }
                      >
                        <div className="flex flex-row items-center justify-center">
                          <Image
                            src="/icons/builder/color-selector.svg"
                            width="41"
                            height="41"
                          />
                        </div>
                      </Popover.Button>
                    </div>
                  </div>
                  <Popover.Panel className="absolute z-10">
                    <Transition
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <div className="relative bg-white/30 rounded-lg h-[400px] mt-5 overflow-y-scroll z-20">
                        <div className="grid grid-cols-1 md:grid-cols-3">
                          {selected === ATTRIBUTES_INDEX.HAIR &&
                            Object.keys(HAIR_COLOR).map((i) => {
                              return (
                                <div
                                  key={i}
                                  className="flex flex-row items-center justify-center h-32 w-32 mx-auto"
                                >
                                  <button
                                    onClick={() =>
                                      setAttribute("hair_color", i)
                                    }
                                  >
                                    <svg width="100" height="100">
                                      <circle
                                        cx="50"
                                        cy="50"
                                        r="40"
                                        stroke="white"
                                        strokeWidth="4"
                                        fill={HAIR_COLOR[i].color}
                                      />
                                    </svg>
                                  </button>
                                </div>
                              );
                            })}
                          {selected === ATTRIBUTES_INDEX.BACK_HAIR &&
                            Object.keys(HAIR_COLOR).map((i) => {
                              return (
                                <div
                                  key={i}
                                  className="flex flex-row items-center justify-center h-32 w-32 mx-auto"
                                >
                                  <button
                                    onClick={() =>
                                      setAttribute("back_hair_color", i)
                                    }
                                  >
                                    <svg width="100" height="100">
                                      <circle
                                        cx="50"
                                        cy="50"
                                        r="40"
                                        stroke="white"
                                        strokeWidth="4"
                                        fill={HAIR_COLOR[i].color}
                                      />
                                    </svg>
                                  </button>
                                </div>
                              );
                            })}
                          {selected === ATTRIBUTES_INDEX.BEARD &&
                            Object.keys(HAIR_COLOR).map((i) => {
                              return (
                                <div
                                  key={i}
                                  className="flex flex-row items-center justify-center h-32 w-32 mx-auto"
                                >
                                  <button
                                    onClick={() =>
                                      setAttribute("beard_color", i)
                                    }
                                  >
                                    <svg width="100" height="100">
                                      <circle
                                        cx="50"
                                        cy="50"
                                        r="40"
                                        stroke="white"
                                        strokeWidth="4"
                                        fill={HAIR_COLOR[i].color}
                                      />
                                    </svg>
                                  </button>
                                </div>
                              );
                            })}
                          {selected === ATTRIBUTES_INDEX.EYE &&
                            Object.keys(EYE_COLOR).map((i) => {
                              return (
                                <div
                                  key={i}
                                  className="flex flex-row items-center justify-center h-32 w-32 mx-auto"
                                >
                                  <button
                                    onClick={() => setAttribute("eye_color", i)}
                                  >
                                    <svg width="100" height="100">
                                      <circle
                                        cx="50"
                                        cy="50"
                                        r="40"
                                        stroke="white"
                                        strokeWidth="4"
                                        fill={EYE_COLOR[i].color}
                                      />
                                    </svg>
                                  </button>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </Transition>
                  </Popover.Panel>
                </Popover>
              ) : (
                <div />
              )}
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
                    onClick={() => random()}
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
                        accessory: null,
                        face_accessory: null,
                        back_hair: null,
                        back_hair_color: null,
                        background: null,
                        clothes: null,
                        eyebrow: null,
                        eye: null,
                        eye_color: null,
                        hair_color: null,
                        hair: null,
                        mouth: null,
                        nose: null,
                        body_color: null,
                        beard: null,
                        beard_color: null,
                        glasses: null,
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
                {attributes.body_type &&
                attributes.body_color &&
                attributes.mouth &&
                attributes.eye &&
                attributes.eyebrow &&
                attributes.nose &&
                attributes.clothes &&
                attributes.background ? (
                  <ButtonBlue text="Finish" onClick={() => setFinish(true)} />
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
