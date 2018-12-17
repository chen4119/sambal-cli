export const OPEN_SNACKBAR = 'OPEN_SNACKBAR';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';


export const showSnackbar = () => (dispatch) => {
    dispatch({
        type: OPEN_SNACKBAR
    });
    window.clearTimeout(snackbarTimer);
    snackbarTimer = window.setTimeout(() =>
    dispatch({ type: CLOSE_SNACKBAR }), 3000);
};
