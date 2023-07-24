import React, { useState } from "react";
import { createContext } from "react";
import axios from "axios";

export const TermPolicyContext = createContext()

export const TermPolicyProvider = (props) => {
    const url = 'https://faiz-web.my.id/api/terms_policies'
    const [data, setData] = useState(null)

    const [input, setInput] = useState({
        terms: "",
        policy: "",
    })

    const [fetchStatus, setFetchStatus] = useState(true)

    let [currentId, setCurrentId] = useState(-1)

    const handleInput = (event) => {
        let name = event.target.name
        let value = event.target.value

        if (name === 'terms') {
            setInput({ ...input, terms: value })
        }
        if (name === 'policy') {
            setInput({ ...input, policy: value })
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        let {
            terms,
            policy
        } = input

        if (currentId === -1) {
            axios.post(url, {
                terms,
                policy
            })
                .then((res) => {
                    console.log(res)
                    setFetchStatus(true)
                }).catch((error) => {
                    console.log(error)
                })
        } else {
            axios.put(`${url}/${currentId}`, {
                terms,
                policy
            })
                .then((res) => {
                    setFetchStatus(true)
                }).catch((error) => {
                    console.log(error)
                })
        }

        setCurrentId(-1)

        setInput({
            terms: "",
            policy: ""
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
                    terms: data.terms,
                    policy: data.policy
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
        <TermPolicyContext.Provider value={
            {
                state,
                handleFunction
            }
        }>
            {props.children}
        </TermPolicyContext.Provider>
    )
}