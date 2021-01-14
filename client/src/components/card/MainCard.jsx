import $ from "jquery";
import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import "./MainCard.css"

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: "3vh",
        marginBottom: "3vh",
        marginRight: "auto",
        marginLeft: "auto",
        maxWidth: 500,
    },
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));




export default function MainCard(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [category, setCategory] = useState();
    const [type, setType] = useState();
    const [concept, setConcept] = useState();
    const [amount, setAmount] = useState();
    const [date, setDate] = useState();
    var id = sessionStorage.getItem('id');
    var objFecha = new Date();
    const [openDialog, setOpenDialog] = useState(false);
    const open = Boolean(anchorEl);

    useEffect(() => {

    }, [id])

    const handleSend = (e) => {
        e.preventDefault();
        if (category && type && concept && amount && date && id) {
            $.ajax({
                url: `http://localhost:3001/new`,
                data: {
                    concept: concept,
                    amount: amount,
                    category: category,
                    type: type,
                    date: date,
                    UserId: id
                },
                type: "POST",
                dataType: "json",
                success: function (r) {
                    console.log(r);
                    handleClose();
                    window.location.reload();
                },
                error: function (xhr, status) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Algo salio mal',
                        text: 'Por favor revise los campos',
                    })
                },
            })
        }
    }
    const handleChangetype = (e) => {
        e.preventDefault();
        setType(e.target.value)
    }
    const handleChange = (e) => {
        e.preventDefault();
        setCategory(e.target.value)
    }
    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };
    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    const handleConceptChange = (e) => {
        e.preventDefault();
        setConcept(e.target.value);
    }
    const handleAmountChange = (e) => {
        e.preventDefault();
        setAmount(e.target.value);
    }
    const handleDateChange = (e) => {
        e.preventDefault();
        setDate(e.target.value)
    }

    return (
        // card body
        <Card className={classes.root}>
            <CardActionArea>
                <CardContent>
                    {props.balance > 0 ? <Typography gutterBottom variant="h1" component="h2" color="primary">
                        ${props.balance}
                    </Typography> : <Typography gutterBottom variant="h1" component="h2" color="error">
                            {props.balance}
                        </Typography>}
                    <Typography variant="body2" color="textSecondary" component="p">
                        Balance al {objFecha.toLocaleDateString()}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <div className="Maincard__Button">
                    {/* button that open the dialog and on hover shows a legend */}
                    <IconButton color="primary" aria-label="add new operation" onMouseEnter={handlePopoverOpen}
                        onMouseLeave={handlePopoverClose} onClick={handleClickOpen}>
                        <AddCircleIcon fontSize="large" />
                    </IconButton>
                    {/* dialog */}
                    {id ? <Dialog open={openDialog} maxWidth="xs" onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Nueva Operacion</DialogTitle>
                        <DialogContent>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="age-native-simple">Tipo</InputLabel>
                                <Select
                                    native
                                    onChange={handleChangetype}
                                >
                                    <option aria-label="None" value="" />
                                    <option value='add'>Ingreso</option>
                                    <option value='rem'>Egreso</option>
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="age-native-simple">Categoria</InputLabel>
                                {type === "rem" ? <Select
                                    native
                                    onChange={handleChange}
                                >
                                    <option aria-label="None" value="" />
                                    <option value='Alimentación'>Alimentación</option>
                                    <option value='Educacion'>Educacion</option>
                                    <option value='Pagos'>Pagos</option>
                                    <option value='Ropa'>Ropa</option>
                                    <option value='Salud'>Salud</option>
                                    <option value='Transporte'>Transporte</option>
                                    <option value='Vivienda'>Vivienda</option>
                                    <option value='Varios'>Varios</option>
                                </Select> :
                                    <Select
                                        native
                                        onChange={handleChange}>
                                        <option aria-label="None" value="" />
                                        <option value='Inversiones'>Inversiones</option>
                                        <option value='Premios'>Premios</option>
                                        <option value='Regalo'>Regalo</option>
                                        <option value='Sueldo'>Sueldo</option>
                                        <option value='Varios'>Varios</option>
                                    </Select>}
                            </FormControl>
                            <form className={classes.container} noValidate>
                                <TextField
                                    id="date"
                                    label="Fecha"
                                    type="date"
                                    className={classes.textField}
                                    onChange={handleDateChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </form>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="concept"
                                label="concepto"
                                type="concept"
                                fullWidth
                                onChange={handleConceptChange}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="amount"
                                label="importe"
                                type="amount"
                                fullWidth
                                onChange={handleAmountChange}
                            />

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancelar
                            </Button>
                            <Button onClick={handleSend} color="primary">
                                Agregar
                            </Button>
                        </DialogActions>
                    </Dialog> :
                        <Dialog open={openDialog} maxWidth="xs" onClose={handleClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Registrate o inicia sesion</DialogTitle>
                            <DialogContent>
                                <Typography>Por favor inicia sesion o crea una nueva cuenta para cargar nuevas operaciones</Typography>
                            </DialogContent>
                        </Dialog>}
                    {/* popover */}
                    <Popover
                        id="mouse-over-popover"
                        className={classes.popover}
                        classes={{
                            paper: classes.paper,
                        }}
                        open={open}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        onClose={handlePopoverClose}
                        disableRestoreFocus
                    >
                        <Typography>Agregar nueva operacion</Typography>
                    </Popover>
                </div>
            </CardActions>
        </Card>
    );
}