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
import { BACK_HAIR, HAIR, HAIR_COLOR } from "../../constants/traits/hair";
import { ACCESSORY } from "../../constants/traits/accessory";
import { BACKGROUND } from "../../constants/traits/background";
import { BodyTypeSelector } from "./BodyTypeSelector";

export interface TrainerAttributes {
  body_type: "male" | "female" | null;
  body_color: string | null;
  mouth: string | null;
  eye: string | null;
  eye_color: string | null;
  eyebrow: string | null;
  nose: string | null;
  hair: string | null;
  back_hair: string | null;
  hair_color: string | null;
  accessory: string | null;
  clothes: string | null;
  background: string | null;
}

enum AttributeSelection {
  BodyColor,
  Mouth,
  Eyes,
  EyesColor,
  Eyebrows,
  Nose,
  Hair,
  BackHair,
  HairColor,
  Accessory,
  Clothes,
  Background,
}

export const TrainerBuilder: FC<{
  attributes: TrainerAttributes;
  setAttributes: (data: TrainerAttributes) => void;
  toggleTitle: (toggle: boolean) => void;
  mint: string | string[];
}> = ({ attributes, setAttributes, toggleTitle, mint }) => {
  const [selected, setSelected] = useState<AttributeSelection>(
    AttributeSelection.BodyColor
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
      hair_color: randomIntFromInterval(
        1,
        Object.keys(HAIR_COLOR).length
      ).toString(),
      accessory: randomIntFromInterval(
        1,
        Object.keys(ACCESSORY).length
      ).toString(),
      clothes: randomIntFromInterval(1, Object.keys(clothes).length).toString(),
      background: randomIntFromInterval(
        1,
        Object.keys(BACKGROUND).length
      ).toString(),
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
        <div className="relative flex flex-row justify-center md:mt-20 max-h-[338px] items-center">
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
            <div>
              {attributes.background ? (
                <div className="rounded-lg h-[338px] w-[338px] z-0 static">
                  <Image
                    className="rounded-lg"
                    src={BACKGROUND[attributes.background].image}
                    width={300}
                    height={300}
                  />
                </div>
              ) : (
                <div className="rounded-lg h-[338px] w-[338px] z-0 static">
                  <Image
                    className="rounded-lg"
                    src="/icons/builder/plain-bg.svg"
                    width={300}
                    height={300}
                  />
                </div>
              )}
              <div className="rounded-lg h-[300px] w-[300px] z-10 absolute top-0">
                <Image
                  className="rounded-lg"
                  src={
                    attributes.body_type === "male"
                      ? BODY_COLOR[attributes.body_color].male_image
                      : BODY_COLOR[attributes.body_color].female_image
                  }
                  width={300}
                  height={300}
                />
              </div>
              {attributes.mouth ? (
                <div className="rounded-lg h-[300px] w-[300px] z-10 absolute top-0">
                  <Image
                    className="rounded-lg"
                    src={MOUTH[attributes.mouth].image}
                    width={300}
                    height={300}
                  />
                </div>
              ) : (
                <div />
              )}
              {attributes.eye ? (
                attributes.eye_color ? (
                  <div className="rounded-lg h-[300px] w-[300px] z-10 absolute top-0">
                    <Image
                      className="rounded-lg"
                      src={
                        "/traits/eyes/" +
                        attributes.eye_color +
                        "/" +
                        attributes.eye +
                        ".png"
                      }
                      width={300}
                      height={300}
                    />
                  </div>
                ) : (
                  <div className="rounded-lg h-[300px] w-[300px] z-10 absolute top-0">
                    <Image
                      className="rounded-lg"
                      src={EYE[attributes.eye].image}
                      width={300}
                      height={300}
                    />
                  </div>
                )
              ) : (
                <div />
              )}
              {attributes.eyebrow ? (
                <div className="rounded-lg h-[300px] w-[300px] z-10 absolute top-0">
                  <Image
                    className="rounded-lg"
                    src={EYEBROW[attributes.eyebrow].image}
                    width={300}
                    height={300}
                  />
                </div>
              ) : (
                <div />
              )}
              {attributes.nose ? (
                <div className="rounded-lg h-[300px] w-[300px] z-10 absolute top-0">
                  <Image
                    className="rounded-lg"
                    src={NOSE[attributes.nose].image}
                    width={300}
                    height={300}
                  />
                </div>
              ) : (
                <div />
              )}
              {attributes.hair ? (
                attributes.hair_color ? (
                  <div className="rounded-lg h-[300px] w-[300px] z-10 absolute top-0">
                    <Image
                      className="rounded-lg"
                      src={
                        "/traits/hair/" +
                        attributes.hair_color +
                        "/" +
                        attributes.hair +
                        ".png"
                      }
                      width={300}
                      height={300}
                    />
                  </div>
                ) : (
                  <div className="rounded-lg h-[300px] w-[300px] z-10 absolute top-0">
                    <Image
                      className="rounded-lg"
                      src={HAIR[attributes.hair].image}
                      width={300}
                      height={300}
                    />
                  </div>
                )
              ) : (
                <div />
              )}
              {attributes.back_hair ? (
                attributes.hair_color ? (
                  <div className="rounded-lg h-[300px] w-[300px] z-0 absolute top-0">
                    <Image
                      className="rounded-lg"
                      src={
                        "/traits/back-hair/" +
                        attributes.hair_color +
                        "/" +
                        attributes.back_hair +
                        ".png"
                      }
                      width={300}
                      height={300}
                    />
                  </div>
                ) : (
                  <div className="rounded-lg h-[300px] w-[300px] z-0 absolute top-0">
                    <Image
                      className="rounded-lg"
                      src={BACK_HAIR[attributes.back_hair].image}
                      width={300}
                      height={300}
                    />
                  </div>
                )
              ) : (
                <div />
              )}
              {attributes.accessory ? (
                <div className="rounded-lg h-[300px] w-[300px] z-10 absolute top-0">
                  <Image
                    className="rounded-lg"
                    src={ACCESSORY[attributes.accessory].image}
                    width={300}
                    height={300}
                  />
                </div>
              ) : (
                <div />
              )}
              {attributes.clothes ? (
                <div className="rounded-lg h-[300px] w-[300px] z-10 absolute top-0">
                  <Image
                    className="rounded-lg"
                    src={
                      attributes.body_type === "female"
                        ? FEMALE_CLOTHES[attributes.clothes].image
                        : MALE_CLOTHES[attributes.clothes].image
                    }
                    width={300}
                    height={300}
                  />
                </div>
              ) : (
                <div />
              )}
            </div>
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
                  onClick={() => setSelected(AttributeSelection.EyesColor)}
                >
                  {selected === AttributeSelection.EyesColor ? (
                    <Image
                      src="/icons/builder/eyes-color-selected.svg"
                      width="50px"
                      height="50px"
                    />
                  ) : (
                    <Image
                      src="/icons/builder/eyes-color.svg"
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
                  onClick={() => setSelected(AttributeSelection.HairColor)}
                >
                  {selected === AttributeSelection.HairColor ? (
                    <Image
                      src="/icons/builder/hair-color-selected.svg"
                      width="50px"
                      height="50px"
                    />
                  ) : (
                    <Image
                      src="/icons/builder/hair-color.svg"
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
            <div className="relative bg-white/30 rounded-lg h-[400px] mt-5 overflow-y-scroll z-20">
              <div className="grid grid-cols-1 md:grid-cols-3">
                {selected === AttributeSelection.BodyColor &&
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
                {selected === AttributeSelection.Mouth &&
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
                {selected === AttributeSelection.Eyes &&
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
                {selected === AttributeSelection.EyesColor &&
                  Object.keys(EYE_COLOR).map((i) => {
                    return (
                      <div
                        key={i}
                        className="flex flex-row items-center justify-center h-32 w-32 mx-auto"
                      >
                        <button onClick={() => setAttribute("eye_color", i)}>
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
                {selected === AttributeSelection.Eyebrows &&
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
                {selected === AttributeSelection.Nose &&
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
                {selected === AttributeSelection.Hair && (
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
                {selected === AttributeSelection.BackHair && (
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
                {selected === AttributeSelection.HairColor &&
                  Object.keys(HAIR_COLOR).map((i) => {
                    return (
                      <div
                        key={i}
                        className="flex flex-row items-center justify-center h-32 w-32 mx-auto"
                      >
                        <button onClick={() => setAttribute("hair_color", i)}>
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
                {selected === AttributeSelection.Accessory && (
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
                {selected === AttributeSelection.Clothes &&
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
                {selected === AttributeSelection.Clothes &&
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
                {selected === AttributeSelection.Background &&
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
                        back_hair: null,
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
