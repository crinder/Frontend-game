import React from 'react'
import Global from '../Utils/Global';

const CardGames = ({ preview, price, description, name, img, descuento, plataform }) => {

    const maxLength = 100;
    const c_descrip = description.slice(0, maxLength) + (description.length > maxLength ? '...' : '');

    return (
        <div className='games__games'>
            <div className='game__card-list'>

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

                <section className='game__card-body-content'>

                    {plataform && plataform.map(plataform => {
                        return (
                            <span className='game__card-description-plataform' key={plataform}>{plataform}</span>
                        )
                    })

                    }

                    <div className='game__card-title'>

                        <span className='game__card-descuento'>${price} USD</span>
                        <span className='game__card-price'>${price} USD</span>

                    </div>



                </section>



            </div>
        </div>
    )
}

export default CardGames