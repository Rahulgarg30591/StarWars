import update from 'react-addons-update';

export default function userReducer(state = null, action) {
    switch(action.type) {
    case "SET_USER": {
        return update(state, { $set: action.payload });
    }
    }
    return state;
}
