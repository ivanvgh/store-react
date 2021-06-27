import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core';
import React from 'react'

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        flex: "1 0 21 %",
        margin: 20,
    },
});

const Item = ({ item }) => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt={item.title}
                    height="250"
                    image={item.image}
                    title={item.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {item.title} - {item.category}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {item.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        $ {item.price}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Details
                        </Button>
            </CardActions>
        </Card>
    );
};


export default Item;