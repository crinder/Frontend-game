import { React, useState } from 'react'
import { IconSearch, IconClose } from '../Utils/Icons'

const Search = () => {

    const [isOpen, setIsOpen] = useState(false);
    const buscar = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div>
            <div className='search__wrapper'>
                
            <div {...(isOpen ? { className: 'search__input ' } : { className: 'search__input search--open' })}>
                        <div className='search__div'>
                            <span onClick={e => buscar()}><IconClose /></span>
                            <input type="text" placeholder="Buscar juegos" className='input__control' />
                        </div>
                    </div>
                    
                <div className='search__icon' onClick={e => buscar()}>
                    <IconSearch />
                    <div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search