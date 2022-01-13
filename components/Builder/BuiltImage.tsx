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
  face_accessory: string | null;
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
            <div className="rounded-lg h-[300px] w-[300px] z-10 absolute top-0">
              <Image
                className="rounded-lg"
                src={
                  "/traits/eyes/" + attributes.eye_color
                    ? attributes.eye_color
                    : "1" + "/" + attributes.eye + ".png"
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
            <div className="rounded-lg h-[300px] w-[300px] z-10 absolute top-0">
              <Image
                className="rounded-lg"
                src={
                  "/traits/hair/" + attributes.hair_color
                    ? attributes.hair_color
                    : "1" + "/" + attributes.hair + ".png"
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
                  "/traits/back-hair/" + attributes.back_hair_color
                    ? attributes.back_hair_color
                    : "1" + "/" + attributes.back_hair + ".png"
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
  );
};
