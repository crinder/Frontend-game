import { React, useState } from 'react'
import { IconSearch, IconClose } from '../Utils/Icons'

const Search = () => {

    const [isOpen, setIsOpen] = useState(false);
    const buscar = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div>
            <div className="input-wrapper-search">
                <button className="icon__search">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="25px" width="25px">
                        <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#fff" d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" />
                        <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#fff" d="M22 22L20 20" />
                    </svg>
                </button>
                <input placeholder="search.." className="input" name="text" type="text" />
            </div>
        </div>
    )
}

export default Search