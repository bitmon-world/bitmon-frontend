import Image from "next/image";
import {
  ButtonBlue,
  ButtonBlueDisabled,
  ButtonGreen,
  ButtonOrange,
  ButtonGreenBig
} from "../../components/Button";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Loader } from "../../components/Loader";
import { toast } from "react-hot-toast";
import { useWallet } from "@solana/wallet-adapter-react";
import { shortenString } from "../../functions/format";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import axios from "axios";
import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";
import { AccountLayout, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { createTransaction, parseURL } from "@solana/pay";
import { getAuth, sendEmailVerification } from "@firebase/auth";
import { getApp } from "@firebase/app";
import { sendSignedTransaction } from "../../functions/transaction";

export default function User(): JSX.Element {
  const url =
    process.env.NEXT_PUBLIC_SOLANA_RPC || clusterApiUrl("mainnet-beta");

  const connection = new Connection(url);

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const wallet = useWallet();
  const modal = useWalletModal();

  const [tokens, setTokens] = useState(0);

  const fetch_tokens = useCallback(async () => {
    const tokenAccounts = await connection.getTokenAccountsByOwner(
      wallet.publicKey,
      {
        mint: new PublicKey("EGiWZhNk3vUNJr35MbL2tY5YD6D81VVZghR2LgEFyXZh"),
        programId: TOKEN_PROGRAM_ID,
      }
    );
    if (tokenAccounts.value.length === 0) {
      setTokens(0);
    } else {
      const accountInfo = AccountLayout.decode(
        tokenAccounts.value[0].account.data
      );
      setTokens(
        Number((accountInfo.amount * BigInt(100)) / BigInt(LAMPORTS_PER_SOL)) /
          100
      );
    }
  }, [connection, wallet]);

  useEffect(() => {
    if (!wallet.connected || !wallet.publicKey) return;
    fetch_tokens();
  }, [wallet]);

  const [user, setUser] = useState<{
    id: string;
    address: string | null;
    bit: number;
    verified: boolean;
  } | null>();

  const fetch_user = useCallback(async (user) => {
    try {
      const data = (
        await axios.get("https://bitmons-api.bitmon.io/user/" + user.uid)
      ).data;
      if (data) {
        setUser({
          id: user.uid,
          address: data.info.address,
          bit: data.info.bit,
          verified: user.emailVerified,
        });
      } else {
        setUser({
          id: user.uid,
          address: "",
          bit: 0,
          verified: user.emailVerified,
        });
      }
    } catch (e) {
      setUser({
        id: user.uid,
        address: "",
        bit: 0,
        verified: user.emailVerified,
      });
    }
    setLoading(false);
  }, []);

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

  useEffect(() => {
    const user = getAuth(getApp("bitmon")).currentUser;
    if (!user) {
      router.push("/auth/login");
      return;
    }
    fetch_user(user);
  }, []);

  async function uploadSignature(uid, signature, publicKey) {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const resp = await axios.post("https://bitmons-api.bitmon.io/connect", {
          user: uid,
          signature,
          public_key: publicKey,
        });
        if (resp.data.success) {
          resolve();
        }
        reject();
      } catch (e) {
        reject();
      }
    });
  }

  const [amount, setAmount] = useState(0);

  async function submitPayment(uid, tokens) {
    const response = await axios.post("https://bitmons-api.bitmon.io/convert", {
      uid,
      amount: tokens,
    });

    const { recipient, amount, splToken, reference } = parseURL(
      response.data.payment
    );

    const tx = await createTransaction(
      connection,
      wallet.publicKey,
      recipient,
      amount,
      {
        splToken,
        reference,
      }
    );

    tx.feePayer = wallet.publicKey;
    tx.recentBlockhash = (
      await connection.getLatestBlockhash("confirmed")
    ).blockhash;

    const signedTx = await wallet.signTransaction(tx);
    await sendSignedTransaction({ signedTransaction: signedTx, connection });
  }

  return (
    <div className="relative z-10 mx-4 h-full pb-10">
      {loading ? (
        <div className="mt-32">
          <Loader />
        </div>
      ) : (
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
          <div className="bg-white rounded-lg w-[300px] mx-auto py-5 my-10">
            <h2 className="text-center text-md">Welcome to Bitmon</h2>
            {wallet.connected ? (
              <div className="mt-5">
                <h2 className="text-center mt-3 mb-2">Convert $BIT</h2>
                <div className="flex flex-row my-2 justify-between">
                  <input
                    className="w-[150px] mx-auto border-2 rounded-lg text-center text-sm p-1"
                    type="number"
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                  />
                </div>
               
                {!amount || amount === 0 ? (
                  <ButtonBlueDisabled text="Convert" />
                ) : (
                  <ButtonBlue
                    text="Convert"
                    onClick={() => submitPayment(user.id, amount)}
                  />
                )}
                 <p className="text-orange text-center my-2 italic">
                  The process can take up to 10 minutes
                </p>
                <p className="text-blue text-center my-2 italic">
                  Your in-wallet $BIT is worth 10x in-game. 
                </p>
                <p className="text-blue text-center my-2 italic">
                  (Ex. 2 in-wallet $BIT = 20 in-game $BIT)
                </p>
              </div>
            ) : null}
            <div className="mt-5 w-[200px] mx-auto">
            
            <ButtonGreenBig
                  text="Buy $BIT"
                  onClick={async () => window.open("https://raydium.io/swap/?inputCurrency=sol&outputCurrency=EGiWZhNk3vUNJr35MbL2tY5YD6D81VVZghR2LgEFyXZh&inputAmount=0&outputAmount=0&fixed=out", "_blank")}
                />
            </div>
            <h2 className="text-center mt-3">Your user ID is</h2>
            <h2 className="text-sm text-center my-2">
              <span className="text-red-800 text-xs">{user.id}</span>
            </h2>
            {!user.verified ? (
              <div className="mt-5">
                <ButtonBlue
                  text="Verify Email"
                  onClick={async () => {
                    await toast.promise(
                      sendEmailVerification(
                        getAuth(getApp("bitmon")).currentUser
                      ),
                      {
                        loading: <b>Sending verification email</b>,
                        success: <b>Success</b>,
                        error: <b>Try again</b>,
                      }
                    );
                  }}
                />
              </div>
            ) : null}
            <h2 className="text-center mt-3">Your linked address is</h2>
            <h2 className="text-center mb-3">
              {user.address ? (
                <span className="text-red-800 text-xs">
                  {shortenString(user.address, 24)}
                </span>
              ) : (
                <span className="text-red-800 text-xs">
                  You don't have a linked address
                </span>
              )}
            </h2>
            {wallet.connected ? (
              <>
                <h2 className="text-center mt-3 mb-2 text-md">
                  On-Chain $BIT Balance
                </h2>
                <h2 className="text-center mb-3">
                  <span className="text-red-800 text-lg">{tokens}</span>
                </h2>
              </>
            ) : null}
            <h2 className="text-center mt-3 mb-2 text-md">
              In-Game $BIT Balance
            </h2>
            <h2 className="text-center mb-3">
              <span className="text-red-800 text-lg">{user.bit}</span>
            </h2>
            <h2 className="text-center mt-3 mb-2">Link or update address</h2>
            <div className="flex flex-row justify-center">{connect()}</div>
            {wallet.connected ? (
              <div className="mt-5">
                <ButtonBlue
                  text="Update"
                  onClick={async () => {
                    const sig = await wallet.signMessage(Buffer.from(user.id));
                    toast
                      .promise(
                        uploadSignature(
                          user.id,
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
                        setUser({
                          id: user.id,
                          address: wallet.publicKey.toString(),
                          bit: user.bit,
                          verified: user.verified,
                        })
                      );
                  }}
                />
              </div>
            ) : null}
            <div className="mt-5 w-[200px] mx-auto">
              <ButtonOrange
                text="Sign Out"
                onClick={async () => {
                  await getAuth(getApp("bitmon")).signOut();
                  await router.push("/auth/login");
                }}
              />
            </div>
 
          </div>
        </>
      )}
    </div>
  );
}
