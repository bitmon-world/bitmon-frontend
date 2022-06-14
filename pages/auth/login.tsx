import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { getApp } from "@firebase/app";

export function Login(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  async function loginAPI(email, password): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const auth = getAuth(getApp("bitmon"));
        await signInWithEmailAndPassword(auth, email, password);
        await router.push("/user");
        resolve();
      } catch (e) {
        reject();
      }
    });
  }

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
            <div className="pt-2 text-center flex flex-row justify-center items-center gap-x-10">
              <p className="text-l">Please create your account and <span className="text-orange">verify it</span> to be able to access the game.</p>
            </div>
            <br></br>
            <div className="bg-white rounded-lg w-[350px] mx-auto py-5">
              <div className="my-4">
                <p className="text-center font-bold">Email</p>
                <div className="flex flex-row my-2 justify-between">
                  <input
                    className="w-[320px] mx-auto border-2 rounded-lg text-center text-sm p-1"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <p className="text-center font-bold">Password</p>
                <div className="flex flex-row my-2 justify-between">
                  <input
                    type="password"
                    className="w-[320px] mx-auto border-2 rounded-lg text-center text-sm p-1"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-row items-center justify-center my-2">
                <Link href="/auth/register" passHref>
                  <a className="text-blue">Create a new account</a>
                </Link>
              </div>
              <div className="flex flex-row items-center justify-center my-2">
                <button
                  className="text-blue"
                  onClick={async () => {
                    await toast.promise(
                      sendPasswordResetEmail(getAuth(getApp("bitmon")), email),
                      {
                        loading: <b>Sending password reset</b>,
                        success: <b>Success</b>,
                        error: (
                          <b>Failed. Make sure you written a valid email</b>
                        ),
                      }
                    );
                  }}
                >
                  Forgot password
                </button>
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
                    onClick={async () =>
                      await toast.promise(loginAPI(email, password), {
                        loading: <b>Sign in</b>,
                        success: <b>Success</b>,
                        error: <b>Login failed.</b>,
                      })
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
