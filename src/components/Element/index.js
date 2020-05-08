import React from 'react';

import Barcode from './Barcode';
import QRCode from './QRCode';
import Text from './Text';

export default React.forwardRef((props, ref) => {
    if(props.data.type === 'barcode') {
        return(
            <Barcode data={props.data} class={props.data.value} ref={ref} />
        );
    } else if(props.data.type === 'qrcode') {
        return(
            <QRCode data={props.data} id={props.data.value} ref={ref} />
        );
    } else {
        return(
            <Text data={props.data} ref={ref} />
        );
    }
});