import React from 'react';
import styled from 'styled-components';
import { ButtonCheckout } from '../Style/ButtonCheсkout';
import { CountItem } from './CountItem';
import { useCount } from '../Hooks/useCount';
import { totalPriceItems } from '../../Functions/secondaryFunction';
import { formatCurrency } from '../../Functions/secondaryFunction';
import { Toppings } from './Toppings';
import { Choices } from './Choices';
import { useToppings } from '../Hooks/useToppings';
import { useChoices } from '../Hooks/useChoices';

const Overlay = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    z-index: 20;

`;

const Modal = styled.div`
    Background-color: #fff;
    width: 600px;
    height: 600px;

`;

const Banner = styled.div`
    width: 100%;
    height: 200px;
    background-image: url(${({img}) => img});
    background-size: cover;
    background-position: center;
`;

const Content = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(100% - 200px);
    padding: 30px;

`;

const HeaderContent = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 24px;
    font-weight: 700;
    font-family: 'Pacifico', cursive;
`;

const TotalPriceItem = styled.div`
    display: flex;
    justify-content: space-between;
`;


export const ModalItem = ( { openItem, setOpenItem, orders, setOrders } ) => {

    const counter = useCount();
    const toppings = useToppings(openItem);
    const choices = useChoices(openItem);

    const closeModal = e => {
        if (e.target.id === 'overlay') {
            setOpenItem(null);
        }
    }

    const order = {
        ...openItem,
        count: counter.count,
        topping: toppings.toppings,
        choice: choices.choice,
    };

    
    const addToOrder = () => {
        setOrders([...orders, order])
        setOpenItem(null);
    }
    
    
    return (
        <Overlay id="overlay" onClick={closeModal}>
            <Modal>
                <Banner img={openItem.img}/>
                <Content>
                    <HeaderContent>
                        <div>{openItem.name}</div>
                        <div>{formatCurrency(openItem.price)}</div>
                    </HeaderContent>
                    <CountItem {...counter}/>
                    {openItem.choices && <Choices {...choices} openItem={openItem}/>}
                    {openItem.toppings && <Toppings {...toppings}/>}
                    <TotalPriceItem>
                        <span>Цена</span>
                        <span>{formatCurrency(totalPriceItems(order))}</span>
                    </TotalPriceItem>
                    <ButtonCheckout
                     onClick={addToOrder}
                     disabled={order.choices && !order.choice}
                     >Добавить</ButtonCheckout>
                </Content>
                </Modal>
        </Overlay>
    )
};
    


