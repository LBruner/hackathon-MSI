import React, {FormEvent, useEffect, useRef, useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Employee} from "./types";
import Image from "react-bootstrap/Image";

const AddConstructions: React.FC = _ => {
    const navigate = useNavigate();

    const [allEmployees, setAllEmployees] = useState<Employee[]>([]);
    const [employeesToAdd, setEmployeesToAdd] = useState<Employee[]>([]);

    const constructionName = useRef<HTMLInputElement>(null)
    const constructionPhoto = useRef<HTMLInputElement>(null)
    const onAddEmployee = async (e: FormEvent) => {
        e.preventDefault();
        await axios.post(`http://localhost:8080/constructions`, {
            name: constructionName!.current!.value,
            photo_uri: constructionPhoto!.current!.value,
            start_date: new Date().toLocaleDateString().slice(0, 19),
            employees_to_add: employeesToAdd,
        })
        navigate('/constructions');
    }

    const addEmployee = (newEmployee: Employee) => {
        if (employeesToAdd.includes(newEmployee)) {
            const newEmployees = employeesToAdd.filter((employee) => employee.id !== newEmployee.id);
            setEmployeesToAdd(newEmployees);
        } else {
            setEmployeesToAdd(prevState => [...prevState, newEmployee]);

        }
        console.log(employeesToAdd)
    }

    useEffect(() => {
        const getAllEmployees = async () => {
            const allEmployees = await axios.get(`http://localhost:8080/employees`);
            setAllEmployees(allEmployees.data)
        }

        getAllEmployees();
    }, [])

    return (
        <div className={'container w-75 h-100'}>
            <Form onSubmit={onAddEmployee}>
                <Form.Group className="m-5 gap-3 d-flex flex-column" controlId="formBasicEmail">
                    <div className="container">
                        <Form.Label>Nome da obra</Form.Label>
                        <Form.Control name={'name'} ref={constructionName} type="text" placeholder="Nome..."/>
                    </div>
                    <div className="container">
                        <Form.Label>Link da foto</Form.Label>
                        <Form.Control name={'name'} ref={constructionPhoto} type="text" placeholder="Endereço..."/>
                    </div>
                    <div className={'container'}>
                        <p>Adicione funcionários</p>
                        <ul className="container list-group">
                            {allEmployees.map(employee => <li key={employee.id}
                                                              className={'list-group-item d-flex align-items-center'}>
                                <Image width={'50px'} height={'60rem'} src={employee.photo_uri} thumbnail></Image>
                                <span className={'p-2'}>{employee.name}</span>
                                <span className={'p-2'}>{employee.position}</span>
                                <Form.Check onClick={addEmployee.bind(null, employee)}
                                            type={'checkbox'}
                                />
                            </li>)}
                        </ul>
                    </div>
                    <Button variant="primary" type="submit">
                        Adicionar obra
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default AddConstructions;