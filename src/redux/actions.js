export const SET_Tasks = 'SET_Tasks';
export const SET_TASK_ID = 'SET_TASK_ID';

export const setTasks = Tasks => dispatch => {
    dispatch({
        type: SET_Tasks,
        payload: Tasks,
    });
};

export const setTaskID = taskID => dispatch => {
    dispatch({
        type: SET_TASK_ID,
        payload: taskID,
    });
};
