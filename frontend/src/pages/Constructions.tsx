import React, {useEffect, useState} from "react";
import {Employee} from "./types";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import ItemList from "../components/UI/ItemList";
import Card from "../components/UI/Card";

const Constructions: React.FC = _ => {
    const [allConstructions, setAllConstructions] = useState<Employee[]>([])
    const navigate = useNavigate();

    useEffect(() => {
        const getAllConstructions = async () => {
            const allEmployees = await axios.get(`http://localhost:8080/constructions`);
            setAllConstructions(allEmployees.data)
        }

        getAllConstructions();

        console.log(allConstructions)
    }, []);

    const onGoToPath = (path: string) => {
        navigate(path)
    }

    return (
        <div className={'d-flex justify-content-center align-items-center'}>
            <div className={'container flex-md-grow-1'}>
                {allConstructions.length > 0 && <div className="container">
                    <ItemList items={allConstructions}/>
                </div>}
                {allConstructions.length === 0 &&
                    <div className="container">
                        <p>Você não possui obras...</p>
                    </div>}
            </div>
            <div className="container w-25 p-4">
                <Card img={'fsaf'} title={'Adicionar obra'} description={'Adicione obras..'}
                      fn={onGoToPath.bind(null, '/addConstruction')} buttonTxt={'Adicionar'}/>
            </div>
        </div>
    )
}

export default Constructions;