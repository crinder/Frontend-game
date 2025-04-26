import React from 'react'
import { Icondelete } from '../Utils/Icons';
import Global from '../Utils/Global';

const PreviewDnD = ({ items, img, setDelImg }) => {

    const deleteImage = (id) => {
        setDelImg(id);
    }

    return (
        <div className='preview__dnd-container'>

            <div className='preview__dnd'>

                <div className='preview__dnd-card'>
                    <div className='preview__dnd-img' onClick={() => deleteImage(items.id)}>
                        {items.image ?
                            <img src={Global.url + 'slider/images/' + items.image} alt="Card" className='game__card-img-img slider__dnd-img' />
                            :
                            <img src={items.url} alt="Card" className='game__card-img-img slider__dnd-img' />
                        }

                        <div className='preview__dnd-delete' onClick={() => deleteImage(items.id)}>
                            <div className='preview-icon'>
                            <Icondelete />
                            </div>
                           
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default PreviewDnD