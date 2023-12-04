
import { PARENT_EMAIL } from './action';
import { TEACHER_EMAIL } from './action';
import { STUDENT_EMAIL } from './action';
import { ADMIN_DETAIL } from './action';

const initialState = {
    parentData:'',
   stdData:'',
   TeacherData:'',
   AdminData:'',
  };
  export default itemReducer = (state = initialState, action) => {
    switch (action.type) {
     
     
        case ADMIN_DETAIL:
          return {
            ...state,
            AdminData: action.payload  ,
          };
          case TEACHER_EMAIL:
            return {
              ...state,
              TeacherData: action.payload  ,
            };
            case STUDENT_EMAIL:
              return {
                ...state,
                stdData: action.payload  ,
              };
              case PARENT_EMAIL:
                return {
                  ...state,
                  parentData: action.payload  ,
                };
       
     
        
      default:
        return state;
    }
  };

 