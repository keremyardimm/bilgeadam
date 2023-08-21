import { createContext, useContext, useMemo, useReducer } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// The Material Dashboard 2 PRO React main context
const DataContext = createContext();

// Setting custom name for the context which is visible on react dev tools
DataContext.displayName = "ApplicationDataContext";

// Material Dashboard 2 PRO React reducer
function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_RESUME": {
      //   console.log("updateResume", action.value);
      return { ...state, ResumeData: action.value };
    }
    case "ADD_RESUME": {
      return { ...state, ResumeData: action.value };
    }
    case "REMOVE_RESUME": {
      return { ...state, ResumeData: action.value };
    }
    case "UPDATE_USER_STATE": {
      return { ...state, UserData: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// Material Dashboard 2 PRO React context provider
function DataContextControllerProvider({ children }) {
  const initialState = {
    ResumeData: [],
    UserData: [],
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

// Material Dashboard 2 PRO React custom hook for using context
function useDataContextController() {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error(
      "useDataContextController should be used inside the DataContextControllerProvider."
    );
  }

  return context;
}

// Typechecking props for the MaterialUIControllerProvider
DataContextControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Context module functions
const setUpdateResume = (dispatch, value) => dispatch({ type: "UPDATE_RESUME", value });
const setAddResume = (dispatch, value) => dispatch({ type: "ADD_RESUME", value });
const setRemoveResume = (dispatch, value) => dispatch({ type: "REMOVE_RESUME", value });
const setUpdateUserState = (dispatch, value) => dispatch({ type: "UPDATE_USER_STATE", value });

export {
  DataContextControllerProvider,
  useDataContextController,
  setUpdateResume,
  setAddResume,
  setRemoveResume,
  setUpdateUserState,
};
