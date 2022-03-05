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
      <div className="landing-background pb-20 h-screen">
        <div className="flex flex-row justify-center">
          <div className="z-0 absolute opacity-10 pt-20">
            <Image
              src="/icons/bitmon-icon-black.svg"
              width="275"
              height="275"
            />
          </div>
        </div>
        <div className="relative flex flex-row items-center justify-center h-full w-full z-10">
          {renderAuth ? (
            <div className="w-full">
              <div className="text-center py-5 font-bold">
                <h1 className="text-2xl text-white">Bitmon Connect</h1>
                <p className="text-white text-md">
                  Connect your Bitmon credentials to the Solana network
                </p>
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
