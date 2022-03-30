import Image from "next/image";
import { useState } from "react";

export function Login(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="absolute w-full top-0">
      <div className="pb-20 h-screen">
        <div className="relative flex flex-row items-center justify-center h-full w-full z-10">
          <div className="w-full">
            <div className="pt-2 text-center flex flex-row justify-center items-center gap-x-10">
              <div className="hidden md:inline-flex ml-10">
                <Image
                  src="/img/separator-right.svg"
                  width="250"
                  height="17"
                  alt="Bitmon Separator"
                />
              </div>
              <div className="my-4">
                <h1 className="text-3xl">Login</h1>
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
            <div className="bg-white rounded-lg w-[350px] mx-auto py-5">
              <div className="my-4">
                <div className="flex flex-row my-2 justify-between mx-2 items-center">
                  <p>Email:</p>
                  <input
                    className="border-2 rounded-lg text-center text-sm p-1"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex flex-row my-2 justify-between mx-2 items-center">
                  <p>Password:</p>
                  <input
                    type="password"
                    className="border-2 rounded-lg text-center text-sm p-1"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="my-8">
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
                        <h1>Sign in</h1>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
