import '../Style/About.css'
import React from 'react'
import { useParams } from 'react-router-dom'
import { fetchDataById } from '../../Apis/Dummy-api'
import { useEffect, useState } from 'react'

export const About = () => {
    const [description, setDescription] = useState('')
    const [title, setTitle] = useState('')
    const { id } = useParams() 
    
    useEffect(() => {
        fetchDataById(id).then((res) => {
            setDescription(res)
            setTitle(res.split(' ')[0].toUpperCase())
        }).catch((error) => {
            console.error('[ERROR FETCHING BY ID]: ' + error)
        })
    }, '')
 
    return(
        <div className="about-window">
            <label className='about-title'> {title} </label>
            <label>{description}</label>
        </div>
    )
}

export default About