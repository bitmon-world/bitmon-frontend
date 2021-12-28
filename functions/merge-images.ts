import mergeImages from "merge-images";
import { TrainerAttributes } from "../components/Builder";
import { BACKGROUND, BODY_COLORS } from "../constants";

export async function mergeTraits(traits: TrainerAttributes): Promise<string> {
  console.log(traits)
  const image = await mergeImages([
    BACKGROUND[traits.background].image,
    traits.body_type === "female"
      ? BODY_COLORS[traits.body_color].female_image
      : BODY_COLORS[traits.body_color].male_image,
  ]);
  console.log(traits);
  console.log(image);
  return image
}
