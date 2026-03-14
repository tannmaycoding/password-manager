import Password from "./Password"
import { useEffect, useState } from "react"

const Passwords = ({masterKey}) => {

  const [data, setData] = useState([])

  useEffect(() => {
    const passwords = localStorage.getItem("passwords")
    if (passwords) {
      setData(JSON.parse(passwords))
    }
  }, [])

  const deletePassword = (index) => {

    const updated = data.filter((_, i) => i !== index)

    setData(updated)

    localStorage.setItem("passwords", JSON.stringify(updated))
  }

  return (
    <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl m-3 border-2 border-gray-700 p-6">

      <h1 className="text-3xl font-bold text-white mb-6">
        Saved Passwords
      </h1>

      <div className="flex flex-wrap gap-4">

        {data.length === 0 ? (
          <p className="text-gray-400">No passwords saved yet.</p>
        ) : (
          data.map((item, index) => (
            <Password
              key={index}
              index={index}
              website={item.website}
              username={item.username}
              password={item.password}
              iv={item.iv}
              deletePassword={deletePassword}
              masterKey={masterKey}
            />
          ))
        )}

      </div>

    </div>
  )
}

export default Passwords