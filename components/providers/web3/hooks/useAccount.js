import { useEffect } from "react"
import useSWR from "swr"

const adminAddresses = {
  "0x3a0a50243a16ebdf953e73e963eab6acc01ea7bdfdbbf8b9cf7db1ea2ef9cc82": true,
}

export const handler = (web3, provider) => () => {
  const { data, mutate, ...rest } = useSWR(
    () => (web3 ? "web3/accounts" : null),
    async () => {
      const accounts = await web3.eth.getAccounts()
      return accounts[0]
    }
  )

  useEffect(() => {
    provider &&
      provider.on("accountsChanged", (accounts) => mutate(accounts[0] ?? null))
  }, [provider])

  return {

    data,
    isAdmin: (data && adminAddresses[web3.utils.keccak256(data)]) ?? false,
    mutate,
    ...rest,

  }
}
