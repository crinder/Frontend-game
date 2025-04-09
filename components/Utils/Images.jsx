import { React, useEffect, useState } from 'react'
import Global from './Global'

const Images = ({ nombreImg }) => {

    return (
        <div className='card__category-grandient'>
            <img src={Global.url + 'category/images/' + nombreImg} alt=""
                className='card__category-img-img'
            />
        </div>
    )
}

export default Images