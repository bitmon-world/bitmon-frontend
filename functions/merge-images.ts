import mergeImages from "merge-images";
import { TrainerAttributes } from "../components/Builder/BuiltImage";

export async function mergeTraits(traits: TrainerAttributes): Promise<string> {
  const images = [];
  if (traits.background)
    images.push("/traits/background/" + traits.background + ".png");
  if (traits["back-hair"] && traits.back_hair_color)
    images.push(
      "/traits/back-hair/" +
        traits.hair_color +
        "/" +
        traits["back-hair"] +
        ".png"
    );
  if (traits["back-hair"] && !traits.back_hair_color)
    images.push("/traits/back-hair/1/" + traits["back-hair"] + ".png");

  if (traits.body_type && traits.body_color) {
    images.push(
      "/traits/body/" + traits.body_type + "/" + traits.body_color + ".png"
    );
  }
  if (traits.mouth) images.push("/traits/mouth/" + traits.mouth + ".png");
  if (traits.eyebrow) images.push("/traits/eyebrow/" + traits.eyebrow + ".png");
  if (traits.nose) images.push("/traits/nose/" + traits.nose + ".png");
  if (traits.clothes)
    images.push(
      "/traits/clothes/" + traits.body_type + "/" + traits.clothes + ".png"
    );
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
  if (traits.accessory)
    images.push("/traits/accessory/" + traits.accessory + ".png");

  return await mergeImages(images);
}
