import { useEffect, useState } from 'react'
import Card from '../Card/Card'
import { fetchData } from '../../Apis/Dummy-api'
import '../Style/Homepage.css'
import RecentlyPlayedZone from '../Recently-played-zone/Recently-played-zone'

export const Homepage = () =>  {
    const [cards, setCards] = useState([])
	const [recentlyPlayedCards, setRecentlyPlayedCards] = useState([])
	const numberOfCards = 36
    const numberOfRecentlyPlayedCards = 4

    useEffect(() => {
        fetchData(numberOfCards)
        .then(setCards) //directly doing (res) => setCards(res)
        .catch((error) => {
            console.error('[ERROR IN HOMEPAGE COMPONENT FETCH DATA]: ' + error)
        })
    }, [])

    const addRecentCard = (clickedCardId) => {
        const foundElement = recentlyPlayedCards.find((element) => element.id === clickedCardId)
        if(!foundElement) {
            setRecentlyPlayedCards((oldCardsArray) => {         
                const newCard = cards.find((element) => element.id === clickedCardId)
                if (oldCardsArray.length >= numberOfRecentlyPlayedCards) {
                    return [newCard, ...oldCardsArray.slice(0, oldCardsArray.length - 1)]
                }
                else {  
                    return [...oldCardsArray, newCard]
                }
            })
        }

        
    }

    return(
        <div className='homepage-container'>
            <div className= 'cards-container'>
                {cards.map(({id, title, url, description}) =>
                    <Card
                        key={id}
                        id={id}
                        title={title}
                        imageUrl={url}
                        description={description}
                        addRecentCard={addRecentCard}
                    />
                )}
            </div>
            <RecentlyPlayedZone
                receivedCards={recentlyPlayedCards}
                addRecentCard={addRecentCard}
            />
        </div>
    )
}

export default Homepage
