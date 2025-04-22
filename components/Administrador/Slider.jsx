import React, { useEffect, useState } from 'react';
import Global from '../Utils/Global';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import Dropzone from './Dropzone';
import PreviewDnD from './PreviewDnD';

function Slider() {
    const [items, setItems] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [delImg, setDelImg] = useState([]);

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
            return;
        }

        const newItems = Array.from(items);
        const [removed] = newItems.splice(source.index, 1);
        newItems.splice(destination.index, 0, removed);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!items || items.length === 0) {
            console.log("Por favor, selecciona una imagen.");
            return;
        }

        const formData = new FormData();
        items.forEach((item, index) => {
            formData.append('files', item.file, item.file.name);
            formData.append('id', item.id);
        });

        setIsUploading(true);

        try {
            const request = await fetch(Global.url + 'slider/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await request.json();

            if (data.status === 'success') {
                console.log('Subida exitosa:', data);
                setItems([]);
            } else {
                console.log('Error en la subida:', data);
            }
        } catch (error) {
            console.error('Error al enviar la petición:', error);
        } finally {
            setIsUploading(false);
        }
    };

    useEffect(() => {
       
        if (delImg.length > 0) {

            console.log('delImg...', delImg);
           
           let newItems = items.filter(item => item.id != delImg);
           
           setItems(newItems);

        }

    }, [delImg]);

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
                            <h3>Preview </h3>
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
                                                <PreviewDnD preview={item.url} img={index} id={item.id} setDelImg={setDelImg} />
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
            <div className='category__button' onClick={handleSubmit}>
                <div className='category__submit'>
                    <button className="button">
                        <p> Confirmar{isUploading ? 'Subiendo...' : ''}</p>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Slider;