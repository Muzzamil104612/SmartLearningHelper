
export const TEACHER_EMAIL = "TEACHER_EMAIL";
export const STUDENT_EMAIL = "STUDENT_EMAIL";
export const ADMIN_DETAIL = "ADMIN_DETAIL";
export const PARENT_EMAIL = "PARENT_EMAIL";


  
  export const teacheremail = value => ({
    type:TEACHER_EMAIL,
    payload: value,
  });
  export const stdemail = value => ({
    type:STUDENT_EMAIL,
    payload: value,
  });

  export const admindetail = value => ({
    type:ADMIN_DETAIL,
    payload: value,
  });
  export const parentemail = value => ({
    type:PARENT_EMAIL,
    payload: value,
  });
 


