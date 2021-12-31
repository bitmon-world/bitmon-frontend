import mergeImages from "merge-images";
import { TrainerAttributes } from "../components/Builder";
import {
  ACCESSORIES,
  BACKGROUND,
  BODY_COLORS,
  EYEBROWS,
  FEMALE_CLOTHES,
  MALE_CLOTHES,
  MOUTH,
  NOSE,
} from "../constants";

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
    const body =
      traits.body_type === "female"
        ? BODY_COLORS[traits.body_color].female_image
        : BODY_COLORS[traits.body_color].male_image;
    images.push(body);
  }
  if (traits.mouth) images.push(MOUTH[traits.mouth].image);
  if (traits.eyebrows) images.push(EYEBROWS[traits.eyebrows].image);
  if (traits.nose) images.push(NOSE[traits.nose].image);
  if (traits.clothes) {
    const clothes =
      traits.body_type === "female"
        ? FEMALE_CLOTHES[traits.clothes].image
        : MALE_CLOTHES[traits.clothes].image;
    images.push(clothes);
  }
  if (traits.eyes && traits.eyes_color)
    images.push(
      "/traits/eyes/" + traits.eyes_color + "/" + traits.eyes + ".png"
    );
  if (traits.eyes && !traits.eyes_color)
    images.push("/traits/eyes/1/" + traits.eyes + ".png");
  if (traits.hair && traits.hair_color)
    images.push(
      "/traits/hair/" + traits.hair_color + "/" + traits.hair + ".png"
    );
  if (traits.hair && !traits.hair_color)
    images.push("/traits/hair/1/" + traits.hair + ".png");
  if (traits.accessory) images.push(ACCESSORIES[traits.accessory].image);

  return await mergeImages(images);
}
