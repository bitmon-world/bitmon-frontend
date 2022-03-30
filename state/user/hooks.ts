import { useSelector } from "react-redux";
import { AppState } from "../index";

export function isLogged(): boolean {
  return useSelector((state: AppState) => state);
}
