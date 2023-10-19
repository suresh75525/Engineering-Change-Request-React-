const initialState = {
    emp_logged: null,
    logged_dept: null,
    Dept_logged: null,
    logged_user: null,
    BomUserType : null,
    EcrUserType : null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case "emp_logged":
        return {
          ...state,
          emp_logged: action.payload,
        };
      case "logged_dept":
        return {
          ...state,
          logged_dept: action.payload,
        };
        case "Dept_logged":
        return {
          ...state,
          Dept_logged: action.payload,
        };
        case "logged_user":
        return {
          ...state,
          logged_user: action.payload,
        };
        case "Ecr_UserType":
        return {
          ...state,
          EcrUserType: action.payload,
        };
        case "Bom_UserType":
        return {
          ...state,
          BomUserType: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;