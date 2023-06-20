import React, { useState } from "react";
import { createContext } from "react";
import axios from "axios";

export const BeritaContext = createContext()

export const BeritaProvider = (props) => {
    const urlApi = 'https://faiz-web.my.id/api/beritas'
    const [data, setData] = useState(null)

    const [input, setInput] = useState({
        mitra: "",
        judul: "",
        imageUrl: "",
        deskripsi: "",
        url: "",
    })

    const [fetchStatus, setFetchStatus] = useState(true)

    let [currentId, setCurrentId] = useState(-1)

    const handleInput = (event) => {
        let name = event.target.name
        let value = event.target.value

        if (name === 'mitra') {
            setInput({ ...input, mitra: value })
        }
        if (name === 'judul') {
            setInput({ ...input, judul: value })
        }
        if (name === 'imageUrl') {
            setInput({ ...input, imageUrl: value })
        }
        if (name === 'deskripsi') {
            setInput({ ...input, deskripsi: value })
        }
        if (name === 'url') {
            setInput({ ...input, url: value })
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        let {
            mitra,
            judul,
            imageUrl,
            deskripsi,
            url,
        } = input

        if (currentId === -1) {
            axios.post(urlApi, {
                mitra,
                judul,
                imageUrl,
                deskripsi,
                url,
            })
                .then((res) => {
                    console.log(res)
                    setFetchStatus(true)
                }).catch((error) => {
                    console.log(error)
                })
        } else {
            axios.put(`${urlApi}/${currentId}`, {
                mitra,
                judul,
                imageUrl,
                deskripsi,
                url,
            })
                .then((res) => {
                    setFetchStatus(true)
                }).catch((error) => {
                    console.log(error)
                })
        }

        setCurrentId(-1)

        setInput({
            mitra: "",
            judul: "",
            imageUrl: "",
            deskripsi: "",
            url: "",
        })
    }

    const handleDelete = (event) => {
        let idData = parseInt(event.target.value)

        axios.delete(`${urlApi}/${idData}`)
            .then((res) => {
                setFetchStatus(true)
            }).catch((error) => {
                console.log(error)
            })
    }

    const handleEdit = (event) => {
        let idData = parseInt(event.target.value)
        setCurrentId(idData)
        axios.get(`${urlApi}/${idData}`)
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

    const fetchData = () => {
        axios.get(urlApi).then((res) => {
            // console.log('res = '.res)
            setData([...res.data])
        }).catch((error) => {
            console.log(error)
        })
        setFetchStatus(false)
    }

    let state = {
        data, setData,
        input, setInput,
        fetchStatus, setFetchStatus,
        currentId, setCurrentId,
    }

    let handleFunction = {
        handleDelete,
        handleEdit,
        handleInput,
        handleSubmit,
        fetchData
    }

    return (
        <BeritaContext.Provider value={
            {
                state,
                handleFunction
            }
        }>
            {props.children}
        </BeritaContext.Provider>
    )
}