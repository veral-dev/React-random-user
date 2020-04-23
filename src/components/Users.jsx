import React, { Component } from 'react'
import ModalUser from './ModalUser'
import Spinner from './ui/Spinner'

import { UsersContext } from '../context/Users.context'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';


import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}
const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing(50),
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
        outline: 'none',
    },
});

class Users extends Component {
    static contextType = UsersContext
    state = {
        open: false,
        modalId: null
    };


    deleteUser = idx => {
        const { users, setUsers } = this.context
        let usersCopy = [...users]
        usersCopy.splice(idx, 1)
        setUsers(usersCopy)
    }
    handleOpen = idx => {
        this.setState({ open: true, modalId: idx });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { users, loading } = this.context

        const { classes } = this.props;
        return (

            <div>
                <Grid container spacing={3}>
                    {loading ? (<><Spinner /></>) : users.map((elm, idx) => (
                        <Grid key={idx}
                            item xs={12} sm={6} md={3} >
                            <Card>
                                <div>
                                    <CardMedia
                                        component="img"
                                        alt={elm.name.last}
                                        height="250"
                                        image={elm.picture.large}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2" align="center">{elm.name.first} {elm.name.last}</Typography>
                                        <Typography variant="body1" component="p" align="center">Gender: {elm.gender}</Typography>
                                        <Typography variant="body1" component="p" align="center">City: {elm.location.city}</Typography>
                                        <Typography variant="body1" component="p" align="center">Country: {elm.location.country}</Typography>
                                        <Typography variant="body1" component="p" align="center">Phone: {elm.phone}</Typography>

                                    </CardContent>
                                </div>
                                <CardActions className="center-btn">
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        startIcon={<EditIcon />}
                                        onClick={() => this.handleOpen(idx)}>Ver más</Button>
                                    <Button
                                        style={{ borderColor: 'tomato', color: 'tomato' }}
                                        variant="outlined"
                                        startIcon={<DeleteIcon />}
                                        onClick={() => this.deleteUser(idx)}>Borrar</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}

                </Grid>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                >
                    <div style={getModalStyle()} className={classes.paper}>

                        <ModalUser
                            id={this.state.modalId}
                            handleClose={this.handleClose} />
                    </div>
                </Modal>
            </div>

        )
    }
}

Users.propTypes = {
    classes: PropTypes.object.isRequired,
};

const UserWrapped = withStyles(styles)(Users);

export default UserWrapped;

