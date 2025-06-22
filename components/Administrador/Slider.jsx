import React, { useEffect, useState } from 'react';
import Global from '../Utils/Global';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import Dropzone from './Dropzone';
import PreviewDnD from './PreviewDnD';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../Utils/Button';

const EditarSlider = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [delImg, setDelImg] = useState([]);
    const [idsEliminar, setIdsEliminar] = useState([]);

    useEffect(() => {
        devuelveSlider();
    }, []);

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
            return;
        }

        const newItems = Array.from(items);
        const [removed] = newItems.splice(source.index, 1);
        newItems.splice(destination.index, 0, removed);

        let newArr = newItems.map((item, index) => {

            return {
                id: item.id,
                position: index
            }

        });

        console.log(newArr);

        setItems(newItems);
    };

    const handleFilesSelected = (files) => {
        const newItems = files.map(file => ({
            id: Date.now().toString(36),
            file: file,
            url: URL.createObjectURL(file)
        }));
        setItems(prevItems => [...prevItems, ...newItems]);
    };


    const devuelveSlider = async () => {

        let body = {
            tipo: 'D'
        };

        const request = await fetch(Global.url + 'slider/list', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await request.json();

        if (data.status == 'success') {

            setItems(data.slider);
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!items || items.length === 0) {
            console.log("Por favor, selecciona una imagen.");
            return;
        }

        const formData = new FormData();
        items.forEach((item, index) => {
            if (item.file) {
                formData.append('files', item.file);
                formData.append('id', item.id);
            }

        });

        if (formData.get('files') != null) {

            setIsUploading(true);

            try {
                const request = await fetch(Global.url + 'slider/upload', {
                    method: 'POST',
                    body: formData,
                });

                const data = await request.json();

                if (data.status === 'success') {
                    console.log('Subida exitosa:', data);

                } else {
                    console.log('Error en la subida:', data);
                }
            } catch (error) {
                console.error('Error al enviar la petición:', error);
            } finally {
                setIsUploading(false);
            }
        }

        updatePosition();
    };

    const updatePosition = async () => {

        let newArr = items.map((item, index) => {

            return {
                id: item.id,
                position: index
            }

        });

        let body = {
            position: newArr,
            del: idsEliminar,
            tipo: 'D'
        }

        const request = await fetch(Global.url + 'slider/update', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await request.json();

        if (data.status == 'success') {
            console.log('posicion actualizada');
        }


    }

    useEffect(() => {

        if (delImg.length > 0) {

            console.log('delImg...', delImg);

            let newItems = items.filter(item => item.id != delImg);

            setItems(newItems);
            setIdsEliminar(prevItems => [...prevItems, delImg]);

        }

    }, [delImg]);

    useEffect(() => {
        console.log('idsEliminar...', idsEliminar);
    }, [idsEliminar]);

    const previewSlider = async (e) => {

        if (items) {
            handleSubmit(e);
            navigate('/ultra-games/preview-slider', { state: { items: items } });
        }

    }

    return (
        <div className='slider__container-slider'>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="items" direction="horizontal">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className='slider__bg'
                        >
                            <h3 onClick={(e) => previewSlider(e)}>Preview </h3>
                            <div className='slider__content'>
                                {items.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className='slider__dnd'
                                            >
                                                <PreviewDnD items={item} img={index} setDelImg={setDelImg} />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                            </div>
                            <div className='slider__placeholder'>
                                {provided.placeholder}
                            </div>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            <section className='slider__section'>
                <h2>Slider</h2>
                <Dropzone onFileSelected={handleFilesSelected} />
            </section>
            <div className='category__button'>
                <div className='category__submit'>
                    <Button handleSubmit={handleSubmit} isUploading={isUploading}>
                        <p>{isUploading ? 'Subiendo...' : 'Confirmar'}</p>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default EditarSlider