import { handler as createUseAccount } from "./useAccount"

// export const setupHooks = (web3, provider) => {
//   return {
//     useAccount: createUseAccount(web3, provider),
//   }

//下はわかりにくいから、リファクタリング前のわかりやすい上を残しておいた！

export const setupHooks = (...deps) => {
  return {
    useAccount: createUseAccount(...deps),
  }
}
