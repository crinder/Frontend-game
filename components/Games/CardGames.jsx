import React from 'react'
import Global from '../Utils/Global';

const CardGames = ({ preview, price, description, name, img }) => {

    const maxLength = 100;
    const c_descrip = description.slice(0, maxLength) + (description.length > maxLength ? '...' : '');

    console.log('preview...', preview);

    return (
        <div className='games__games'>
            <div className='game__card-list'>

                <div className='game__card-title'>
                    <span>Precio: {price}</span>
                </div>

                <div className='game__card'>
                    <div className='game__card-img'>
                        {preview == 'E' ?
                            <img src={Global.url + 'game/images/' + img} alt="Card" className='game__card-img-img' />
                            :
                            <img src={preview} alt="Card" className='game__card-img-img' />
                        }

                    </div>
                </div>

                <div className='card__category-body'>
                    <h4 className='card__category-body-title'>{name}</h4>
                </div>

                <div className='game__card-body'>
                    <div className='game__card-description'>

                        <p>{c_descrip}</p>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default CardGames