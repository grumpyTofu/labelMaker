import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Toolbar from '@material-ui/core/Toolbar';

import Template from './Template';


const useStyles = makeStyles({
    box: {
        backgroundColor: '#dddddd',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        padding: 0,
        margin: 0,
        zIndex: -1
    },
    container: {
        paddingTop: '3rem', 
        paddingBottom: '3rem'
        // padding: 0,
        // margin: 0
    }
});

export default props => {
    const classes = useStyles();

    const [loading, setLoading] = useState(true);

    // run on first render, and only if loading changes
    useEffect(() => {
        if (loading === true) {
            setLoading(false);
        }
    }, [loading]);

    return (
        <Box className={classes.box} id='documentBox'>
            <Toolbar id='toolbar'/>
            {loading === false &&
                <Container max-width="md" className={classes.container} style={{
                    height: `calc(100% - ${document.getElementById('toolbar').clientHeight}px)`
                }}>
                    <Template />      
                </Container> 
            }             
        </Box>
    );
}