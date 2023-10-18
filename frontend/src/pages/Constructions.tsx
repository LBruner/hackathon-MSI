import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Image from "react-bootstrap/Image";

interface Construction {
    id: number,
    name: string,
    photo_uri: string
    start_date: string
}

const Constructions: React.FC = _ => {
    const [allConstructions, setAllConstructions] = useState<Construction[]>([])
    const navigate = useNavigate();

    useEffect(() => {
        const getAllConstructions = async () => {
            const results = await axios.get(`http://localhost:8080/constructions`);
            setAllConstructions(results.data);
            console.log(results.data)
        }

        getAllConstructions();

        console.log(allConstructions)
    }, []);

    const onGoToPath = (path: string) => {
        navigate(path)
    }

    console.log(allConstructions)

    return (
        <div className={'d-flex justify-content-center align-items-center d-flex flex-column mt-5'}>
            <div className={'container flex-md-grow-1'}>
                {allConstructions.length > 0 && <div className="container">
                    <ul className="list-group">
                        {allConstructions.map((item, index) => {
                                return <li className="list-group-item  d-flex justify-content-around" key={index}>
                                    <div className={'container align-items-center d-flex flex-row gap-2'}>
                                        <Image className={item.photo_uri} width={'50px'} height={'60rem'}
                                               src={item.photo_uri} thumbnail></Image>
                                        <div className="container d-flex p-2 flex-column w-100">
                                            <h3 className={'center'}>{item.name}</h3>
                                            <p className={'center'}>Data de início: {item['start_date']}</p>
                                        </div>
                                    </div>
                                    <div className={'container d-flex justify-content-end align-items-center gap-2'}>
                                        <button className="btn btn-danger h-75">Apagar</button>
                                    </div>
                                </li>
                            }
                        )}
                    </ul>
                </div>}
                {allConstructions.length === 0 &&
                    <div className="container text-center p-3">
                        <h5>Você não possui obras... Que tal adicionar uma?</h5>
                        <button onClick={onGoToPath.bind(null, '/addConstruction')}
                                className={'btn btn-primary'}>Adicionar obras
                        </button>
                    </div>}
            </div>
            {allConstructions.length > 0 &&
                <div className="container text-center p-3 mt-5">
                    <h5>Adicione novas obras</h5>
                    <button onClick={onGoToPath.bind(null, '/addConstruction')} className={'btn btn-primary'}>Adicionar
                    </button>
                </div>}
        </div>
    )
}

export default Constructions;