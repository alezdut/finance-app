import React, { useEffect, useState } from "react";
import $ from "jquery";
import Swal from 'sweetalert2';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import "./Login.css";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '95%',
        },
    },
}));

export default function Login() {
    const classes = useStyles();
    const [register, setregister] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repass, setRepass] = useState('');
    const [error, setError] = useState(false);
    const [error2, setError2] = useState(false);
    const [userId, setUserId] = useState();

    useEffect(() => {
        if (password === repass && password.length > 7 && name.length > 0 && email.length > 0) {
            setError(false);
        }
        else {
            setError(true)
            if (email && password) {
                setError2(false)
            }
            else {
                setError2(true)
            }
        }
    }, [password, repass, name, email])

    const handleNameChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
    }
    const handleEmailChange = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    }
    const handleRePasswordChange = (e) => {
        e.preventDefault();
        setRepass(e.target.value);
    }
    const handleClick = (e) => {
        e.preventDefault();
        setregister(!register)
    }
    const handleRegister = (e) => {
        e.preventDefault();
        $.ajax({
            url: "http://localhost:3001/user",
            data: {
                name: name,
                email: email,
                password: password
            },
            type: "POST",
            dataType: "json",
            success: function (json) {
                $.post("http://localhost:3001/login", {
                    email: email,
                    password: password
                }, function (r) {
                    console.log(r)
                    sessionStorage.setItem('id', `${r.id}`);
                    sessionStorage.setItem('logged', "true");
                    Swal.fire({
                        icon: 'success',
                        title: 'Inicio de sesion',
                        text: 'Ya puedes cargar nuevas operaciones',
                    })
                    //window.location.reload();
                })
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
    const handleIngresar = (e) => {
        e.preventDefault();
        $.ajax({
            url: "http://localhost:3001/login",
            data: {
                email: email,
                password: password
            },
            type: "POST",
            dataType: "json",
            success: function (r) {
                sessionStorage.setItem('id', `${r.id}`);
                sessionStorage.setItem('logged', "true");
                Swal.fire({
                    icon: 'success',
                    title: 'Inicio de sesion',
                    text: 'Ya puedes cargar nuevas operaciones',
                }).then(r => {
                    window.location.reload();
                })

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

    return (
        <div className="Login__main">
            {register ? <div className="Login__Form">
                <div className="Name__form">
                    <form className={classes.root} noValidate autoComplete="off" onChange={handleNameChange}>
                        <TextField id="name" label="Nombre" variant="outlined" />
                    </form>
                </div>
                <div className="Username__Form">
                    <form className={classes.root} noValidate autoComplete="off" onChange={handleEmailChange}>
                        <TextField id="email" label="Email" variant="outlined" />
                    </form>
                </div>
                <div className="Password__Form">
                    <div>
                        <form className={classes.root} noValidate autoComplete="off" onChange={handlePasswordChange}>
                            <TextField id="password" label="password" type="password" variant="outlined" />
                        </form>
                    </div>
                </div>
                <div className="Password__Form">
                    <div>
                        <form className={classes.root} noValidate autoComplete="off" onChange={handleRePasswordChange}>
                            <TextField id="password" label="password" type="password" variant="outlined" />
                        </form>
                    </div>
                </div>
                <div className="Button__Form">
                    <Button variant="contained" disabled={error} color="primary" onClick={handleRegister}>
                        Registrarse
                    </Button>
                </div>
            </div>
                :
                <div className="Login__Form">
                    <div className="Username__Form">
                        <form className={classes.root} noValidate autoComplete="off" onChange={handleEmailChange}>
                            <TextField id="email" label="Email" variant="outlined" />
                        </form>
                    </div>
                    <div className="Password__Form">
                        <div>
                            <form className={classes.root} noValidate autoComplete="off" onChange={handlePasswordChange}>
                                <TextField id="password" label="password" type="password" variant="outlined" />
                            </form>
                        </div>
                    </div>
                    <div className="Button__Form">
                        <Button variant="contained" disabled={error2} color="primary" onClick={handleIngresar}>
                            Ingresar
                        </Button>
                    </div>
                </div>}
            <div className="Login__text" onClick={handleClick}>
                {register ? <Typography variant="h6">Ya tienes cuenta?</Typography> : <Typography variant="h6">No tienes cuenta?</Typography>}
            </div>

        </div>
    )
}
