import React from 'react'
import { IconRocket } from '../Utils/Icons'

const Button = ({ handleSubmit, isUploading = false , children }) => {
    return (
        <button className='button__rocket' onClick={handleSubmit} disabled={isUploading}>
            <div class="svg-wrapper-1">
                <div class="svg-wrapper">
                    <IconRocket w={24} h={24} />
                </div>
            </div>
            <span>{children}</span>
        </button>
    )
}

export default Button