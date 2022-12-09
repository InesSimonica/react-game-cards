import { useEffect, useState } from 'react'
import Card from '../card/card'
import { fetchData } from '../../apis/dummy-api'
import './homepage.css'

export default function Homepage() {
    const [cards, setCards] = useState([])
	const [errorMessage, setErrorMessage] = useState([])

	const numberOfCards = 20

    useEffect(() => {
        fetchData(numberOfCards).then((res) => {setCards(res)}).catch((e) => {
            setErrorMessage(e)
            console.error('[ERROR IN HOMEPAGE COMPONENT FETCH DATA]: ' + errorMessage)
        })
    }, [])

    return(
        <div className= 'cards-container'>
            {cards.map((element) =>
                <Card
                    key = {element.id}
                    id = {element.id}
                    title = {element.title}
                    imageUrl = {element.url}
                    description = {element.description}
                />
            )}
            
        </div>

    )
}

