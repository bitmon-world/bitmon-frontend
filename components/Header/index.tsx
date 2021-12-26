import Image from "next/image";
import Link from "next/link";
import { Popover } from "@headlessui/react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { shortenString } from "../../functions/format";
import { ButtonGreen, ButtonOrange } from "../Button";

export const Header = () => {
  const modal = useWalletModal();

  function whitepaper(): JSX.Element {
    return (
      <Link href="/whitepaper" passHref>
        <div className="text-sm mx-0.5 px-1.5 py-1 text-white cursor-pointer hover:text-grey">
          <h2>Whitepaper</h2>
        </div>
      </Link>
    );
  }

  function about(): JSX.Element {
    return (
      <Link href="/about" passHref>
        <div className="text-sm mx-0.5 px-1.5 py-1 text-white cursor-pointer hover:text-grey">
          <h2>About</h2>
        </div>
      </Link>
    );
  }

  function roadmap(): JSX.Element {
    return (
      <Link href="/roadmap" passHref>
        <div className="text-sm mx-0.5 px-1.5 py-1 text-white cursor-pointer hover:text-grey">
          <h2>Roadmap</h2>
        </div>
      </Link>
    );
  }

  function team(): JSX.Element {
    return (
      <Link href="/team" passHref>
        <div className="text-sm mx-0.5 px-1.5 py-1 text-white cursor-pointer hover:text-grey">
          <h2>Team</h2>
        </div>
      </Link>
    );
  }

  function faq(): JSX.Element {
    return (
      <Link href="/faq" passHref>
        <div className="text-sm mx-0.5 px-1.5 py-1 text-white cursor-pointer hover:text-grey">
          <h2>FAQ</h2>
        </div>
      </Link>
    );
  }

  function bitdex(): JSX.Element {
    return (
      <Link href="/bitdex" passHref>
        <div className="text-sm mx-0.5 px-1.5 py-1 text-white cursor-pointer hover:text-grey">
          <h2>Bitdex</h2>
        </div>
      </Link>
    );
  }

  function creator(): JSX.Element {
    return (
      <Link href="/creator" passHref>
        <div className="text-sm mx-0.5 px-1.5 py-1 text-white cursor-pointer hover:text-grey">
          <h2>Creator</h2>
        </div>
      </Link>
    );
  }

  function socials() {
    return (
      <div className="flex flex-row justify-center mr-5 gap-x-4 mt-2">
        <a
          href="https://discord.gg/6PTUWzDZ8P"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src="/icons/discord.svg"
            width="35"
            height="35"
            alt="Bitmon Discord"
          />
        </a>
        <a
          href="https://twitter.com/BitmonWorld"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src="/icons/twitter.svg"
            width="35"
            height="35"
            alt="Bitmon Twitter"
          />
        </a>
      </div>
    );
  }

  const wallet = useWallet();

  return (
    <header className="flex-shrink-0 w-full header-background relative z-20">
      <Popover as="nav" className="w-full">
        {({ open }) => (
          <>
            <div className="px-4">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center cursor-pointer">
                  <Link href="/" passHref>
                    <a>
                      <Image
                        src="/img/bitmon.png"
                        width="150"
                        height="66"
                        alt="Bitmon Logo"
                      />
                    </a>
                  </Link>
                </div>
                <div className="hidden md:block sm:ml-2">
                  <div className="flex uppercase">
                    {/*{whitepaper()}*/}
                    {about()}
                    {roadmap()}
                    {team()}
                    {faq()}
                    {/*{bitdex()}*/}
                    {creator()}
                  </div>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <div className="hidden md:block">{socials()}</div>
                  {wallet.connected ? (
                    <ButtonOrange
                      text={shortenString(wallet.publicKey.toString(), 9)}
                      onClick={() => wallet.disconnect()}
                    />
                  ) : (
                    <ButtonGreen
                      text={"Connect"}
                      onClick={() => modal.setVisible(true)}
                    />
                  )}
                </div>
                <div className="flex -mr-2 md:hidden">
                  <Popover.Button className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-high-emphesis focus:outline-none">
                    <span className="sr-only">Open Menu</span>
                    {open ? (
                      <svg
                        className="block w-6 h-6"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="block w-6 h-6"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    )}
                  </Popover.Button>
                </div>
              </div>
            </div>
            <Popover.Panel className="sm:hidden uppercase">
              <div className="flex flex-col px-4 pt-2 pb-3 space-y-1 text-center">
                {/*{whitepaper()}*/}
                {about()}
                {roadmap()}
                {team()}
                {faq()}
                {/*{bitdex()}*/}
                {creator()}
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>
    </header>
    /*    <div className="header-background">
      <div className="flex flex-row items-center">

      </div>
    </div>*/
  );
};
