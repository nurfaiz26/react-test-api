import React, { useState } from "react";
import Cookies from "js-cookie"
import axios from "axios";
import { useNavigate } from "react-router-dom";

let Login = () => {
    let navigate = useNavigate()
    const [input, setInput] = useState({
        email: "",
        password: ""
    })

    const handleChange = (event) => {

        let value = event.target.value
        let name = event.target.name

        setInput({ ...input, [name]: value })
    }

    const handleLogin = (event) => {
        event.preventDefault()

        let { email, password } = input

        axios.post("https://faiz-web.my.id/api/login", { email: email, password: password })
            .then((res) => {
                console.log(res)
                let { token } = res.data
                Cookies.set('token', token, { expires: 1 })
                navigate('/')
            }).catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
            <header className="bg-blue-200 ">
                <div className="container mx-auto px-6 py-20">
                    <h1 className="text-4xl font-bold text-center text-gray-800">
                        Log In
                    </h1>
                </div>
            </header>
            <form className="text-left m-20" onSubmit={handleLogin}>
                <div className="mb-6">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Email
                    </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="john.doe@company.com"
                        required
                        onChange={handleChange}
                        value={input.email}
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="•••••••••"
                        required
                        onChange={handleChange}
                        value={input.password}
                    />
                </div>
                <button
                    type={'submit'}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Submit
                </button>
            </form>
        </>
    )
}

export default Login