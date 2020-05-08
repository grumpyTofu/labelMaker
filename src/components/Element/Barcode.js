import React, { useEffect } from 'react';
import { connect } from "react-redux";
import Barcode from "react-barcode";
import Draggable from 'react-draggable';

export default connect(state => state, null)(props => {
    return(
        <Draggable 
            handle=".handle"
            bounds="parent"
        >
            <div className="handle" style={{ width: 'fit-content' }}>
                <Barcode value="1234" />
            </div>
        </Draggable>
    );
});