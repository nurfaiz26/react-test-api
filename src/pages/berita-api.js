import React, { useContext } from "react";
import { useEffect } from 'react';
import { BeritaContext } from "../contexts/beritaContext";
import { useParams } from "react-router-dom";
import axios from "axios";

let BeritaApi = () => {
    const { state, handleFunction } = useContext(BeritaContext)

    let { variableIdData } = useParams()

    const {
        data,
        input, setInput,
        fetchStatus, setFetchStatus,
    } = state

    const {
        handleDelete,
        handleEdit,
        handleInput,
        handleSubmit,
        fetchData,
    } = handleFunction

    useEffect(() => {
        if (fetchStatus === true) {
            fetchData()
        }

        if (variableIdData !== undefined) {
            axios.get(`https://faiz-web.my.id/api/beritas/${variableIdData}`)
                .then((res) => {
                    let data = res.data

                    setInput({
                        mitra: data.mitra,
                        judul: data.judul,
                        imageUrl: data.imageUrl,
                        deskripsi: data.deskripsi,
                        url: data.url,
                    })
                })
        }
    }, [fetchStatus, setFetchStatus, fetchData, setInput, variableIdData])

    return (
        <>
            <div className="relative overflow-x-auto my-10 mx-20 font-bold text-lg text-left">
                <h1>Manage Data</h1>
            </div>

            <div className="relative overflow-x-auto mx-20 sm:rounded-lg shadow-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className='bg-purple-500 text-white'>
                            <th scope="col" className="px-6 py-3">
                                NO
                            </th>
                            <th scope="col" className="px-6 py-3">
                                MITRA
                            </th>
                            <th scope="col" className="px-6 py-3">
                                JUDUL
                            </th>
                            <th scope="col" className="px-6 py-3">
                                URL GAMBAR
                            </th>
                            <th scope="col" className="px-6 py-3">
                                DESKRIPSI
                            </th>
                            <th scope="col" className="px-6 py-3">
                                URL
                            </th>
                            <th scope="col" className="px-6 py-3">
                                ACTION
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data !== null && data.map((res, index) => {
                            return (
                                <>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {index += 1}
                                        </th>
                                        <td className="px-6 py-1 truncate max-w-sm">
                                            {res.mitra}
                                        </td>
                                        <td className="px-6 py-1 truncate max-w-sm">
                                            {res.judul}
                                        </td>
                                        <td className="px-6 py-1 truncate max-w-sm">
                                            {res.imageUrl}
                                        </td>
                                        <td className="px-6 py-1 truncate max-w-sm">
                                            {res.deskripsi}
                                        </td>
                                        <td className="px-6 py-1 truncate max-w-sm">
                                            {res.url}
                                        </td>
                                        <td className="px-6 py-1 flex">
                                            <button onClick={handleEdit} value={res.id} type="button" className="text-gray-900 bg-yellow-200 border border-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">Edit</button>
                                            <button onClick={handleDelete} value={res.id} type="button" className="text-white bg-red-600 border border-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">Delete</button>
                                        </td>
                                    </tr>
                                </>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <div className="relative overflow-x-auto my-10 mx-20 font-bold text-lg text-left">
                <h1>Form Data</h1>
            </div>

            <div className="relative overflow-x-auto my-10 mx-20 text-left">
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label
                            htmlFor="mitra"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Mitra:
                        </label>
                        <input
                            type="text"
                            id="mitra"
                            name="mitra"
                            required
                            onChange={handleInput}
                            value={input.mitra}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="judul"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Judul:
                        </label>
                        <input
                            type="text"
                            id="judul"
                            name="judul"
                            required
                            onChange={handleInput}
                            value={input.judul}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="imageUrl"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            ImageUrl:
                        </label>
                        <input
                            type="text"
                            id="imageUrl"
                            name="imageUrl"
                            required
                            onChange={handleInput}
                            value={input.imageUrl}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="deskripsi"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Deskripsi:
                        </label>
                        <input
                            type="text"
                            id="deskripsi"
                            name="deskripsi"
                            required
                            onChange={handleInput}
                            value={input.deskripsi}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="url"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Url:
                        </label>
                        <input
                            type="text"
                            id="url"
                            name="url"
                            required
                            onChange={handleInput}
                            value={input.url}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <button
                        type={'submit'}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    )
}

export default BeritaApi