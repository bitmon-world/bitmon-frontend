import { FC, useCallback, useEffect, useState } from "react";
import { LoaderGrey } from "../Loader";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

export const TrainerImage: FC<{ uri: string; mint: string; link: boolean }> = ({
  uri,
  mint,
  link,
}) => {
  const [loading, setLoading] = useState(true);

  const [image, setImage] = useState();

  const fetch_data = useCallback(async () => {
    setLoading(true);
    const data = await axios.get(uri);
    setImage(data.data.image);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!uri) return;
    fetch_data();
  }, [fetch_data]);

  return (
    <div className="mx-auto bg-white border-lg rounded-lg">
      {loading ? (
        <div className="flex items-center justify-center w-[325px] h-[325px]">
          <LoaderGrey />
        </div>
      ) : link ? (
        <Link href={"/creator/" + mint} passHref>
          <div className="flex items-center justify-center border-4 border-white rounded-lg cursor-pointer hover:drop-shadow-lg hover:shadow-black">
            <Image
              className={"rounded-lg"}
              src={image}
              width="325"
              height="325"
              alt={"Bitmon Trainer"}
            />
          </div>
        </Link>
      ) : (
        <div className="flex items-center justify-center border-4 border-white rounded-lg">
          <Image
            className={"rounded-lg"}
            src={image}
            width="325"
            height="325"
            alt={"Bitmon Trainer"}
          />
        </div>
      )}
    </div>
  );
};
