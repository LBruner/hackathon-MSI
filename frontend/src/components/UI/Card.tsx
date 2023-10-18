import React from "react";
import BootstrapCard from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

interface CardProps {
    title: string,
    description: string
    img: any,
    buttonTxt: string,
    fn: () => void;
}

const Card: React.FC<CardProps> = ({title, description, img, fn, buttonTxt}) => {
    return (
        <BootstrapCard>
            <BootstrapCard.Img variant={'bottom'} src={img}/>
            <BootstrapCard.Body>
                <BootstrapCard.Title>{title}</BootstrapCard.Title>
                <BootstrapCard.Text>
                    {description}
                </BootstrapCard.Text>
                <Button onClick={fn} className={'w-100'} variant="primary">{buttonTxt}</Button>
            </BootstrapCard.Body>
        </BootstrapCard>
    )
}

export default Card;