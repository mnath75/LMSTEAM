import * as Actions from '../actions/themeActions';
import { Themes} from "../../Theme/theme";

const initialState = {
    theme: Themes
};
export const themeReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.APPLY_THEME:
            return Object.assign({}, { theme: action.payload } );
        default:
            return state;
    }
};
