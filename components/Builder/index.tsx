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

enum AttributeSelection {
  BODY_COLOR,
  MOUTH,
  EYE,
  EYEBROW,
  NOSE,
  HAIR,
  BACK_HAIR,
  BEARD,
  ACCESSORY,
  FACE_ACCESSORY,
  CLOTHES,
  GLASSES,
  BACKGROUND,
}

export const TrainerBuilder: FC<{
  attributes: TrainerAttributes;
  setAttributes: (data: TrainerAttributes) => void;
  toggleTitle: (toggle: boolean) => void;
  mint: string | string[];
}> = ({ attributes, setAttributes, toggleTitle, mint }) => {
  const [selected, setSelected] = useState<AttributeSelection>(
    AttributeSelection.BODY_COLOR
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
                  if (selected === AttributeSelection.BODY_COLOR) return;
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
                  onClick={() => setSelected(AttributeSelection.BODY_COLOR)}
                >
                  {selected === AttributeSelection.BODY_COLOR ? (
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
                <button onClick={() => setSelected(AttributeSelection.MOUTH)}>
                  {selected === AttributeSelection.MOUTH ? (
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
                <button onClick={() => setSelected(AttributeSelection.EYE)}>
                  {selected === AttributeSelection.EYE ? (
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
                <button onClick={() => setSelected(AttributeSelection.EYEBROW)}>
                  {selected === AttributeSelection.EYEBROW ? (
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
                <button onClick={() => setSelected(AttributeSelection.NOSE)}>
                  {selected === AttributeSelection.NOSE ? (
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
                <button onClick={() => setSelected(AttributeSelection.HAIR)}>
                  {selected === AttributeSelection.HAIR ? (
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
                  onClick={() => setSelected(AttributeSelection.BACK_HAIR)}
                >
                  {selected === AttributeSelection.BACK_HAIR ? (
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
                <button onClick={() => setSelected(AttributeSelection.BEARD)}>
                  {selected === AttributeSelection.BEARD ? (
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
                <button
                  onClick={() => setSelected(AttributeSelection.ACCESSORY)}
                >
                  {selected === AttributeSelection.ACCESSORY ? (
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
                  onClick={() => setSelected(AttributeSelection.FACE_ACCESSORY)}
                >
                  {selected === AttributeSelection.FACE_ACCESSORY ? (
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
                <button onClick={() => setSelected(AttributeSelection.CLOTHES)}>
                  {selected === AttributeSelection.CLOTHES ? (
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
                <button onClick={() => setSelected(AttributeSelection.GLASSES)}>
                  {selected === AttributeSelection.GLASSES ? (
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
                  onClick={() => setSelected(AttributeSelection.BACKGROUND)}
                >
                  {selected === AttributeSelection.BACKGROUND ? (
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
                  if (selected === AttributeSelection.BACKGROUND) return;
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
              <div className="grid grid-cols-1 md:grid-cols-3">
                {selected === AttributeSelection.BODY_COLOR &&
                  Object.keys(BODY_COLOR).map((i) => {
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
                              fill={BODY_COLOR[i].color}
                            />
                          </svg>
                        </button>
                      </div>
                    );
                  })}
                {selected === AttributeSelection.MOUTH &&
                  Object.keys(MOUTH).map((i) => {
                    const image = MOUTH[i].image;
                    return (
                      <button key={i} onClick={() => setAttribute("mouth", i)}>
                        <div className="flex flex-row items-center justify-center mx-auto bg-attribute-background bg-no-repeat bg-center h-[150px] w-[220px]">
                          <Image
                            className="object-cover"
                            src={image}
                            width={400}
                            height={500}
                          />
                        </div>
                      </button>
                    );
                  })}
                {selected === AttributeSelection.EYE &&
                  Object.keys(EYE).map((i) => {
                    const image = EYE[i].image;
                    return (
                      <button key={i} onClick={() => setAttribute("eye", i)}>
                        <div className="flex flex-row items-center justify-center mx-auto bg-attribute-background bg-no-repeat bg-center h-[150px] w-[220px]">
                          <Image
                            className="object-cover"
                            src={image}
                            width={400}
                            height={500}
                          />
                        </div>
                      </button>
                    );
                  })}
                {selected === AttributeSelection.EYEBROW &&
                  Object.keys(EYEBROW).map((i) => {
                    const image = EYEBROW[i].image;
                    return (
                      <button
                        key={i}
                        onClick={() => setAttribute("eyebrow", i)}
                      >
                        <div className="flex flex-row items-center justify-center mx-auto bg-attribute-background bg-no-repeat bg-center h-[150px] w-[220px]">
                          <Image
                            className="object-cover"
                            src={image}
                            width={400}
                            height={500}
                          />
                        </div>
                      </button>
                    );
                  })}
                {selected === AttributeSelection.NOSE &&
                  Object.keys(NOSE).map((i) => {
                    const image = NOSE[i].image;
                    return (
                      <button onClick={() => setAttribute("nose", i)}>
                        <div
                          key={i}
                          className="flex flex-row items-center justify-center mx-auto bg-attribute-background bg-no-repeat bg-center h-[150px] w-[220px]"
                        >
                          <div className="h-[150px] w-[220px] overflow-hidden -mt-24">
                            <Image
                              className="object-cover"
                              src={image}
                              width={400}
                              height={500}
                            />
                          </div>
                        </div>
                      </button>
                    );
                  })}
                {selected === AttributeSelection.HAIR && (
                  <>
                    <button onClick={() => setAttribute("hair", null)}>
                      <div
                        key={"none"}
                        className="flex flex-row items-center justify-center mx-auto bg-attribute-background bg-no-repeat bg-center h-[150px] w-[220px]"
                      >
                        <div className="-mt-6 opacity-80">
                          <Image
                            className="object-cover"
                            src={"/icons/builder/none.svg"}
                            width={75}
                            height={75}
                          />
                        </div>
                      </div>
                    </button>
                    {Object.keys(HAIR).map((i) => {
                      const image = HAIR[i].image;
                      return (
                        <button onClick={() => setAttribute("hair", i)}>
                          <div
                            key={i}
                            className="flex flex-row items-center justify-center mx-auto bg-attribute-background bg-no-repeat bg-center h-[150px] w-[220px]"
                          >
                            <div className="h-[150px] w-[220px] overflow-hidden">
                              <Image
                                className="object-cover"
                                src={image}
                                width={200}
                                height={200}
                              />
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </>
                )}
                {selected === AttributeSelection.BACK_HAIR && (
                  <>
                    <button onClick={() => setAttribute("back_hair", null)}>
                      <div
                        key={"none"}
                        className="flex flex-row items-center justify-center mx-auto bg-attribute-background bg-no-repeat bg-center h-[150px] w-[220px]"
                      >
                        <div className="-mt-6 opacity-80">
                          <Image
                            className="object-cover"
                            src={"/icons/builder/none.svg"}
                            width={75}
                            height={75}
                          />
                        </div>
                      </div>
                    </button>
                    {Object.keys(BACK_HAIR).map((i) => {
                      const image = BACK_HAIR[i].image;
                      return (
                        <button onClick={() => setAttribute("back_hair", i)}>
                          <div
                            key={i}
                            className="flex flex-row items-center justify-center mx-auto bg-attribute-background bg-no-repeat bg-center h-[150px] w-[220px]"
                          >
                            <div className="h-[150px] w-[220px] overflow-hidden">
                              <Image
                                className="object-cover"
                                src={image}
                                width={200}
                                height={200}
                              />
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </>
                )}
                {selected === AttributeSelection.ACCESSORY && (
                  <>
                    <button onClick={() => setAttribute("accessory", null)}>
                      <div
                        key={"none"}
                        className="flex flex-row items-center justify-center mx-auto bg-attribute-background bg-no-repeat bg-center h-[150px] w-[220px]"
                      >
                        <div className="-mt-6 opacity-80">
                          <Image
                            className="object-cover"
                            src={"/icons/builder/none.svg"}
                            width={75}
                            height={75}
                          />
                        </div>
                      </div>
                    </button>
                    {Object.keys(ACCESSORY).map((i) => {
                      const image = ACCESSORY[i].image;
                      return (
                        <button onClick={() => setAttribute("accessory", i)}>
                          <div
                            key={i}
                            className="flex flex-row items-center justify-center mx-auto bg-attribute-background bg-no-repeat bg-center h-[150px] w-[220px]"
                          >
                            <div className="h-[150px] w-[220px] overflow-hidden">
                              <Image
                                className="object-cover"
                                src={image}
                                width={200}
                                height={200}
                              />
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </>
                )}
                {selected === AttributeSelection.CLOTHES &&
                  attributes.body_type === "male" && (
                    <>
                      {Object.keys(MALE_CLOTHES).map((i) => {
                        const image = MALE_CLOTHES[i].image;
                        return (
                          <div
                            key={i}
                            className="flex flex-row items-center justify-center mx-auto bg-attribute-background bg-no-repeat bg-center h-[150px] w-[220px]"
                          >
                            <button
                              className="h-[150px] w-[220px] overflow-hidden"
                              onClick={() => setAttribute("body_color", i)}
                            >
                              <div className="relative h-[150px] w-[220px]">
                                <div className="-mt-44">
                                  <Image
                                    className="object-crop"
                                    src={image}
                                    width={200}
                                    height={200}
                                  />
                                </div>
                              </div>
                            </button>
                          </div>
                        );
                      })}
                    </>
                  )}
                {selected === AttributeSelection.CLOTHES &&
                  attributes.body_type === "female" && (
                    <>
                      {Object.keys(FEMALE_CLOTHES).map((i) => {
                        const image = FEMALE_CLOTHES[i].image;
                        return (
                          <div
                            key={i}
                            className="flex flex-row items-center justify-center mx-auto bg-attribute-background bg-no-repeat bg-center h-[150px] w-[220px]"
                          >
                            <button
                              className="h-[150px] w-[220px] overflow-hidden"
                              onClick={() => setAttribute("clothes", i)}
                            >
                              <div className="relative h-[150px] w-[220px]">
                                <div className="-mt-44">
                                  <Image
                                    className="object-crop"
                                    src={image}
                                    width={200}
                                    height={200}
                                  />
                                </div>
                              </div>
                            </button>
                          </div>
                        );
                      })}
                    </>
                  )}
                {selected === AttributeSelection.BACKGROUND &&
                  Object.keys(BACKGROUND).map((i) => {
                    const image = BACKGROUND[i].image;
                    return (
                      <button onClick={() => setAttribute("background", i)}>
                        <div
                          key={i}
                          className="flex flex-row items-center justify-center mx-auto bg-attribute-background bg-no-repeat bg-center h-[150px] w-[220px]"
                        >
                          <div className="">
                            <Image
                              className="object-cover"
                              src={image}
                              width={100}
                              height={100}
                            />
                          </div>
                        </div>
                      </button>
                    );
                  })}
              </div>
            </div>
            <div className="flex flex-row justify-end gap-x-3 mt-5">
              {selected === AttributeSelection.HAIR ||
              selected === AttributeSelection.BACK_HAIR ||
              selected === AttributeSelection.BEARD ||
              selected === AttributeSelection.EYE ? (
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
                          {selected === AttributeSelection.HAIR &&
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
                          {selected === AttributeSelection.BACK_HAIR &&
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
                          {selected === AttributeSelection.BEARD &&
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
                          {selected === AttributeSelection.EYE &&
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
