import React, {useEffect, useState} from "react";
import ItemList from "../components/UI/ItemList";
import Card from "../components/UI/Card";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Employee} from "./types";

const Employees: React.FC = _ => {
    const [allEmployees, setAllEmployees] = useState<Employee[]>([])
    const navigate = useNavigate();

    useEffect(() => {
        const getAllEmployees = async () => {
            const allEmployees = await axios.get(`http://localhost:8080/employees`);
            setAllEmployees(allEmployees.data)
            console.log(allEmployees)
        }

        getAllEmployees();

        console.log(allEmployees)
    }, [])

    const onGoToPath = (path: string) => {
        navigate(path)
    }

    return (
        <div className={'d-flex justify-content-center align-items-center'}>
            <div className={'container flex-md-grow-1'}>
                {allEmployees.length > 0 && <div className="container">
                    <ItemList items={allEmployees}/>
                </div>}
                {allEmployees.length === 0 &&
                    <div className="container">
                        <p>Você não possui funcionários</p>
                    </div>}
            </div>
            <div className="container w-25 p-4">
                <Card img={'fsaf'} title={'Adicionar funcionário'} description={'Adicione funcionários'}
                      fn={onGoToPath.bind(null, '/addEmployee')} buttonTxt={'Adicionar'}/>
            </div>
        </div>
    )
}

export default Employees;