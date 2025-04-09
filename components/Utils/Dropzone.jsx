import { React, useCallback,useState } from 'react'
import { useDropzone } from 'react-dropzone';


const Dropzone = ({ onFileSelected, prewiew, setPreview }) => {

    const [selectedFile, setSelectedFile] = useState(null);

    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            setSelectedFile(acceptedFiles[0]);
            let file = acceptedFiles[0];
            onFileSelected(acceptedFiles[0]);
        
        const reader = new FileReader();
        reader.readAsDataURL(file); 

        reader.onloadend = () => {
          setPreview(reader.result);
        }
  
        reader.onerror = (error) => {
          console.error("Error al leer el archivo:", error);
        }

    }
    
    }, [onFileSelected]);

    const getClassNames = () => {
        const classes = ['dropzone'];
        const { isFocused, isDragAccept, isDragReject } = useDropzone();
        if (isFocused) classes.push('dropzone-focused');
        if (isDragAccept) classes.push('dropzone-accept');
        if (isDragReject) classes.push('dropzone-reject');
        return classes.join(' ');
    };

    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject,
        acceptedFiles
    } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/gif': [],
        },
        multiple: false
    });

    const getDropzoneText = () => {
        if (isDragAccept) {
            return <p className="dropzone-feedback">¡Suelta la imagen aquí!</p>;
        }
        if (isDragReject) {
            return <p className="dropzone-feedback">Tipo de archivo no soportado</p>;
        }
        if (selectedFile) {
            return <p>Archivo seleccionado: {selectedFile.name}</p>;
        }
        return <p>Arrastra una imagen aquí, o haz clic para seleccionarla</p>;
    }


    return (
        <div className="category__dropzone">
            <div {...getRootProps({ className: getClassNames() })}>
                <input {...getInputProps()} />
                {getDropzoneText()}
            </div>
        </div>
    )
}

export default Dropzone