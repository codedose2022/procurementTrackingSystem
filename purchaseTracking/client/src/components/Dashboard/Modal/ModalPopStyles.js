import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    ButtonsPanel:{
        justifyContent: 'flex-end',
        display: 'flex',
    },
    arrangeButton:{
        width: '20%',
        display: 'flex',
        justifyContent: 'space-between',
    },
    modalTitle:{
        textTransform: 'uppercase',
        borderBottom: '1px solid #ddd',
        '& button':{
            position: 'absolute',
            right: '1rem',
            transition: '.3s ease-in-out',
            '&:hover':{
                color: '#c50000'
            }
        }
    },
    inputMargin:{
        margin: '.25rem 0',
    }
}));
