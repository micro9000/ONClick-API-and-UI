import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Badge from '@material-ui/core/Badge';

const styles = theme => ({
    inline: {
        display: 'inline'
    },
    actionBtn: {
        margin: '2px'
    }
});

function ProjectTile(props) {
    const { classes, onDrawerToggle } = props;

    return (
        <Fragment>
            <ListItem alignItems="flex-start" button>
                <ListItemAvatar>
                    <Avatar>
                        <FolderIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary="Project Title"
                    secondary={
                        <Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                Current Status
                            </Typography>
                            {" — I'll be in your neighborhood doing errands this…"}
                        </Fragment>
                    }
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" className={classes.actionBtn}>
                        <Badge badgeContent={4} color="secondary">
                            <VisibilityIcon />
                        </Badge>
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" className={classes.actionBtn}>
                        <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" className={classes.actionBtn}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <Divider light />
        </Fragment>
    );
}

ProjectTile.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProjectTile);