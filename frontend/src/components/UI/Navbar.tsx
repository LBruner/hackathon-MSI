import React from "react";

const Navbar: React.FC = _ => {
    return (
        <nav className="navbar navbar-expand bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <div>
                    <button className={'btn'}>
                        <a className="navbar-brand" href="#">Chamada</a>
                    </button>
                    <button className={'btn'}>
                        <a className="navbar-brand" href="#">Equipes</a>
                    </button>
                </div>
            </div>

        </nav>
    )
}

export default Navbar;