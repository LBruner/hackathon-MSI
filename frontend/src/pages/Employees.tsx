import React, {useEffect, useState} from "react";
import ItemList from "../components/UI/ItemList";
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
        <div className={'d-flex justify-content-center align-items-center flex-column mt-5 '}>
            <div className={'container flex-md-grow-1'}>
                {allEmployees.length > 0 && <div className="container">
                    <ItemList items={allEmployees}/>
                </div>}
            </div>
            <div className="container text-center p-3 mt-5">
                <h5>Adicione novos funcionários</h5>
                <button onClick={onGoToPath.bind(null, '/addEmployee')} className={'btn btn-primary'}>Adicionar</button>

            </div>
        </div>
    )
}

export default Employees;