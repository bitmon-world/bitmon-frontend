import { FC, Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import Link from "next/link";
import { ButtonGreen, ButtonOrange, ButtonRed } from "../Button";
import { shortenString } from "../../functions/format";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { classNames } from "../../functions/classnames";
import { ChevronDownIcon } from '@heroicons/react/solid'

const navigation = [
  // { name: "litepaper", href: "/#litepaper" },
  // { name: "roadmap",   href: "/#roadmap" },
  { name: "my user",   href: "/user" },
  // { name: "wiki",      href: "https://bitmon.fandom.com/wiki/Bitmon_Adventures_Wiki" },
  // { name: "market",    href: "https://magiceden.io/creators/bitmon_world", target: "_blank"},
  // { name: "stake",     href: "https://stake.bitmon.io/" },
  // { name: "creator",   href: "/creator" }
];

export const Header: FC<{ background: boolean }> = ({ background }) => {

  function btnRed(): JSX.Element {
    return  (
      <ButtonRed
        text="PLAY NOW"
        onClick= {() => {
          window.location.href='/user';
          }}
      />
    )
  }

  function bitmons(): JSX.Element {
    return (
      <Menu as="div" className="relative">
        <div>
          <Menu.Button>
            <div className="text-sm mx-0.5 px-1.5 py-1 text-white cursor-pointer hover:text-grey uppercase">
              <p>Bitmons</p>
            </div>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right md:absolute left-0 md:right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              {() => (
                <a href="#" className={"block px-4 py-2 text-sm text-gray-700"}>
                  Your Profile
                </a>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    );
  }

  function socials(): JSX.Element {
    return (
      <div className="flex flex-row justify-center md:mr-3 gap-x-2 mt-2">
        
        <a href="https://discord.gg/wtFBBAg5r5" target="_blank" rel="noreferrer">
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
        <a href="https://www.reddit.com/r/bitmon" target="_blank" rel="noreferrer">
          <Image
            src="/icons/reddit.svg"
            width="35"
            height="35"
            alt="Bitmon Reddit"
          />
        </a>
      </div>
    );
  }

  function trainers(): JSX.Element {
    return (
      <Menu as="div" className="relative ">
        {/* <div>
        <Menu.Button className="text-sm mx-0.5 px-2 py-2 text-white inline-flex w-full justify-center rounded-md bg-black bg-opacity-5 hover:bg-opacity-30 uppercase">
              <p>Trainer</p>
              <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
              />
          </Menu.Button>
        </div> */}
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right md:absolute left-0 md:right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              <div className="block px-4 py-2 text-sm uppercase">
                <Link href="https://stake.bitmon.io/" passHref>
                  Stake
                </Link>
              </div>
            </Menu.Item>
            <div className="block px-4 py-2 text-sm uppercase">
              <Link href="/creator" passHref>
                  Customize
              </Link>
            </div>
            <div className="block px-4 py-2 text-sm uppercase">
              <Link href="https://magiceden.io/creators/bitmon_world" passHref>
                <a
                  href="https://magiceden.io/creators/bitmon_world"
                  target="_blank"
                  rel="noreferrer"
                >
                  Market (Buy)
                </a>
              </Link>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    );
  }

  function bitToken(): JSX.Element {
    return (
      <Menu as="div" className="relative ">
        {/* <div>
        <Menu.Button className="text-sm mx-0.5 px-2 py-2 text-white inline-flex w-full justify-center rounded-md bg-black bg-opacity-5 hover:bg-opacity-30">
              $BIT TOKEN
              <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
              />
          </Menu.Button>
        </div> */}
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          {/* <Menu.Items className="origin-top-right md:absolute left-0 md:right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              <div className="block px-4 py-2 text-sm uppercase">
                <Link href="https://bitmon-adventures.gitbook.io/welcome-to-gitbook/" passHref>
                  What is $BIT?
                </Link>
              </div>
            </Menu.Item>
            <div className="block px-4 py-2 text-sm uppercase">
              <Link href="https://raydium.io/swap/?inputCurrency=sol&outputCurrency=EGiWZhNk3vUNJr35MbL2tY5YD6D81VVZghR2LgEFyXZh&inputAmount=0&outputAmount=0&fixed=out" passHref>
                <a
                  href="https://raydium.io/swap/?inputCurrency=sol&outputCurrency=EGiWZhNk3vUNJr35MbL2tY5YD6D81VVZghR2LgEFyXZh&inputAmount=0&outputAmount=0&fixed=out"
                  target="_blank"
                  rel="noreferrer"
                >
                  Buy $BIT
                </a>
              </Link>
            </div>
            <div className="block px-4 py-2 text-sm uppercase">
              <Link href="https://stake.bitmon.io/" passHref>
                <a
                  href="https://stake.bitmon.io/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Stake (Claim $BIT)
                </a>
              </Link>
            </div>
            <div className="block px-4 py-2 text-sm uppercase">
              <Link href="https://bitmon-adventures.gitbook.io/welcome-to-gitbook/bit-tokenomics/emmisions" passHref>
                <a
                  href="https://bitmon-adventures.gitbook.io/welcome-to-gitbook/bit-tokenomics/emmisions"
                  target="_blank"
                  rel="noreferrer"
                >
                  Tokenomics
                </a>
              </Link>
            </div>
            <div className="block px-4 py-2 text-sm">
              <Link href="https://www.coingecko.com/es/monedas/bitmon" passHref>
                <a
                  href="https://www.coingecko.com/es/monedas/bitmon"
                  target="_blank"
                  rel="noreferrer"
                >
                  CoinGecko
                </a>
              </Link>
            </div>
          </Menu.Items> */}
        </Transition>
      </Menu>
    );
  }

  function community(): JSX.Element {
    return (
      <Menu as="div" className="relative ">
        {/* <div> */}
        {/* <Menu.Button className="text-sm mx-0.5 px-2 py-2 text-white inline-flex w-full justify-center rounded-md bg-black bg-opacity-5 hover:bg-opacity-30 uppercase"> */}
            {/* <div className="text-sm mx-0.5 px-1.5 py-1 text-white cursor-pointer hover:text-grey uppercase"> */}
              {/* Community
              <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
              /> */}
            {/* </div> */}
          {/* </Menu.Button> */}
        {/* </div> */}
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right md:absolute left-0 md:right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              <div className="block px-4 py-2 text-sm uppercase">
                <Link href="https://bitmon.fandom.com/wiki/Bitmon_Adventures_Wiki" passHref>
                <a
                  href="https://bitmon.fandom.com/wiki/Bitmon_Adventures_Wiki"
                  target="_blank"
                  rel="noreferrer"
                >
                  Wiki
                </a>
                </Link>
              </div>
            </Menu.Item>
            <div className="block px-4 py-2 text-sm uppercase">
              <Link href="https://twitter.com/BitmonWorld" passHref>
                <a
                  href="https://twitter.com/BitmonWorld"
                  target="_blank"
                  rel="noreferrer"
                >
                  Twitter
                </a>
              </Link>
            </div>
            <div className="block px-4 py-2 text-sm uppercase">
              <Link href="https://discord.gg/bitmon" passHref>
                <a
                  href="https://discord.gg/bitmon"
                  target="_blank"
                  rel="noreferrer"
                >
                  Discord
                </a>
              </Link>
            </div>
            <div className="block px-4 py-2 text-sm uppercase">
              <Link href="https://www.reddit.com/r/bitmon" passHref>
                <a
                  href="https://www.reddit.com/r/bitmon"
                  target="_blank"
                  rel="noreferrer"
                >
                  Reddit
                </a>
              </Link>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    );
  }

  const wallet = useWallet();

  const modal = useWalletModal();

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
    <Disclosure
      as="nav"
      className={classNames(
        "flex-shrink-0 w-full relative z-20",
        background ? "header-background" : ""
      )}
    >
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                <Disclosure.Button className="flex flex-row justify-end items-center p-2 rounded-md text-white hover:text-high-emphesis focus:outline-none">
                  <span className="sr-only">Open main menu</span>
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
                </Disclosure.Button>
              </div>
              <div className="flex flex-row items-center">
                <div className="flex justify-center">
                    <a href="https://bitmon-website-p9wi.vercel.app/">
                  {/* <Link href="/" passHref> */}
                      <Image
                        src="/img/bitmon.png"
                        width="150"
                        height="66"
                        alt="Bitmon Logo"
                      />
                  {/* </Link> */}
                    </a>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex flex-row justify-end uppercase text-lg items-center">
                    {bitToken()}
                    {trainers()}
                    {community()}
                    {navigation.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <div className="text-sm mx-1.5 py-1 text-white cursor-pointer hover:text-grey">
                          <p>{item.name}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="hidden md:block">{socials()}</div>
                <div className="hidden md:block">{connect()}</div>
                <div className="hidden md:block">{btnRed()}</div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden uppercase bg-blue">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className="text-sm mx-0.5 px-1.5 py-1 text-white cursor-pointer hover:text-grey uppercase block"
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              {bitToken()}
              {trainers()}
              {community()}
              {socials()}
              {connect()}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
