import { useState } from "react"
import { decrypt } from "../utils/crypto"

const MASTER_KEY = import.meta.env.VITE_MASTER_KEY

const Password = ({ website, username, password, iv, index, deletePassword, masterKey }) => {

  const [show, setShow] = useState(false)
  const [realPassword, setRealPassword] = useState("")

  const copyText = (text) => {
    navigator.clipboard.writeText(text)
  }

  const togglePassword = async () => {

    if (!show) {
      const decrypted = await decrypt(password, iv, masterKey)
      setRealPassword(decrypted)
    }

    setShow(!show)
  }

  return (
    <div className="bg-gray-700 border border-gray-700 rounded-xl p-4 shadow-md hover:shadow-lg transition min-w-full max-w-md">

      <h2 className="text-xl font-bold text-white mb-3">
        {website}
      </h2>

      <div className="flex flex-col gap-2 text-gray-300">

        {/* Username */}
        <div className="flex items-center justify-between">

          <div>
            <span className="font-semibold text-gray-400">Username:</span> {username}
          </div>

          <button
            onClick={() => copyText(username)}
            className="text-gray-400 hover:text-white"
          >
            <span className="material-symbols-outlined text-lg">
              content_copy
            </span>
          </button>

        </div>

        {/* Password */}
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-400">Password:</span>

            <span className="font-mono tracking-wider">
              {show ? realPassword : "••••••••"}
            </span>
          </div>

          <div className="flex items-center gap-2">

            {/* Show */}
            <button
              onClick={togglePassword}
              className="text-gray-400 hover:text-white"
            >
              <span className="material-symbols-outlined text-lg">
                {show ? "visibility_off" : "visibility"}
              </span>
            </button>

            {/* Copy */}
            <button
              onClick={() => copyText(realPassword)}
              className="text-gray-400 hover:text-white"
            >
              <span className="material-symbols-outlined text-lg">
                content_copy
              </span>
            </button>

            {/* Delete */}
            <button
              onClick={() => deletePassword(index)}
              className="text-red-400 hover:text-red-300"
            >
              <span className="material-symbols-outlined text-lg">
                delete
              </span>
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Password