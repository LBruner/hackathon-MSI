import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Card from "../components/UI/Card";
import agendaImg from '../assets/images/register.png'

const Home: React.FC = _ => {
    const navigate = useNavigate();
    const onGoToPath = (path: string) => {
        navigate(path)
    }

    return (
        <div className={'w-100 h-100 d-flex justify-content-center'}>
            <Card title={'Chamada'} description={'Faça a chamada de seus funcionários'} img={agendaImg}
                  fn={onGoToPath.bind(null, '/employeeRegister')} buttonTxt={'Fazer chamada'}/>
            <Card title={'Funcionários'}
                  description={'Gerenciar funcionários'} img={agendaImg}
                  fn={onGoToPath.bind(null, '/employees')} buttonTxt={'Gerenciar'}/>
        </div>
    )
}

export default Home;