import Image from "next/image";
import { clusterApiUrl } from "@solana/web3.js";
import { isLogged } from "../../state/user/hooks";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { logout } from "../../state/user/actions";
import { ButtonOrange } from "../../components/Button";

export default function User(): JSX.Element {
  const url =
    process.env.NEXT_PUBLIC_SOLANA_RPC || clusterApiUrl("mainnet-beta");

  const dispatch = useDispatch();
  const logged = isLogged();

  function logoutAPI() {
    dispatch(logout());
  }

  return (
    <div className="relative z-10 mx-4 h-full pb-10">
      {logged ? (
        <>
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
              <h1 className="text-4xl uppercase">Welcome</h1>
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
          <div className="mt-6">
            <div className="flex flex-row items-center justify-center bg-contain bg-no-repeat bg-center bg-title-background h-[58px] mx-auto">
              <p className="top-0 text-xl text-white">
                Convert your <span className="text-orange">$BIT</span> to
                in-game coin
              </p>
            </div>
            <div className="flex flex-row items-center justify-center my-4">
              <ButtonOrange text={"Log out"} onClick={() => logoutAPI()} />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="pt-14 text-center flex flex-row justify-center items-center gap-x-10">
            <div>
              <h1 className="text-4xl uppercase">Login required</h1>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex flex-row items-center justify-center bg-contain bg-no-repeat bg-center bg-title-background h-[58px] mx-auto">
              <p className="top-0 text-xl text-white">
                Go to the login page to access this section
              </p>
            </div>
            <div className="flex flex-row items-center justify-center my-4">
              <Link href="/login" passHref={true}>
                <div
                  className={
                    "w-40 mx-auto rounded-full border-2 shadow shadow-blue bg-blue border-blue"
                  }
                >
                  <button
                    className={
                      "py-1 px-6 text-white text-xl uppercase border-2 border-black rounded-full relative w-full"
                    }
                  >
                    <div className="flex flex-row items-center justify-center">
                      <div>
                        <h1>Login</h1>
                      </div>
                      <div className="absolute top-0 right-0 opacity-10">
                        <Image
                          src="/icons/bitmon-icon-white.svg"
                          height="40"
                          width="40"
                        />
                      </div>
                    </div>
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
