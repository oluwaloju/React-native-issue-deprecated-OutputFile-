import { SET_Tasks, SET_TASK_ID } from './actions';

const initialState = {
    Tasks: [],
    taskID: 1,
}

function taskReducer(state=initialState, action) {
    if(action.type===SET_Tasks){
        return { ...state, Tasks: action.payload };
    }
    else if(action.type===SET_TASK_ID){
        return { ...state, taskID: action.payload };
    }
   else{
        return state;
    }
   
}

export default taskReducer;
