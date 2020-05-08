import React, { useState, useRef } from 'react';
import { connect } from "react-redux";
import InputBase from '@material-ui/core/InputBase';
import Draggable from 'react-draggable';

export default connect(state => state, null)(props => {
    const [value, setValue] = useState("Sample Text");

    const handleChange = event => {
        setValue(event.target.value);
    }

    return(
        <Draggable 
            handle=".handle"
            bounds="parent"
        >
            <div className="handle" style={{ width: 'fit-content' }}>
                <InputBase
                    value={value} 
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'naked' }}
                    style={{ textAlign: 'center' }}
                />
            </div>
        </Draggable>
    );
});