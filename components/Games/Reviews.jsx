import { React, useState, useRef, useEffect } from 'react'
import UserDefault from '../../src/img/user_default.png';
import { IconSend } from '../Utils/Icons';


const Reviews = () => {

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [onRatingSelected, setOnRatingSelected] = useState(null);


    const handleClick = (value) => {
        setRating(value);
        if (onRatingSelected) {
            onRatingSelected(value);
        }
    };


    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };


    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.style.height = 'auto'; // Resetear la altura para recalcular
            inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
        }
    }, [inputValue]);


    return (
        <div className='reviews__container'>

            <div className='reviews__title'>
                <span>Comentarios:</span>
            </div>

            <section className='reviews__comennt'>
                <div className='reviews__comment-content'>


                    <div className='reviews__comment-input'>

                        <div className="chat-container">
                            <div className='rating__star rating__star--coment'>
                                <span>Calificacion:  </span>
                                <div className='rating__star-img'>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span key={star}
                                            onClick={() => handleClick(star)}
                                            onMouseEnter={() => setHover(star)}
                                            onMouseLeave={() => setHover(0)}
                                            className={`star ${star <= (hover || rating) ? "active" : ""}`}
                                        >
                                            ★
                                        </span>
                                    ))}

                                </div>
                            </div>
                            <div className="input-area">
                                <textarea
                                    ref={inputRef}
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    placeholder="Escribe tu comentario..."
                                    className='input-area-text'
                                />
                                <div className='reviews__comment-button'>
                                    <span><IconSend /></span>
                                </div>
                            </div>



                        </div>
                    </div>

                </div>
            </section>


            <div className='reviews__cards'>
                <div className='reviews__card-header'>
                    <div className='reviews__info'>

                        <figure className='reviews__info-img'>
                            <img src={UserDefault} alt="User" className='reviews__info-img-img' />
                        </figure>

                        <div className='reviews__info-body'>
                            <div className='reviews__info-name'>
                                <span>nombre usuario</span>
                            </div>
                        </div>
                    </div>

                    <section className='reviews__info-comment-rating'>
                        <div className='reviews__rating'>
                            <div className='rating__container'>
                                <div className='rating__stars'>
                                    <div className='rating__star'>
                                        <div className='rating__star-img'>
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <span key={star}
                                                    onClick={() => handleClick(star)}
                                                    onMouseEnter={() => setHover(star)}
                                                    onMouseLeave={() => setHover(0)}
                                                    className={`star ${star <= (hover || rating) ? "active" : ""}`}
                                                >
                                                    ★
                                                </span>
                                            ))}

                                        </div>
                                        <div className='rating__star-text'>
                                            {rating}
                                        </div>
                                        <div className='rating__star-date'>
                                            <span> {new Date().toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className='review__comment'>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim repellendus atque alias rerum. Repellat exercitationem omnis architecto! Nobis delectus cum molestias esse accusamus, corrupti reiciendis temporibus dolores sint omnis impedit?</p>
                        </div>
                    </section>
                </div>
            </div>

            <div className='reviews__cards'>
                <div className='reviews__card-header'>
                    <div className='reviews__info'>

                        <figure className='reviews__info-img'>
                            <img src={UserDefault} alt="User" className='reviews__info-img-img' />
                        </figure>

                        <div className='reviews__info-body'>
                            <div className='reviews__info-name'>
                                <span>nombre usuario</span>
                            </div>
                        </div>
                    </div>

                    <section className='reviews__info-comment-rating'>
                        <div className='reviews__rating'>
                            <div className='rating__container'>
                                <div className='rating__stars'>
                                    <div className='rating__star'>
                                        <div className='rating__star-img'>
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <span key={star}
                                                    onClick={() => handleClick(star)}
                                                    onMouseEnter={() => setHover(star)}
                                                    onMouseLeave={() => setHover(0)}
                                                    className={`star ${star <= (hover || rating) ? "active" : ""}`}
                                                >
                                                    ★
                                                </span>
                                            ))}

                                        </div>
                                        <div className='rating__star-text'>
                                            {rating}
                                        </div>
                                        <div className='rating__star-date'>
                                            <span> {new Date().toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className='review__comment'>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim repellendus atque alias rerum. Repellat exercitationem omnis architecto! Nobis delectus cum molestias esse accusamus, corrupti reiciendis temporibus dolores sint omnis impedit?</p>
                        </div>
                    </section>
                </div>
            </div>

            <div className='reviews__cards'>
                <div className='reviews__card-header'>
                    <div className='reviews__info'>

                        <figure className='reviews__info-img'>
                            <img src={UserDefault} alt="User" className='reviews__info-img-img' />
                        </figure>

                        <div className='reviews__info-body'>
                            <div className='reviews__info-name'>
                                <span>nombre usuario</span>
                            </div>
                        </div>
                    </div>

                    <section className='reviews__info-comment-rating'>
                        <div className='reviews__rating'>
                            <div className='rating__container'>
                                <div className='rating__stars'>
                                    <div className='rating__star'>
                                        <div className='rating__star-img'>
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <span key={star}
                                                    onClick={() => handleClick(star)}
                                                    onMouseEnter={() => setHover(star)}
                                                    onMouseLeave={() => setHover(0)}
                                                    className={`star ${star <= (hover || rating) ? "active" : ""}`}
                                                >
                                                    ★
                                                </span>
                                            ))}

                                        </div>
                                        <div className='rating__star-text'>
                                            {rating}
                                        </div>
                                        <div className='rating__star-date'>
                                            <span> {new Date().toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className='review__comment'>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim repellendus atque alias rerum. Repellat exercitationem omnis architecto! Nobis delectus cum molestias esse accusamus, corrupti reiciendis temporibus dolores sint omnis impedit?</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Reviews