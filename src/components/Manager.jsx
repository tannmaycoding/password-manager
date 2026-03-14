import { useState, useEffect } from "react"
import { encrypt } from "../utils/crypto"

const Manager = () => {

    const [MASTER_KEY, setMasterKey] = useState("")
    const [form, setform] = useState({ website: "", username: "", password: "" })
    const [showPassword, setShowPassword] = useState(false)
    const [passwordArray, setPasswordArray] = useState([])
    const [showToast, setShowToast] = useState(false)

    useEffect(() => {

        // load vault key
        const key = localStorage.getItem("vaultKey")
        if (key) {
            setMasterKey(key)
        }

        // load passwords
        const passwords = localStorage.getItem("passwords")
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }

    }, [])

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const savePassword = async () => {

        if (!MASTER_KEY) {
            alert("Vault not initialized. Please refresh.")
            return
        }

        if (!form.website || !form.username || !form.password) {
            alert("Please fill all fields")
            return
        }

        const encrypted = await encrypt(form.password, MASTER_KEY)

        const newEntry = {
            website: form.website,
            username: form.username,
            password: encrypted.data,
            iv: encrypted.iv
        }

        const updatedArray = [...passwordArray, newEntry]

        setPasswordArray(updatedArray)

        localStorage.setItem("passwords", JSON.stringify(updatedArray))

        setShowToast(true)

        // clear form
        setform({ website: "", username: "", password: "" })

        // auto hide toast
        setTimeout(() => setShowToast(false), 2000)
        window.location.reload()
    }

    return (
        <div className="max-w-xl mx-auto bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-lg">

            <h2 className="text-3xl text-white text-center font-bold mb-6">
                Save Password
            </h2>

            <div className="flex flex-col gap-4">

                {/* Website */}
                <div className="flex flex-col gap-1">
                    <label className="text-gray-300 text-sm font-medium">
                        Website
                    </label>

                    <input
                        value={form.website}
                        placeholder="Enter website name"
                        name="website"
                        onChange={handleChange}
                        type="text"
                        className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                </div>

                {/* Username */}
                <div className="flex flex-col gap-1">
                    <label className="text-gray-300 text-sm font-medium">
                        Username
                    </label>

                    <input
                        value={form.username}
                        placeholder="Enter username"
                        name="username"
                        onChange={handleChange}
                        type="text"
                        className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1 relative">

                    <label className="text-gray-300 text-sm font-medium">
                        Password
                    </label>

                    <input
                        value={form.password}
                        placeholder="Enter password"
                        name="password"
                        onChange={handleChange}
                        type={showPassword ? "text" : "password"}
                        className="w-full px-4 py-3 pr-12 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-9 text-gray-400 hover:text-white"
                    >
                        <span className="material-symbols-outlined">
                            {showPassword ? "visibility_off" : "visibility"}
                        </span>
                    </button>

                </div>

                {/* Add Button */}
                <button
                    onClick={savePassword}
                    className="flex items-center justify-center gap-2 mt-2 bg-blue-600 hover:bg-blue-500 text-white font-medium px-5 py-3 rounded-lg transition shadow-md"
                >
                    <span className="material-symbols-outlined">add</span>
                    Add Password
                </button>

            </div>

            {showToast && (
                <div className="fixed bottom-5 left-5 max-w-xs w-full bg-gray-800 border border-gray-700 rounded-xl shadow-lg">

                    <div className="flex p-4 items-center">

                        <p className="text-sm text-white">
                            Password saved successfully
                        </p>

                        <div className="ml-auto flex items-center space-x-3">

                            <button
                                onClick={() => setShowToast(false)}
                                className="flex justify-center items-center w-5 h-5 text-gray-400 hover:text-white"
                            >
                                <span className="material-symbols-outlined">
                                    close
                                </span>
                            </button>

                        </div>

                    </div>

                </div>
            )}
        </div>
    )
}

export default Manager