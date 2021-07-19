import { Button, makeStyles, TextField, ButtonGroup } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    counterContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: 20,
        alignItems: 'center',
    },
    counterField: {
        width: 72,
        marginRight: 10
    },
    counterButton: {

    },
    margin: {
        margin: theme.spacing(5),
    },
}));

const ItemCount = ({ count, setCount, minCount }) => {
    const classes = useStyles();

    const handleChange = (e) => {
        const re = /^[0-9]{1,2}?$/g;
        let value = parseInt(e.target.value);
        if (re.test(value)) {
            setCount(value);
        } else {
            setCount(minCount);
        }
    };

    return (
        <div className={classes.counterContainer}>
            <TextField
                className={classes.counterField}
                size="small"
                id="outlined-basic"
                inputProps={{ style: { textAlign: 'center' } }}
                label="Quantity"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={count}
                onChange={handleChange}
            />
            <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                <Button
                    onClick={() => setCount(count + 1)}
                ><AddIcon /></Button>
                <Button
                    onClick={() => setCount(count <= minCount ? count : count - 1)}
                ><RemoveIcon /></Button>
            </ButtonGroup>
        </div>
    );
};

export { ItemCount };