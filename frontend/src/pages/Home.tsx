import React from "react";
import {useNavigate} from "react-router-dom";
import Card from "../components/UI/Card";

const Home: React.FC = _ => {
    const navigate = useNavigate();
    const onGoToPath = (path: string) => {
        navigate(path);
    }

    return (
        <div className={'w-100 h-25 d-flex justify-content-center flex-row'}>
            <Card title={'Chamada'} description={'Faça ou verifique a chamada de seus funcionários'}
                  img={'https://cdn.pixabay.com/photo/2017/10/29/12/08/clipboard-2899586_1280.png'}
                  fn={onGoToPath.bind(null, '/employeeRegister')} buttonTxt={'Fazer chamada'} classes={'w-25'}/>
            <Card title={'Funcionários'}
                  description={'Gerenciar funcionários'}
                  img={'https://cdn.pixabay.com/photo/2016/04/01/11/25/avatar-1300331_1280.png'}
                  fn={onGoToPath.bind(null, '/employees')} buttonTxt={'Gerenciar'} classes={'w-25'}/>
        </div>
    )
}

export default Home;