import { useContext } from "react";
import { SistemContext } from "./sistemContext";

//hooks yang mengembalikan nilai dari Sistemcontext

export function useSistem() {
  return useContext(SistemContext);
}
