import React, { useRef, useEffect } from 'react';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { updateContent, deleteContent} from "../redux/actions";

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Element from './Element';

const useStyles = makeStyles({
    paper: {
        height: '100%',
        width: '100%',
    }
});

const Template = props => {
    const classes = useStyles();
    const ref = useRef(null);

    return(
        <Paper id="Template" className={classes.paper} ref={ref}>
            {Object.keys(props.template.byIds).map((key, index) => 
                <Element 
                    data={props.template.byIds[key]} 
                    key={props.template.byIds[key] + 'Element'} 
                />
            )}
        </Paper>
    );
};

export default connect(
    state => state,
    dispatch => bindActionCreators({ updateContent, deleteContent }, dispatch),
)(Template);