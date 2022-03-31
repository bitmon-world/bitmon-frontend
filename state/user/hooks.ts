import { useSelector } from "react-redux";
import { AppState } from "../index";

export function useUserInformation() {
  return useSelector((state: AppState) => state.user);
}
