import React, { useState, useEffect } from "react";
import "./Alert.css";

const Alert = (props) => {
  let val = props.alert;
  let [trans, settrans] = useState("-200px");
  useEffect(() => {
    if (val !== "" && props.cal != 0) {
      settrans("0px");
      setTimeout(() => {
        settrans("-200px");
      }, 6000);
    }
  }, [props.cal]);

  return (
    <div className="AlertBody" style={{ transform: `translateY(${trans})` }}>
      <p>{val}</p>
    </div>
  );
};

// #endregion

export default Alert;
