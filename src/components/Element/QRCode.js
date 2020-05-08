import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import QRCode from "qrcode";
import Draggable from 'react-draggable';

export default connect(
  (state) => state,
  null
)(props => {

  const [url, setUrl] = useState(null);

  QRCode.toDataURL(props.data.value)
    .then((url) => {
      setUrl(url);
    })
    .catch((err) => {
      console.error(err);
    });
  return (
    <>
      {url === null ? (
        <div>loading...</div>
      ) : (
        <Draggable 
            handle=".handle"
            bounds="parent"
        >
            <div className="handle" style={{ width: 'fit-content'}}>
                <img src={url} draggable="false"/>
            </div>
        </Draggable>
      )}
    </>
  );
});
