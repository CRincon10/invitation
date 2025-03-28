import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStoredUser, userLogin } from "../firebase/functions";
import { ContainerLogged, Flex, InputApp } from "./styled";

const Login: React.FC = () => {
    const [usuario, setUsuario] = useState<string>("");
    const [contrasena, setContrasena] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = getStoredUser();
        if (storedUser) {
            navigate("/dashboard");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await userLogin({ usuario, contrasena });

        if (response.success) {
            navigate("/dashboard");
        } else {
            alert(`❌ Error: ${response.message}`);
        }
    };

    return (
        <ContainerLogged className="logged">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
                <Flex column gap20>
                    <InputApp type="text" placeholder="Usuario" onChange={(e) => setUsuario(e.target.value)} />
                    <InputApp type="password" placeholder="Contraseña" onChange={(e) => setContrasena(e.target.value)} />
                    <button type="submit">Ingresar</button>
                </Flex>
            </form>
        </ContainerLogged>
    );
};

export default Login;
