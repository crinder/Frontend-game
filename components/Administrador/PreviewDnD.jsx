import React from 'react'
import { Icondelete } from '../Utils/Icons';

const PreviewDnD = ({ preview, img , id, setDelImg }) => {

    const deleteImage = (id) => {
        setDelImg(id);
    }

    return (
        <div className='preview__dnd-container'>

            <div className='preview__dnd'>

                <div className='preview__dnd-card'>
                    <div className='game__card-img preview__dnd-img'>
                        {preview == 'E' ?
                            <img src={Global.url + 'game/images/' + img} alt="Card" className='game__card-img-img' />
                            :
                            <img src={preview} alt="Card" className='game__card-img-img slider__dnd-img' />
                        }

                        <div className='preview__dnd-delete' onClick={() => deleteImage(id)}>
                          <Icondelete />
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default PreviewDnD