// Reviews.jsx
import React, { useState, useRef, useEffect } from 'react';
import UserDefault from '../../src/img/user_default.png';
import { IconRocket, IconSend, IconEdit, Icondelete } from '../Utils/Icons';
import GoogleAuth from '../Utils/googleAuth';
import { useAuth } from '../Context/authContext';
import Global from '../Utils/Global';
import Star from './Star';

const Reviews = ({ id_game }) => {

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);
    const [authorize, setAuthorize] = useState(false);
    const [cargando, setCargando] = useState(true);
    const { token, isLoading, id_usuario, authLogin } = useAuth();
    const [comments, setComments] = useState([]);
    const [editCommentId, setEditCommentId] = useState(null);
    const [editCommentText, setEditCommentText] = useState('');
    const [editCommentRating, setEditCommentRating] = useState(0);


    const handleStarClickForNewComment = (value) => {
        setRating(value);
    };

    const handleStarClickForEditComment = (value) => {
        setEditCommentRating(value);
    };

    const handleInputChange = (event) => {
        if (editCommentId) {
            setEditCommentText(event.target.value);
        } else {
            setInputValue(event.target.value);
        }
    };

    useEffect(() => {
        if (!editCommentId && inputRef.current) {
            inputRef.current.style.height = 'auto';
            inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
        }
    }, [inputValue, editCommentId]);

    useEffect(() => {
        devuelve_comments();
    }, [token, id_game]);


    const sendComment = async (e) => {
        e.preventDefault();

        const isEditing = editCommentId !== null;
        const currentRating = isEditing ? editCommentRating : rating;
        const currentCommentText = isEditing ? editCommentText : inputValue;
        const commentIdToSend = editCommentId;

        if (currentRating === 0) {
            alert("Por favor, selecciona una calificación.");
            return;
        }
        if (currentCommentText.trim() === "") {
            alert("Por favor, escribe un comentario.");
            return;
        }

        const body = {
            id_game: id_game,
            calificacion: currentRating,
            comentario: currentCommentText
        };

        try {
            let request;
            let url;
            let method = 'POST';

            if (isEditing) {
                url = Global.url + 'review/update/' + commentIdToSend;
            } else {
                url = Global.url + 'review/register';
            }

            request = await fetch(url, {
                method: method,
                body: JSON.stringify(body),
                headers: {
                    "authorization": token,
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            });

            const data = await request.json();

            if (data.status === "success") {
                setRating(0);
                setHover(0);
                setInputValue('');
                setEditCommentId(null);
                setEditCommentText('');
                setEditCommentRating(0);
                devuelve_comments();
            } else {
                alert(`Error al enviar comentario: ${data.message || 'Desconocido'}`);
            }
        } catch (error) {
            console.error("Error al enviar comentario:", error);
            alert("No se pudo conectar con el servidor para enviar el comentario.");
        }
    };


    const devuelve_comments = async () => {
        setCargando(true);
        try {

            const headers = { "Content-Type": "application/json" };
            if (token) {
                headers["authorization"] = token;
            }

            const request = await fetch(Global.url + 'review/list/' + id_game, {
                method: "GET",
                headers: headers
            });

            const data = await request.json();

            if (data.status === "success" && data.review) {
                setComments(data.review);
            } else {
                setComments([]);
                console.warn("No se pudieron cargar los comentarios o no hay comentarios para este juego.");
            }
        } catch (error) {
            console.error("Error al cargar comentarios:", error);
            setComments([]);
        } finally {
            setCargando(false);
        }
    };


    const editar = (commentToEdit) => {
        setEditCommentId(commentToEdit._id);
        setEditCommentText(commentToEdit.comentario);
        setEditCommentRating(commentToEdit.calificacion);

        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const cancelarEdicion = () => {
        setEditCommentId(null);
        setEditCommentText('');
        setEditCommentRating(0);
        setRating(0);
        setInputValue('');
    };

    const deleteComment = async (id) => {
        const response = await fetch(Global.url + 'review/delete/' + id, {
            method: "GET",
            headers: {
                "authorization": token,
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        if (data.status === "success") {
            setRating(0);
            setHover(0);
            setInputValue('');
            setEditCommentId(null);
            setEditCommentText('');
            setEditCommentRating(0);
            devuelve_comments();
        } else {
            alert(`Error al eliminar el comentario: ${data.message || 'Desconocido'}`);
        }
    };

    useEffect(() => {
        if (authorize) {
            authLogin(true);
        }
    }, [authorize]);


    return (
        <div className='reviews__container'>
            {!token && 
                <GoogleAuth Message='Inicia sesión para comentar' setAuthorize={setAuthorize}  setCargando={setCargando} />
            }
            {!cargando && (authorize || (!isLoading && token)) && !editCommentId && (
                <section>
                    <div className='reviews__title'>
                        <span>Deja tu comentario:</span>
                    </div>

                    <section className='reviews__comennt'>
                        <div className='reviews__comment-content'>
                            <div className='reviews__comment-input'>
                                <div className="chat-container">
                                    <div className='rating__star rating__star--coment'>
                                        <span>Calificación: </span>
                                        <div className='rating__star-img'>
                                            <Star
                                                rating={rating}
                                                handleClick={handleStarClickForNewComment}
                                                setHover={setHover}
                                                hover={hover}
                                                isReadOnly={false}
                                            />
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
                                            <span onClick={sendComment}><IconRocket /></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
            )}

            <div className='reviews__title'>
                <span>Comentarios Anteriores:</span>
            </div>

            {cargando && <p style={{ textAlign: 'center' }}>Cargando comentarios...</p>}

            {!cargando && comments && comments.length > 0 ? (
                comments.map(comment => {
                    const isCurrentCommentBeingEdited = editCommentId === comment._id;

                    return (
                        <div className='reviews__cards' key={comment._id}>
                            <div className='reviews__card-header'>
                                {!isCurrentCommentBeingEdited && (
                                    <div className='reviews__editar'>

                                        <div className='reviews__info'>
                                            <figure className='reviews__info-img'>
                                                <img src={comment.id_user?.picture || UserDefault} alt="User" className='reviews__info-img-img' />
                                            </figure>
                                            <div className='reviews__info-body'>
                                                <div className='reviews__info-name'>
                                                    <span>{comment.id_user?.name || 'Usuario Desconocido'}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <section className='reviews__info-comment-rating'>
                                            <div className='reviews__rating'>
                                                <div className='rating__container'>
                                                    <Star
                                                        rating={comment.calificacion}
                                                        isReadOnly={true}
                                                    />
                                                    <div className='reviews__editar-icon'>
                                                        {comment.id_user._id == id_usuario && (
                                                            <span className='reviews__editar-icon-span' onClick={() => editar(comment)}><IconEdit /></span>
                                                        )}
                                                    </div>
                                                    <div className='reviews__delete-icon'>
                                                        {comment.id_user._id == id_usuario && (
                                                            <span className='reviews__delete-icon-span' onClick={() => deleteComment(comment._id)}><Icondelete /></span>
                                                        )}
                                                    </div>

                                                </div>
                                            </div>
                                            <div className='review__comment'>
                                                <p>{comment.comentario}</p>
                                            </div>
                                        </section>
                                    </div>
                                )}
                            </div>

                            {isCurrentCommentBeingEdited && (
                                <section className='reviews__comennt'>
                                    <div className='reviews__comment-content'>
                                        <div className='reviews__comment-input'>
                                            <div className="chat-container">
                                                <div className='rating__star rating__star--coment'>
                                                    <span>Calificación: </span>
                                                    <div className='rating__star-img'>
                                                        <Star
                                                            rating={editCommentRating}
                                                            handleClick={handleStarClickForEditComment}
                                                            setHover={setHover}
                                                            hover={hover}
                                                            isReadOnly={false}
                                                        />
                                                    </div>
                                                    <span onClick={cancelarEdicion} style={{ cursor: 'pointer', marginLeft: '10px', color: 'red' }}>Cancelar</span>
                                                </div>
                                                <div className="input-area">
                                                    <textarea
                                                        ref={inputRef}
                                                        value={editCommentText}
                                                        onChange={handleInputChange}
                                                        placeholder="Escribe tu comentario..."
                                                        className='input-area-text'
                                                    />
                                                    <div className='reviews__comment-button'>
                                                        <span onClick={sendComment}><IconRocket /></span>                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            )}
                        </div>
                    );
                })
            ) : (
                !cargando && <p style={{ textAlign: 'center', marginTop: '20px' }}>Sé el primero en comentar este juego.</p>
            )}

        </div>
    );
};

export default Reviews;