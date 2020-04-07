export const styles = theme => ({
    buttonIcon: {
        width: '64px',
        height: '64px',
        marginRight: '20px',
        padding: 0
    },
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    DialogContent: {
        display: 'flex',
        flexDirection: 'column'
    },
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing.unit * 3,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
    iconHover: {
        color: '#FF5252',
        '&:hover': {
            color: '#00BFA5'
        }
    }
});