import React from 'react';

const Star = ({ rating, handleClick, setHover, hover, isReadOnly = false }) => {


    const displayRating = isReadOnly ? rating : (hover || rating);

    return (
        <div className='rating__stars'>
            <div className='rating__star'>
                <div className='rating__star-img'>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            onClick={isReadOnly ? undefined : () => handleClick(star)}
                            onMouseEnter={isReadOnly ? undefined : () => setHover(star)}
                            onMouseLeave={isReadOnly ? undefined : () => setHover(0)}
                            className={`star ${star <= displayRating ? "active" : ""}`}
                            style={{ cursor: isReadOnly ? 'default' : 'pointer' }}
                        >
                            ★
                        </span>
                    ))}
                </div>

                {isReadOnly && (
                    <div className='rating__star-date'>

                        <span> {new Date().toLocaleDateString()}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Star;