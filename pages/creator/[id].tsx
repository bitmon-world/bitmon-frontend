import Image from "next/image";
import { useWallet } from "@solana/wallet-adapter-react";
import { ConnectWalletWarning } from "../../components/ConnectWalletWarning";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { getMintMetadata } from "../../functions/metadata";
import { createConnectionConfig } from "@nfteyez/sol-rayz";
import { clusterApiUrl } from "@solana/web3.js";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { Loader } from "../../components/Loader";
import { TrainerImage } from "../../components/TrainerImage";
import { ButtonOrange, ButtonOrangeDisabled } from "../../components/Button";
import { isMintOwner } from "../../functions/onwership";
import { TrainerBuilder } from "../../components/Builder";
import {TrainerAttributes} from "../../components/Builder/BuiltImage";

export default function CreatorSingle(): JSX.Element {
  const url =
    process.env.NEXT_PUBLIC_SOLANA_RPC || clusterApiUrl("mainnet-beta");

  const connect = createConnectionConfig(url);

  const router = useRouter();

  const wallet = useWallet();

  const [metadata, setMetadata] = useState<Metadata | null>(null);

  const [owner, setOwner] = useState(false);

  const fetch_metadata = useCallback(async (id: string | string[]) => {
    const data = await getMintMetadata(id, connect);
    const owner = await isMintOwner(id, wallet.publicKey, connect);
    setMetadata(data);
    setOwner(owner);
  }, []);

  useEffect(() => {
    if (!router.query.id || !wallet || !wallet.publicKey) return;
    fetch_metadata(router.query.id);
  }, [router]);

  const [builder, setBuilder] = useState(false);

  const [attributes, setAttributes] = useState<TrainerAttributes>({
    accessory: null,
    back_hair: null,
    back_hair_color: null,
    background: null,
    beard: null,
    beard_color: null,
    clothes: null,
    eyebrow: null,
    eye: null,
    eye_color: null,
    face_accessory: null,
    glasses: null,
    hair: null,
    hair_color: null,
    mouth: null,
    nose: null,
    body_type: null,
    body_color: null,
  });

  function attributesUpdate(data: TrainerAttributes) {
    setAttributes(data);
  }

  const [showTitle, setShowTitle] = useState(true);

  function toggleTitle(toggle: boolean) {
    setShowTitle(toggle);
  }

  return (
    <div className="relative z-10 mx-4 h-full pb-10">
      {showTitle ? (
        <div className="pt-14 text-center flex flex-row justify-center items-center gap-x-10">
          <div className="hidden md:inline-flex ml-10">
            <Image
              src="/img/separator-right.svg"
              width="250"
              height="17"
              alt="Bitmon Separator"
            />
          </div>
          <div>
            <Image
              src="/img/trainer-creator.png"
              width="200"
              height="85"
              alt="Bitmon Separator"
            />
          </div>
          <div className="hidden md:inline-flex mr-10">
            <Image
              src="/img/separator-left.svg"
              width="250"
              height="17"
              alt="Bitmon Separator"
            />
          </div>
        </div>
      ) : (
        <div />
      )}
      <div className="mt-8">
        {wallet.connected ? (
          metadata ? (
            builder ? (
              <TrainerBuilder
                attributes={attributes}
                setAttributes={attributesUpdate}
                toggleTitle={toggleTitle}
                mint={router.query.id}
              />
            ) : (
              <div className="text-center">
                <div className="flex flex-row items-center justify-center bg-contain bg-no-repeat bg-center bg-title-background h-[58px] mx-auto">
                  <p className="top-0 text-xl text-white">
                    {metadata.data.data.name}
                  </p>
                </div>
                <div className="mx-auto w-[325px] h-[325px] mt-6">
                  <TrainerImage
                    link={false}
                    uri={metadata.data.data.uri}
                    mint={metadata.data.mint}
                  />
                </div>
                <div className="w-56 mt-6 mx-auto">
                  {owner ? (
                    <ButtonOrange
                      text="Start Building"
                      onClick={() => setBuilder(true)}
                    />
                  ) : (
                    <ButtonOrangeDisabled text="Start Building" />
                  )}
                </div>
              </div>
            )
          ) : (
            <Loader />
          )
        ) : (
          <ConnectWalletWarning />
        )}
      </div>
    </div>
  );
}
