export const styles = theme => ({
  button: {
    marginRight: '20px'
  },
  badge: {
    top: -13,
    right: -12,
    border: `2px solid ${
        theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
      }`,
  },
});