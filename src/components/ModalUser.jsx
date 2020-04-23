import React, { useState, useContext } from 'react'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import { UsersContext } from '../context/Users.context'



const ModalUser = ({ handleClose, id }) => {

    const { users, setUsers } = useContext(UsersContext)
    const [newUser, setNewUser] = useState({
        first: users[id].name.first,
        last: users[id].name.last,
        phone: users[id].phone,
        picture: users[id].picture.large
    })



    const getUserData = e => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value,
        })

    }

    const userEdit = () => {
        let userCopy = users[id]
        userCopy = { ...userCopy, name: { first: newUser.first, last: newUser.last }, phone: newUser.phone }
        let usersCopy = [...users]
        usersCopy[id] = userCopy
        setUsers(usersCopy)
        handleClose()
    }


    return (
        <div>
            <Typography align="center" variant="h5" component="h2">Más detalles</Typography>
            <CardMedia
                component="img"
                alt={newUser.last}
                height="350"
                image={newUser.picture}
            />
            <CardContent>
                <TextField
                    fullWidth
                    type="text"
                    name="first"
                    value={newUser.first}
                    label="Nombre"
                    variant="outlined"
                    style={{ paddingBottom: "20px" }}
                    onChange={getUserData}
                />
                <TextField
                    fullWidth
                    type="text"
                    name="last"
                    value={newUser.last}
                    label="Apellido"
                    variant="outlined"
                    style={{ paddingBottom: "20px" }}
                    onChange={getUserData}
                />
                <TextField
                    fullWidth
                    type="text"
                    name="phone"
                    value={newUser.phone}
                    label="Teléfono"
                    variant="outlined"
                    style={{ paddingBottom: "20px" }}
                    onChange={getUserData}
                />

            </CardContent>
            <CardActions className="center-btn">
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={userEdit}>Cerrar</Button>
            </CardActions>
        </div>
    );
}

export default ModalUser;

