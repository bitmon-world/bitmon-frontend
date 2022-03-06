import Image from "next/image";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { getApp } from "@firebase/app";
import { useEffect, useState } from "react";
import { AuthAction, withAuthUser } from "next-firebase-auth";
import { EmailAuthProvider, getAuth } from "@firebase/auth";

const firebaseAuthConfig = {
  signInOptions: [
    {
      provider: EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
    },
  ],
  signInSuccessUrl: "/",
  credentialHelper: "none",
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
};

export function Auth(): JSX.Element {
  const [renderAuth, setRenderAuth] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setRenderAuth(true);
    }
  }, []);

  return (
    <div className="absolute w-full top-0">
      <div className="pb-20 h-screen">
        <div className="relative flex flex-row items-center justify-center h-full w-full z-10">
          {renderAuth ? (
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
              <StyledFirebaseAuth
                uiConfig={firebaseAuthConfig}
                firebaseAuth={getAuth(getApp())}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
  whenUnauthedAfterInit: AuthAction.RENDER,
})(Auth);
