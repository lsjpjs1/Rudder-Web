import Alert from '@mui/material/Alert';

type AlertProps = {
    message: string;
}


const CustomAlert = (alertProps: AlertProps) =>{

    return (
        <Alert severity="error">{alertProps.message}</Alert>
    );
}


export default CustomAlert