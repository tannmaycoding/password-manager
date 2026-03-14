import { useState } from "react"

const Unlock = ({ setUnlocked, setMasterKey }) => {

  const [input, setInput] = useState("")
  const firstTime = !localStorage.getItem("vaultKey")

  const handleSubmit = () => {
    if (!input) return

    localStorage.setItem("vaultKey", input)
    setMasterKey(input)
    setUnlocked(true)
  }

  if (!firstTime) {
    const storedKey = localStorage.getItem("vaultKey")
    setMasterKey(storedKey)
    setUnlocked(true)
    return null
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white gap-4">

      <h1 className="text-3xl font-bold">
        Create Vault Key
      </h1>

      <input
        type="password"
        value={input}
        onChange={(e)=>setInput(e.target.value)}
        placeholder="Enter master key"
        className="bg-gray-800 p-2 rounded border border-gray-700"
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 px-4 py-2 rounded"
      >
        Create Vault
      </button>

    </div>
  )
}

export default Unlock