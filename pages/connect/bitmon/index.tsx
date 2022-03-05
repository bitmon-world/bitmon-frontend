import Image from "next/image";
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import { useWallet } from "@solana/wallet-adapter-react";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { sign } from "tweetnacl";
import { shortenString } from "../../../functions/format";
import {
  ButtonBlue,
  ButtonGreen,
  ButtonOrange,
} from "../../../components/Button";
import { updateFb } from "../../../functions/connect/firebase";
import { getAddress } from "../../../functions/connect/get-address";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

export function Firebase({ address }): JSX.Element {
  const modal = useWalletModal();
  const wallet = useWallet();
  const auth = useAuthUser();
  const [linkedAddress, setLinkedAddress] = useState(address);

  function verifyAndUploadFirebase(
    uid: string,
    sig: string,
    public_key: string
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      updateFb(uid, sig, public_key)
        .then(() => resolve())
        .catch(() => reject());
    });
  }

  function connect(): JSX.Element {
    return wallet.connected ? (
      <ButtonOrange
        text={shortenString(wallet.publicKey.toString(), 9)}
        onClick={() => wallet.disconnect()}
      />
    ) : (
      <ButtonGreen text={"Connect"} onClick={() => modal.setVisible(true)} />
    );
  }

  return (
    <div className="absolute w-full top-0">
      <div className="pb-20 h-screen">
        <div className="relative flex flex-row items-center justify-center h-full w-full z-10">
          <div className="w-full">
            <div className="pt-14 text-center flex flex-row justify-center items-center gap-x-10">
              <div className="hidden md:inline-flex ml-10">
                <Image
                  src="/img/separator-right.svg"
                  width="250"
                  height="17"
                  alt="Bitmon Separator"
                />
              </div>
              <div className="my-4">
                <h1 className="text-3xl">Bitmon</h1>
                <h1 className="text-4xl text-orange">Connect</h1>
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
            <div className="flex flex-row items-center justify-center bg-contain bg-no-repeat bg-center bg-title-background h-[58px] mx-auto my-4">
              <div className="top-0 text-xl text-white text-center">
                <p className="text-white text-md">
                  Connect your in-game credentials to the{" "}
                  <span className="text-orange">Solana</span> network
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg w-[300px] mx-auto py-5">
              <h2 className="text-center text-md">Welcome to Bitmon Connect</h2>
              <h2 className="text-center mt-3">Your user ID is</h2>
              <h2 className="text-sm text-center my-2">
                <span className="text-red-800 text-xs">{auth.id}</span>
              </h2>
              <h2 className="text-center mt-3">Your linked address is</h2>
              <h2 className="text-center mb-3">
                {linkedAddress ? (
                  <span className="text-red-800 text-xs">
                    {shortenString(linkedAddress, 24)}
                  </span>
                ) : (
                  <span className="text-red-800 text-xs">
                    You don't have a linked address
                  </span>
                )}
              </h2>
              <h2 className="text-center mt-3 mb-2">Link or update address</h2>
              <div className="flex flex-row justify-center">{connect()}</div>
              {wallet.connected ? (
                <div className="mt-5">
                  <ButtonBlue
                    text="Update"
                    onClick={async () => {
                      const sig = await wallet.signMessage(
                        Buffer.from(auth.id)
                      );
                      toast
                        .promise(
                          verifyAndUploadFirebase(
                            auth.id,
                            Buffer.from(sig).toString("hex"),
                            wallet.publicKey.toBuffer().toString("hex")
                          ),
                          {
                            loading: <b>Updating address</b>,
                            success: <b>Success</b>,
                            error: <b>Try again</b>,
                          }
                        )
                        .then(() =>
                          setLinkedAddress(wallet.publicKey.toBase58())
                        );
                    }}
                  />
                </div>
              ) : null}
              <div className="mt-5 w-[200px] mx-auto">
                <ButtonOrange text="Sign Out" onClick={() => auth.signOut()} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser }) => {
  if (!AuthUser.id) return;
  const address = await getAddress(AuthUser.id);
  return {
    props: {
      address: address,
    },
  };
});

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  whenUnauthedBeforeInit: AuthAction.REDIRECT_TO_LOGIN,
  // @ts-ignore
})(Firebase);
