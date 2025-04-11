import { useContext } from "react";
import { SistemContext } from "./sistemContext";
import { JsonContext } from "./jsonContext";
//hooks yang mengembalikan nilai dari Sistemcontext

export function useSistem() {
  return useContext(SistemContext);
}

export function useJson() {
  return useContext(JsonContext);
}
