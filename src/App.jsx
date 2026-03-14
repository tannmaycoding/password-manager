import { useState } from "react"
import Unlock from "./components/Unlock"
import Passwords from "./components/Passwords"
import Manager from "./components/Manager"

function App() {

  const [unlocked, setUnlocked] = useState(false)
  const [masterKey, setMasterKey] = useState("")

  if (!unlocked) {
    return (
      <Unlock
        setUnlocked={setUnlocked}
        setMasterKey={setMasterKey}
      />
    )
  }

  return (
    <>
    <h1 className="text-3xl font-bold py-15 text-center">Password Manager</h1>
    <Manager />
  <Passwords masterKey={masterKey}/>
  </>
  )
}

export default App