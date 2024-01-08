import React, { useState } from "react";
import { Alert } from "reactstrap";

interface AlertMessageProps {
  status: string;
  message: string;
}

function AlertMessage(props: AlertMessageProps) {
  const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);

  return (
    <Alert color={props.status} isOpen={visible} toggle={onDismiss}>
      {props.message}
    </Alert>
  );
}

export default AlertMessage;
