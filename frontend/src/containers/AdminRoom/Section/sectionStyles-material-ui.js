export const styles = theme => ({
    root: {
        width: '80%',
        marginBottom: '20px',
    },
    heading: {
        display: 'flex',
        textAlign: 'right',
        marginTop: "10px",
        fontSize: theme.typography.pxToRem(28),
    },
    description: {
        fontSize: theme.typography.pxToRem(28),
        marginBottom: '20px'
    },
    sectionBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    selectForm: {
        width: '100%'
    },
    selectTitle: {
        fontSize: theme.typography.pxToRem(22),
    },
    active: {
        marginLeft: '35px',
        marginTop: '20px'
    },
    questionType: {
        fontSize: theme.typography.pxToRem(25),
    },
    iconHover: {
        margin: theme.spacing.unit * 2,
        color: '#18FFFF',
    },
    deleteBtn: {
        margin: 'auto 55px auto',
        width: '100px',
        height: '20px',
        textAlign: 'center'
    },
    // editButton: {
    //     margin:
    //     textAlign: 'center',
    //     padding: '0'
    // }
});