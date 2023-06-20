import React, { useState } from "react";
import { createContext } from "react";
import axios from "axios";

export const IklanContext = createContext()

export const IklanProvider = (props) => {
    const urlApi = 'https://faiz-web.my.id/api/iklans'
    const [data, setData] = useState(null)

    const [input, setInput] = useState({
        mitra: "",
        judul: "",
        imageUrl1: "",
        imageUrl2: "",
        imageUrl3: "",
        imageUrl4: "",
        imageUrl5: "",
        deskripsi: "",
        info: "",
        syarat: "",
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
        if (name === 'imageUrl1') {
            setInput({ ...input, imageUrl1: value })
        }
        if (name === 'imageUrl2') {
            setInput({ ...input, imageUrl2: value })
        }
        if (name === 'imageUrl3') {
            setInput({ ...input, imageUrl3: value })
        }
        if (name === 'imageUrl4') {
            setInput({ ...input, imageUrl4: value })
        }
        if (name === 'imageUrl5') {
            setInput({ ...input, imageUrl5: value })
        }
        if (name === 'deskripsi') {
            setInput({ ...input, deskripsi: value })
        }
        if (name === 'info') {
            setInput({ ...input, info: value })
        }
        if (name === 'syarat') {
            setInput({ ...input, syarat: value })
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
            imageUrl1,
            imageUrl2,
            imageUrl3,
            imageUrl4,
            imageUrl5,
            deskripsi,
            info,
            syarat,
            url,
        } = input

        if (currentId === -1) {
            axios.post(urlApi, {
                mitra,
                judul,
                imageUrl1,
                imageUrl2,
                imageUrl3,
                imageUrl4,
                imageUrl5,
                deskripsi,
                info,
                syarat,
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
                imageUrl1,
                imageUrl2,
                imageUrl3,
                imageUrl4,
                imageUrl5,
                deskripsi,
                info,
                syarat,
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
            imageUrl1: "",
            imageUrl2: "",
            imageUrl3: "",
            imageUrl4: "",
            imageUrl5: "",
            deskripsi: "",
            info: "",
            syarat: "",
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
                    imageUrl1: data.imageUrl1,
                    imageUrl2: data.imageUrl2,
                    imageUrl3: data.imageUrl3,
                    imageUrl4: data.imageUrl4,
                    imageUrl5: data.imageUrl5,
                    deskripsi: data.deskripsi,
                    info: data.info,
                    syarat: data.syarat,
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
        <IklanContext.Provider value={
            {
                state,
                handleFunction
            }
        }>
            {props.children}
        </IklanContext.Provider>
    )
}