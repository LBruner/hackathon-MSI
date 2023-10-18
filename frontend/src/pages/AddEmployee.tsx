import React, {FormEvent, useRef, useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useNavigate} from "react-router-dom";
import axios from "axios";

const AddEmployee: React.FC = _ => {
    const navigate = useNavigate();

    const employeeNameRef = useRef<HTMLInputElement>(null)
    const employeeFunctionNameRef = useRef<HTMLInputElement>(null)
    const employeeZipCodeRef = useRef<HTMLInputElement>(null)
    const employeeBirthDateRef = useRef<HTMLInputElement>(null)
    const employeePhotoURIRef = useRef<HTMLInputElement>(null)
    const onAddEmployee = async (e: FormEvent) => {
        e.preventDefault();
        await axios.post(`http://localhost:8080/employees`, {
            name: employeeNameRef!.current!.value,
            functionName: employeeFunctionNameRef!.current!.value,
            birthDate: employeeBirthDateRef!.current!.value,
            zipCode: employeeZipCodeRef!.current!.value,
            photoURI: employeePhotoURIRef!.current!.value,
        })
        navigate('/employees');
    }

    return (
        <div className={'container w-75 h-100'}>
            <Form onSubmit={onAddEmployee}>
                <Form.Group className="m-5 gap-3 d-flex flex-column" controlId="formBasicEmail">
                    <div className="container">
                        <Form.Label>Nome do funcionário</Form.Label>
                        <Form.Control name={'name'} ref={employeeNameRef} type="text" placeholder="Nome..."/>
                    </div>
                    <div className="container">
                        <Form.Label>Função</Form.Label>
                        <Form.Control ref={employeeFunctionNameRef} type="text" placeholder="Nome..."/>
                    </div>
                    <div className="container">
                        <Form.Label>Data de nascimento</Form.Label>
                        <Form.Control ref={employeeBirthDateRef} type="date"
                                      placeholder="Nome..."/>
                    </div>
                    <div className="container">
                        <Form.Label>CEP</Form.Label>
                        <Form.Control maxLength={8} ref={employeeZipCodeRef} type="text"
                                      placeholder="Nome..."/>
                    </div>
                    <div className="container">
                        <Form.Label>Link de foto</Form.Label>
                        <Form.Control ref={employeePhotoURIRef} type="text"
                                      placeholder="Endereço..."/>
                    </div>
                    <Button variant="primary" type="submit">
                        Adicionar funcionário
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default AddEmployee;