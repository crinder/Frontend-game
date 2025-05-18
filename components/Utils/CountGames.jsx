import { React, useEffect, useState } from 'react'
import { useAuth } from '../Context/authContext'


const CountGames = () => {

    const { count } = useAuth();

    return (
        <span className='icon-menu-cart'>{count}</span>
    )
}

export default CountGames