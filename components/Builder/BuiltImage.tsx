import { FC } from "react";
import Image from "next/image";
import { BACKGROUND } from "../../constants/traits/background";
import { BODY_COLOR } from "../../constants/traits/body";
import { MOUTH } from "../../constants/traits/mouth";
import { EYE } from "../../constants/traits/eye";
import { EYEBROW } from "../../constants/traits/eyebrow";
import { NOSE } from "../../constants/traits/nose";
import { BACK_HAIR, HAIR } from "../../constants/traits/hair";
import { ACCESSORY } from "../../constants/traits/accessory";
import { FEMALE_CLOTHES, MALE_CLOTHES } from "../../constants/traits/clothes";

export interface TrainerAttributes {
  body_type: "male" | "female" | null;
  body_color: string | null;
  mouth: string | null;
  eye: string | null;
  eyebrow: string | null;
  nose: string | null;
  hair: string | null;
  back_hair: string | null;
  beard: string | null;
  accessory: string | null;
  "face-accessory": string | null;
  clothes: string | null;
  background: string | null;
  eye_color: string | null;
  back_hair_color: string | null;
  hair_color: string | null;
  beard_color: string | null;
  glasses: string | null;
}

export const TrainerBuiltImage: FC<{ attributes: TrainerAttributes }> = ({
  attributes,
}) => {
  return (
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
                src={"/traits/background/" + attributes.background + ".png"}
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
                "/traits/body/" +
                attributes.body_type +
                "/" +
                attributes.body_color +
                ".png"
              }
              width={300}
              height={300}
            />
          </div>
          {attributes.mouth ? (
            <div className="rounded-lg h-[300px] w-[300px] z-10 absolute top-0">
              <Image
                className="rounded-lg"
                src={"/traits/mouth/" + attributes.mouth + ".png"}
                width={300}
                height={300}
              />
            </div>
          ) : (
            <div />
          )}
          {attributes.eye ? (
            <div className="rounded-lg h-[300px] w-[300px] z-10 absolute top-0">
              <Image
                className="rounded-lg"
                src={
                  "/traits/eye/" +
                  (attributes.eye_color || "1") +
                  "/" +
                  attributes.eye +
                  ".png"
                }
                width={300}
                height={300}
              />
            </div>
          ) : (
            <div />
          )}
          {attributes.eyebrow ? (
            <div className="rounded-lg h-[300px] w-[300px] z-10 absolute top-0">
              <Image
                className="rounded-lg"
                src={"/traits/eyebrow/" + attributes.eyebrow + ".png"}
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
                src={"/traits/nose/" + attributes.nose + ".png"}
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
                  "/traits/clothes/" +
                  attributes.body_type +
                  "/" +
                  attributes.clothes +
                  ".png"
                }
                width={300}
                height={300}
              />
            </div>
          ) : (
            <div />
          )}
          {attributes["face-accessory"] ? (
            <div className="rounded-lg h-[300px] w-[300px] z-10 absolute top-0">
              <Image
                className="rounded-lg"
                src={
                  "/traits/face-accessory/" +
                  attributes["face-accessory"] +
                  ".png"
                }
                width={300}
                height={300}
              />
            </div>
          ) : (
            <div />
          )}
          {attributes.glasses ? (
            <div className="rounded-lg h-[300px] w-[300px] z-10 absolute top-0">
              <Image
                className="rounded-lg"
                src={"/traits/glasses/" + attributes.glasses + ".png"}
                width={300}
                height={300}
              />
            </div>
          ) : (
            <div />
          )}
          {attributes.hair ? (
            <div className="rounded-lg h-[300px] w-[300px] z-10 absolute top-0">
              <Image
                className="rounded-lg"
                src={
                  "/traits/hair/" +
                  (attributes.hair_color || "1") +
                  "/" +
                  attributes.hair +
                  ".png"
                }
                width={300}
                height={300}
              />
            </div>
          ) : (
            <div />
          )}
          {attributes.back_hair ? (
            <div className="rounded-lg h-[300px] w-[300px] z-0 absolute top-0">
              <Image
                className="rounded-lg"
                src={
                  "/traits/back-hair/" +
                  (attributes.back_hair_color || "1") +
                  "/" +
                  attributes.back_hair +
                  ".png"
                }
                width={300}
                height={300}
              />
            </div>
          ) : (
            <div />
          )}
          {attributes.accessory ? (
            <div className="rounded-lg h-[300px] w-[300px] z-10 absolute top-0">
              <Image
                className="rounded-lg"
                src={"/traits/accessory/" + attributes.accessory + ".png"}
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
  );
};
