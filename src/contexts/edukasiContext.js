import React, { useState } from "react";
import { createContext } from "react";
import axios from "axios";

export const EdukasiContext = createContext()

export const EdukasiProvider = (props) => {
    const url = 'https://faiz-web.my.id/api/edukasis'
    const [data, setData] = useState(null)

    const [input, setInput] = useState({
        judul: "",
        deskripsi: "",
        imageUrl: "",
        materi: "",
        konten: "",
        tipe: "",
    })

    const [fetchStatus, setFetchStatus] = useState(true)

    let [currentId, setCurrentId] = useState(-1)

    const handleInput = (event) => {
        let name = event.target.name
        let value = event.target.value

        if (name === 'judul') {
            setInput({ ...input, judul: value })
        }
        if (name === 'deskripsi') {
            setInput({ ...input, deskripsi: value })
        }
        if (name === 'imageUrl') {
            setInput({ ...input, imageUrl: value })
        }
        if (name === 'materi') {
            setInput({ ...input, materi: value })
        }
        if (name === 'konten') {
            setInput({ ...input, konten: value })
        }
        if (name === 'tipe') {
            setInput({ ...input, tipe: value })
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        let {
            judul,
            deskripsi,
            imageUrl,
            materi,
            konten,
            tipe,
        } = input

        if (currentId === -1) {
            axios.post(url, {
                judul,
                deskripsi,
                imageUrl,
                materi,
                konten,
                tipe,
            })
                .then((res) => {
                    console.log(res)
                    setFetchStatus(true)
                }).catch((error) => {
                    console.log(error)
                })
        } else {
            axios.put(`${url}/${currentId}`, {
                judul,
                deskripsi,
                imageUrl,
                materi,
                konten,
                tipe,
            })
                .then((res) => {
                    setFetchStatus(true)
                }).catch((error) => {
                    console.log(error)
                })
        }

        setCurrentId(-1)

        setInput({
            judul: "",
            deskripsi: "",
            imageUrl: "",
            materi: "",
            konten: "",
            tipe: "",
        })
    }

    const handleDelete = (event) => {
        let idData = parseInt(event.target.value)

        axios.delete(`${url}/${idData}`)
            .then((res) => {
                setFetchStatus(true)
            }).catch((error) => {
                console.log(error)
            })
    }

    const handleEdit = (event) => {
        let idData = parseInt(event.target.value)
        setCurrentId(idData)
        axios.get(`${url}/${idData}`)
            .then((res) => {
                let data = res.data

                setInput({
                    judul: data.judul,
                    deskripsi: data.deskripsi,
                    imageUrl: data.imageUrl,
                    materi: data.materi,
                    konten: data.konten,
                    tipe: data.tipe,
                })
            })
    }

    const fetchData = () => {
        axios.get(url).then((res) => {
            console.log('res = '.res)
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
        <EdukasiContext.Provider value={
            {
                state,
                handleFunction
            }
        }>
            {props.children}
        </EdukasiContext.Provider>
    )
}