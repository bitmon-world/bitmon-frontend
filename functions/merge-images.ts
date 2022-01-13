import mergeImages from "merge-images";
import { BACKGROUND } from "../constants/traits/background";
import { BODY_COLOR } from "../constants/traits/body";
import { MOUTH } from "../constants/traits/mouth";
import { EYEBROW } from "../constants/traits/eyebrow";
import { NOSE } from "../constants/traits/nose";
import { FEMALE_CLOTHES, MALE_CLOTHES } from "../constants/traits/clothes";
import { ACCESSORY } from "../constants/traits/accessory";
import { TrainerAttributes } from "../components/Builder/BuiltImage";

export async function mergeTraits(traits: TrainerAttributes): Promise<string> {
  const images = [];
  if (traits.background) images.push(BACKGROUND[traits.background].image);
  if (traits.back_hair && traits.hair_color)
    images.push(
      "/traits/back-hair/" + traits.hair_color + "/" + traits.back_hair + ".png"
    );
  if (traits.back_hair && !traits.hair_color)
    images.push("/traits/back-hair/1/" + traits.back_hair + ".png");

  if (traits.body_type && traits.body_color) {
    images.push(
      "/traits/body/" + traits.body_type + "/" + traits.body_color + ".png"
    );
  }
  if (traits.mouth) images.push("/traits/mouth/" + traits.mouth + ".png");
  if (traits.eyebrow) images.push(EYEBROW[traits.eyebrow].image);
  if (traits.nose) images.push(NOSE[traits.nose].image);
  if (traits.clothes) {
    const clothes =
      traits.body_type === "female"
        ? FEMALE_CLOTHES[traits.clothes].image
        : MALE_CLOTHES[traits.clothes].image;
    images.push(clothes);
  }
  if (traits.eye && traits.eye_color)
    images.push("/traits/eye/" + traits.eye_color + "/" + traits.eye + ".png");
  if (traits.eye && !traits.eye_color)
    images.push("/traits/eye/1/" + traits.eye + ".png");
  if (traits.hair && traits.hair_color)
    images.push(
      "/traits/hair/" + traits.hair_color + "/" + traits.hair + ".png"
    );
  if (traits.hair && !traits.hair_color)
    images.push("/traits/hair/1/" + traits.hair + ".png");
  if (traits.accessory) images.push(ACCESSORY[traits.accessory].image);

  return await mergeImages(images);
}
