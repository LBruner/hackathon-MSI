import React from "react";
import {useNavigate} from "react-router-dom";

const Navbar: React.FC = _ => {
    const navigate = useNavigate();
    const onNavigateTo = (path: string) => {
        navigate(path)
    }

    return (
        <nav className="navbar navbar-expand bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" onClick={onNavigateTo.bind(null, '/')}>
                    Home
                </a>
                <div>
                    <button onClick={onNavigateTo.bind(null, '/employeeRegister')} className={'btn'}>
                        <a className="navbar-brand" href="#">Chamada</a>
                    </button>
                    <button onClick={onNavigateTo.bind(null, '/employees')} className={'btn'}>
                        <a className="navbar-brand" href="#">Funcionários</a>
                    </button>
                    <button onClick={onNavigateTo.bind(null, '/constructions')} className={'btn'}>
                        <a className="navbar-brand" href="#">Obras</a>
                    </button>
                </div>
            </div>

        </nav>
    )
}

export default Navbar;