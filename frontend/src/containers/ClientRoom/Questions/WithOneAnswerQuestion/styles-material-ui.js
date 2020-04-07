export const styles = theme => ({
  root: {
    width: '100%',
    marginBottom: '15px'
  },
  heading: {
    textAlign: 'center',
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  button: {
    margin: theme.spacing.unit,
  },
  container: {
    display: 'flex',
    flexDirection: 'column'
  }
});