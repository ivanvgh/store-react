import React from 'react';
import { Button, Container, Grid } from '@material-ui/core';
import { MenuAppBar } from '../Navbar';
import { makeStyles } from '@material-ui/core/styles';
import { UseForm } from '../../Hooks/UseForm';
import { ShippingForm } from '../ShippingForm';
import { UseCartContext } from '../../contexts/CartContext';
import { db } from '../../Firebase';
import { UseLocalStorage } from '../../Hooks/UseLocalStorage';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '80%',
        margin: 'auto',
        paddingTop: 100,
    },
}));

const initialValues = {
    firstname: '',
    lastname: '',
    addressLine1: '',
    addressLine2: '',
    email: '',
    phone: '',
    city: '',
    postalCode: '',
};

const CheckoutContainer = () => {
    const classes = useStyles();
    const { cart, clearCart } = UseCartContext();
    const { values, handleChange } = UseForm(initialValues);
    const orders = db.collection('orders');
    const { setValue } = UseLocalStorage("order", {});
    const history = useHistory();


    const handleSubmit = (e) => {
        e.preventDefault();
        const newOrder = {
            items: [...cart],
            buyer: values
        };
        orders.add(newOrder).then(({ id }) => {
            console.log(id);
            const order = {
                ...newOrder,
                id,
            };

            setValue(order);

            cart.forEach(CartLine => {
                const batch = db.batch();
                batch.update(db.collection("products").doc(CartLine.item.id), { 'stock': CartLine.item.stock - CartLine.quantity });
                batch.commit().then(r => console.log(r));
                clearCart();
            });

            history.push(`/order`);

        });
    };

    return (
        <Container maxWidth="md">
            <MenuAppBar />
            <div className={classes.root}>
                <h1>Shipping Address</h1>
                <ShippingForm
                    values={values}
                    handleChange={handleChange}
                    onSubmit={handleSubmit}
                />
                <br />
                <Grid container justifyContent='flex-end'>
                    <Button
                        variant='outlined'
                        color='default'
                        onClick={() => history.push(`/`)}
                    >
                        Back to shopping
                    </Button>
                </Grid>

            </div>
        </Container>
    );
};

export { CheckoutContainer };