import { React, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetData } from '../../hooks';
import { BASE_URL } from '../../constants';
import * as Stl from './style.js';
import {
    useDisclosure,
    useNumberInput,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, HStack, Input
} from '@chakra-ui/react';


export const RestaurantDetailPage = () => {

    const navigate = useNavigate()

    const [id, setId] = useState(useParams())
//componentes do Modal do Chackra UI
    const { isOpen, onOpen, onClose } = useDisclosure()


    const idObject = JSON.stringify(id);
    const IdString = idObject.slice(7, -2);

    const AddToCart = () => {
        // quantidade é igual input.value
        // criar um array com a quantidade e o id do produto

    }

    //componentes do contador da quantidade
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
        useNumberInput({
            step: 1,
            min: 0,
            defaultValue: 0,
        })
    const inc = getIncrementButtonProps()
    const dec = getDecrementButtonProps()
    const input = getInputProps()


    const [data, isLoading, error] = useGetData(`${BASE_URL}/restaurants/${IdString}`, {
        headers: {
            auth: localStorage.getItem('token')
        }
    })

    const list = data && data.restaurant.products.map((product) => {
        if (data && data.restaurant.products) {


            const price = product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            return (
                <Stl.Product key={product.id}>
                    <img src={product.photoUrl} />
                    <Stl.Description>
                        <h1>{product.name}</h1>
                        <h2>{product.description}</h2>
                        <p>{price}</p>
                    </Stl.Description>

                    <Stl.AddBtn onClick={onOpen}>adicionar</Stl.AddBtn>
                    <Modal onClose={onClose} isOpen={isOpen}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Escolha a quantidade</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>

                                <HStack maxW='200px'>
                                    <Button {...dec}>-</Button>
                                    <Input   {...input} />
                                    <Button {...inc}>+</Button>
                                </HStack>
                                
                            </ModalBody>
                            <ModalFooter>
                                <Button colorScheme='orange' mr={3} onClick={() => AddToCart()}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Stl.Product>
            )
        }
    })

    if (data && data.restaurant) {
        return (
            <Stl.Main>
                <Stl.Restaurant>
                    <img src={data.restaurant.logoUrl} />

                    <h1>{data.restaurant.name}</h1>
                    <p>{data.restaurant.category}</p>
                    <Stl.Shipping>
                        <p>{data.restaurant.deliveryTime} min</p>
                        <p>FreteR$ {data.restaurant.shipping},00</p>
                    </Stl.Shipping>
                    <p>{data.restaurant.address}</p>
                </Stl.Restaurant>
                <Stl.Menu>
                    <p>Cardápio</p>
                    <hr></hr>
                </Stl.Menu>
                <div>
                    {list}
                </div>

            </Stl.Main>
        )
    }
}



