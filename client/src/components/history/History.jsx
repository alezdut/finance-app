import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import $ from "jquery";
import Swal from 'sweetalert2';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import "./History.css"

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: "3vh",
        marginBottom: "3vh",
        marginRight: "auto",
        marginLeft: "auto",
        maxWidth: 500,
    },
    list: {
        marginRight: "auto",
        marginLeft: "auto",
        maxWidth: 500,
        backgroundColor: theme.palette.background.paper,
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



export default function History(props) {
    const classes = useStyles();
    const [operations, setOperations] = useState([]);
    const [allOperations, setAllOperations] = useState([]);
    //category to filter later
    const [category, setCategory] = useState('all');
    //the operation the user want to modify
    const [operation, setOperation] = useState({});
    // the data to modify the operation
    const [categoryChange, setCategoryChange] = useState();
    const [dateChange, setDateChange] = useState();
    const [conceptChange, setConceptChange] = useState();
    const [amountChange, setAmountChange] = useState();

    var arr = [];
    var id = sessionStorage.getItem('id');
    const [open, setOpen] = useState(false);
    var objFecha = new Date();

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (id) {
            $.ajax({
                url: `http://localhost:3001/all/${id}`,
                type: "GET",
                dataType: "json",
                success: function (r) {
                    setOperations(r);
                    setAllOperations(r)
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
    }, [])

    useEffect(() => {
        allOperations.map(e => {
            if (e.category === category || category === "all") {
                arr.push(e)
            }
        })
        setOperations(arr)
    }, [category])

    useEffect(() => {

    }, [operations, operation])


    const handleFilterCategory = (e) => {
        e.preventDefault();
        setCategory(e.target.value);
    }

    const handleItemClick = (e) => {
        e.preventDefault();
        $.ajax({
            url: `http://localhost:3001/operation/${e.target.id}`,
            type: "GET",
            dataType: "json",
            success: function (r) {
                setOperation(r);
                setOpen(true);
            },
            error: function (xhr, status) {
                console.log(status)
            },
        })
    }
    const handleCategoryChange = (e) => {
        e.preventDefault();
        setCategoryChange(e.target.value)
    }
    const handleDateChange = (e) => {
        e.preventDefault();
        setDateChange(e.target.value)
    }
    const handleConceptChange = (e) => {
        e.preventDefault();
        setConceptChange(e.target.value)
    }
    const handleAmountChange = (e) => {
        e.preventDefault();
        setAmountChange(e.target.value)
    }
    const handleModifyOperation = () => {
        $.ajax({
            url: `http://localhost:3001/edit/${operation.id}`,
            type: "PUT",
            data: {
                concept: conceptChange,
                amount: amountChange,
                category: categoryChange,
                date: dateChange
            },
            dataType: "json",
            success: function (r) {
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
    const handleDeleteOperation = (e) => {
        e.preventDefault();
        $.ajax({
            url: `http://localhost:3001/delete/${operation.id}`,
            type: "DELETE",
            dataType: "json",
            success: function (r) {
                window.location.reload();
            },
            error: function (xhr, status) {
                console.log(status)
            },
        })
    }

    return (
        <Card className={classes.list}>
            <div className="Title__History">
                <Typography gutterBottom variant="h6" component="h2">
                    Movimientos recientes
                    </Typography>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-native-simple">Categoria</InputLabel>
                    <Select
                        native
                        onChange={handleFilterCategory}
                    >
                        <option aria-label="None" value="all" />
                        <option value='all'>Todas</option>
                        <option value='Alimentación'>Alimentación</option>
                        <option value='Educacion'>Educacion</option>
                        <option value='Inversiones'>Inversiones</option>
                        <option value='Pagos'>Pagos</option>
                        <option value='Premios'>Premios</option>
                        <option value='Regalo'>Regalo</option>
                        <option value='Ropa'>Ropa</option>
                        <option value='Salud'>Salud</option>
                        <option value='Sueldo'>Sueldo</option>
                        <option value='Transporte'>Transporte</option>
                        <option value='Vivienda'>Vivienda</option>
                        <option value='Varios'>Varios</option>
                    </Select>
                </FormControl>
            </div>
            <CardActionArea>
                <CardContent>


                    <Divider />
                    <div className="List__Main">
                        <List component="nav" aria-label="main mailbox folders" >
                            <div className="List__container">
                                {operations && operations.slice(-10, operations.length).map((e, i) => {

                                    return <ListItem button alignItems='flex-start' onClick={handleItemClick}>
                                        <ListItemIcon>
                                            {e.type === "add" ? <TrendingUpIcon color="primary" /> : <TrendingDownIcon color="secondary" />}
                                        </ListItemIcon>
                                        <div className="List__Item">
                                            <p id={e.id}>{e.date}</p>
                                            <p id={e.id}>{e.category}</p>
                                            <p id={e.id}>{e.concept}</p>
                                            <p id={e.id}>{e.type === 'add' ? '$' + e.amount : '-$' + e.amount}</p>
                                        </div>
                                    </ListItem>

                                })}
                            </div>
                        </List>
                    </div >
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Modificar o eliminar</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Puede modificar uno o todos los campos
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="concept"
                                label="Concepto"
                                defaultValue={operation.concept}
                                onChange={handleConceptChange}
                                fullWidth
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="amount"
                                label="Importe"
                                defaultValue={operation.amount}
                                onChange={handleAmountChange}
                                fullWidth
                            />
                            <div className="Form__Modify__Operation">
                                <form className={classes.container} noValidate>
                                    <TextField
                                        id="date"
                                        label="Fecha"
                                        type="date"
                                        defaultValue={operation.date}
                                        className={classes.textField}
                                        onChange={handleDateChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </form>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="age-native-simple">Categoria</InputLabel>
                                    {operation.type === "rem" ? <Select
                                        native
                                        onChange={handleCategoryChange}
                                        value={operation.category}
                                    >
                                        <option value={operation.category}>{operation.category}</option>
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
                                            onChange={handleCategoryChange}
                                            value={operation.category}>
                                            <option value={operation.category}>{operation.category}</option>
                                            <option value='Inversiones'>Inversiones</option>
                                            <option value='Premios'>Premios</option>
                                            <option value='Regalo'>Regalo</option>
                                            <option value='Sueldo'>Sueldo</option>
                                            <option value='Varios'>Varios</option>
                                        </Select>}
                                </FormControl>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleDeleteOperation} color="secondary">
                                Eliminar
                            </Button>
                            <Button onClick={handleModifyOperation} color="primary">
                                Modificar
                            </Button>
                        </DialogActions>
                    </Dialog>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}