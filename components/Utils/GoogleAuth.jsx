import React, { useEffect, useState } from 'react';
import Global from '../Utils/Global';
import { useAuth } from '../Context/authContext';


const GoogleAuth = ({Message, authorize, setAuthorize, cargando, setCargando}) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isGoogleApiLoaded, setIsGoogleApiLoaded] = useState(false);
    const { token, isLoading } = useAuth();


    const GOOGLE_CLIENT_ID = '172930893722-8m38q2p430kgb131c360skl6jki5sc7k.apps.googleusercontent.com'; //validar como lo guardo

    const handleCredentialResponse = async (response) => {
        setError(null);
        setLoading(true);

        try {

            const backendResponse = await fetch(Global.url + 'user/auth-google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: response.credential }),
                credentials: 'include'
            });

            const data = await backendResponse.json();

            if (backendResponse.ok) {
                setUser(data.user);
                setAuthorize(true);
                setCargando(false);
                console.log("Usuario autenticado exitosamente por el backend:", data.user);

                const googleButtonDiv = document.getElementById('google-sign-in-button');
                if (googleButtonDiv) googleButtonDiv.style.display = 'none';

            } else {
                setError(data.message || "Error al autenticar con el backend.");
                console.error("Error del backend:", data);
            }
        } catch (e) {
            console.error("Error al comunicarse con el backend:", e);
            setError("No se pudo conectar con el servidor de autenticación.");
        } finally {
            setLoading(false);
        }
    };


    const handleGoogleSignInError = (error) => {
        console.error("Error de inicio de sesión con Google:", error);
        setError("No se pudo iniciar sesión con Google. Por favor, intenta de nuevo.");
        setLoading(false);
    };


    useEffect(() => {

        const checkGoogleApi = () => {
            if (window.google && window.google.accounts && window.google.accounts.id) {
                setIsGoogleApiLoaded(true);
                if (!user) {
                    window.google.accounts.id.initialize({
                        client_id: GOOGLE_CLIENT_ID,
                        callback: handleCredentialResponse,
                        ux_mode: "popup",
                    });


                    window.google.accounts.id.renderButton(
                        document.getElementById("google-sign-in-button"),
                        { theme: "outline", size: "large", type: "standard", text: "signin_with", shape: "pill" }
                    );

                }
            } else {
                setTimeout(checkGoogleApi, 100);
            }
        };

        checkGoogleApi();

        return () => {

        };
    }, [token]);


    const handleSignOut = () => {
        if (window.google && window.google.accounts && window.google.accounts.id) {
            window.google.accounts.id.disableAutoSelect();
            window.google.accounts.id.revoke(user?.email, () => {
                console.log("Sesión de Google revocada.");
                setUser(null);
                setError(null);
                setLoading(false);

                const googleButtonDiv = document.getElementById('google-sign-in-button');
                if (googleButtonDiv) googleButtonDiv.style.display = 'block';

            });
        }
    };

    return (
        <div className='Auth__container'>

            {!isLoading && !token &&

                <div className='auth__header'>

                    <h4 className='auth__title'>{Message}</h4>
                    <h2 className='auth__title'>Inicio de Sesión con Google</h2>

                    {loading && <p className='auth__auth-auth'>Autenticando...</p>}
                    {error && <p className='auth__auth-error'>{error}</p>}


                    {!isGoogleApiLoaded && !error && ( // Solo muestra si no ha habido un error fatal en la carga
                        <p className='auth__auth-loading'>Cargando servicio de Google...</p>
                    )}

                    
                        <div id="google-sign-in-button" style={{ marginTop: '20px', visibility: isGoogleApiLoaded ? 'visible' : 'hidden' }}>
                        </div>
                
                </div>
            }

        </div>
    );
};

export default GoogleAuth;
