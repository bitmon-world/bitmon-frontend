import { Provider, Program, Idl } from "@project-serum/anchor";
import { PROGRAM_NFT_STAKING } from "../../constants";
import idl from "./idl/staking.json";

export const getStakingProgram = (provider: Provider) => {
  return new Program(idl as Idl, PROGRAM_NFT_STAKING, provider);
};
