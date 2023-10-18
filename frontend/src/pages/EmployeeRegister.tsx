import React, {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {ButtonGroup, DropdownButton} from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import {useNavigate} from "react-router-dom";
import {Employee} from "./types";
import axios from "axios";
import Image from "react-bootstrap/Image";
import Form from 'react-bootstrap/Form';

interface Construction {
    id: number,
    name: string,
    photo_uri: string
}

const EmployeeRegister: React.FC = _ => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [alreadyRegisteredEmployees, setAlreadyRegisteredEmployees
    ] = useState<Employee[]>([]);
    const [constructions, setConstructions] = useState<Construction[]>([]);
    const [constructionId, setConstructionId] = useState<number>();
    const [period, setPeriod] = useState<string>('');
    const [markedEmployees, setMarkedEmployees] = useState<Employee[]>([])

    const handleClose = () => setShow(false);

    const onGoToHandler = (path: string) => {
        navigate(path);
    }

    const onSelectMethod = async (period: string) => {
        setPeriod(period);
        setShow(false);

        const results = await axios.get(`http://localhost:8080/employees/${constructionId}/${period}`);
        const markedEmployees = results.data.log.markedEmployees;
        const unmarkedEmployees = results.data.log.unmarkedEmployees;

        setEmployees(unmarkedEmployees);
        setAlreadyRegisteredEmployees(markedEmployees);
    };

    useEffect(() => {
        const getAllConstructions = async () => {
            const allConstructions = await axios.get(`http://localhost:8080/constructions`);
            setConstructions(allConstructions.data)
        }

        getAllConstructions();

        console.log(constructions)
    }, []);

    const onPickConstruction = (constructionId: number) => {
        setShow(true);
        setConstructionId(constructionId);
    }

    const addMarkedEmployee = (newEmployee: Employee) => {
        if (markedEmployees.some((employee) => employee.id === newEmployee.id)) {
            const newEmployees = markedEmployees.filter((employee) => employee.id !== newEmployee.id);
            setMarkedEmployees(newEmployees);
        } else {
            setMarkedEmployees([...markedEmployees, newEmployee]);
        }
    };

    const onSubmitForm = async () => {
        onGoToHandler('/');

        try {
            await axios.post(`http://localhost:8080/employees/register`, {
                date: new Date().toLocaleDateString().slice(0, 19),
                markedEmployees: markedEmployees,
                constructionId,
                period
            });
        } catch (e) {
            console.log(e)
        }

    }

    return (
        <>
            {employees?.length < 1 && alreadyRegisteredEmployees.length < 1 &&
                <>
                    <div className={'container mt-3 mb-3'}>
                        <h5 className={'alert alert-light'}>Escolha uma obra para fazer a chamada.</h5>
                    </div>
                    <div className={'container flex-md-grow-1 w-25'}>
                        {constructions.length > 0 && <div className="container d-flex gap-3">
                            {constructions.map(construction =>
                                <div onClick={onPickConstruction.bind(null, construction.id)} key={construction.id}
                                     className="card">
                                    <img src={construction.photo_uri} className="card-img-top rounded-1" alt="..."></img>
                                    <div className="card-body">
                                        <h4 className="card-text text-center link-dark">{construction.name}</h4>
                                    </div>
                                </div>
                            )}
                        </div>}
                        {constructions.length === 0 &&
                            <div className="container text-center p-5">
                                <h5>Você não possui obras... Que tal adicionar uma?</h5>
                                <button onClick={onGoToHandler.bind(null, '/addConstruction')}
                                        className={'btn btn-primary'}>Adicionar obras
                                </button>
                            </div>}
                    </div>
                </>
            }
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Selecione como fazer a chamada</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={'container w-100 d-flex justify-content-center'}>
                        <DropdownButton className={'p-2'}
                                        as={ButtonGroup}
                                        title="Por obra"
                                        id="bg-vertical-dropdown-1"
                        >
                            <Dropdown.Item eventKey="1" onClick={onSelectMethod.bind(null, 'morning')}
                            >Manhã</Dropdown.Item>
                            <Dropdown.Item eventKey="2"
                                           onClick={onSelectMethod.bind(null, 'afternoon')}>Tarde</Dropdown.Item>
                            <Dropdown.Item eventKey="2"
                                           onClick={onSelectMethod.bind(null, 'evening')}>Noite</Dropdown.Item>
                        </DropdownButton>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onGoToHandler.bind(null, '/')}>
                        Voltar
                    </Button>
                </Modal.Footer>
            </Modal>
            {employees!.length > 0 && <>
                <div className={'container mb-5 mt-5'}>
                    <h3 className={'alert alert-light'}>Selecione os funcionários que compareceram</h3>
                    <ul className="list-group w-100 d-flex align-items-center">
                        {employees.map((employee, index) => {
                                return <li className="list-group-item  d-flex w-100" key={index}>
                                    <div className={'container align-items-center d-flex flex-row'}>
                                        <Image className={'img'} width={'50px'} height={'60rem'} src={employee.photo_uri}
                                               thumbnail></Image>
                                        <div className="container d-flex p-2 flex-column w-25">
                                            <h3 className={'center'}>{employee.name}</h3>
                                            <p className={'center'}>Setor: {employee.position}</p>
                                        </div>
                                        <div className={'container d-flex align-items-center'}>
                                            <label className={'m-2'}>Compareceu?</label>
                                            <Form.Check className={'form-check form-check-label'}
                                                        onClick={addMarkedEmployee.bind(null, employee)}
                                                        type={'checkbox'}/>
                                        </div>
                                    </div>
                                </li>
                            }
                        )}
                    </ul>
                    <button disabled={markedEmployees.length === 0} onClick={onSubmitForm}
                            className="btn btn-primary mt-4">Fechar Chamada
                    </button>
                </div>
            </>
            }
            {alreadyRegisteredEmployees!.length > 0 && <>
                <div className={'container mb-5 mt-5'}>
                    <h3 className={'alert alert-light'}>Funcionários com presença</h3>
                    <ul className="list-group">
                        {alreadyRegisteredEmployees.map((employee, index) => {
                                return <li className="list-group-item  d-flex " key={index}>
                                    <div className={'container align-items-center d-flex flex-row'}>
                                        <Image className={'img'} width={'50px'} height={'60rem'} src={employee.photo_uri}
                                               thumbnail></Image>
                                        <div className="container d-flex p-2 flex-column">
                                            <h3 className={'center'}>{employee.name}</h3>
                                            <p className={'center'}>Setor: {employee.position}</p>
                                        </div>
                                    </div>
                                </li>
                            }
                        )}
                    </ul>
                </div>
            </>

            }
        </>
    )
}

export default EmployeeRegister;