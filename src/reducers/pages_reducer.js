import {PAGE_CHANGE} from '../actions';


export default function(state=1, action) {
	switch(action.type){
		case PAGE_CHANGE:
			return action.payload
	}
	return state;
};