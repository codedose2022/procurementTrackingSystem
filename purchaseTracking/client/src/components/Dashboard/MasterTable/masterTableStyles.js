import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    selectStatus:{
        '& .MuiGrid-item':{
            padding: theme.spacing(1),
        },
        '& .Mui-checked + label':{
            color: 'red !important',
        },
    },
    modalButton:{
        justifyContent: 'flex-end',
        marginTop: '1rem'
    },
    smallText:{
        fontSize: '12px',
    }
}));
