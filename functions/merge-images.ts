import mergeImages from "merge-images";
import { TrainerAttributes } from "../components/Builder/BuiltImage";

export async function mergeTraits(traits: TrainerAttributes): Promise<string> {
  const images = [];

  if (traits.background)
    images.push("/traits/background/" + traits.background + ".png");
  if (traits.back_hair)
    images.push(
      "/traits/back-hair/" +
        (traits.back_hair_color || "1") +
        "/" +
        traits.back_hair +
        ".png"
    );
  if (traits.body_type && traits.body_color)
    images.push(
      "/traits/body/" + traits.body_type + "/" + traits.body_color + ".png"
    );
  if (traits.mouth) images.push("/traits/mouth/" + traits.mouth + ".png");
  if (traits.eyebrow) images.push("/traits/eyebrow/" + traits.eyebrow + ".png");
  if (traits.nose) images.push("/traits/nose/" + traits.nose + ".png");
  if (traits.clothes && traits.body_type)
    images.push(
      "/traits/clothes/" + traits.body_type + "/" + traits.clothes + ".png"
    );
  if (traits.beard)
    images.push(
      "/traits/beard/" +
        (traits.beard_color || "1") +
        "/" +
        traits.beard +
        ".png"
    );
  if (traits.eye)
    images.push(
      "/traits/eye/" + (traits.eye_color || "1") + "/" + traits.eye + ".png"
    );
  if (traits.face_accessory)
    images.push("/traits/face-accessory/" + traits.face_accessory + ".png");
  if (traits.glasses) images.push("/traits/glasses/" + traits.glasses + ".png");
  if (traits.hair)
    images.push(
      "/traits/hair/" + (traits.hair_color || "1") + "/" + traits.hair + ".png"
    );
  if (traits.accessory)
    images.push("/traits/accessory/" + traits.accessory + ".png");

  return await mergeImages(images);
}
