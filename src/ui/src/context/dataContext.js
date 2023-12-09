import { createContext, useContext, useMemo, useReducer } from "react";
import PropTypes from "prop-types";

const DataContext = createContext();
DataContext.displayName = "ApplicationDataContext";

function reducer(state, action) {
  let newState;
  switch (action.type) {
    case "UPDATE_RESUME": {
      const updatedResumes = state.ResumeData.map((resume) =>
        resume.id === action.id ? { ...resume, status: action.status } : resume
      );
      newState = { ...state, ResumeData: updatedResumes };
      break;
    }
    case "ADD_RESUME": {
      const totalResumeCount = state.ResumeData.length + 1;
      const newResumeWithCount = {
        ...action.newResume,
        totalResumeCount,
      };
      newState = { ...state, ResumeData: [...state.ResumeData, newResumeWithCount] };
      break;
    }

    case "REMOVE_RESUME": {
      newState = {
        ...state,
        ResumeData: state.ResumeData.filter((resume) => resume.id !== action.value),
      };
      break;
    }
    case "UPDATE_USER_STATE": {
      newState = { ...state, UserData: action.value };
      break;
    }
    case "SET_SELECTED_ROWS": {
      return { ...state, selectedRowIds: action.selectedRowIds };
    }
    case "UPDATE_DATA": {
      return { ...state, ResumeData: action.newData };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }

  localStorage.setItem("resumeData", JSON.stringify(newState.ResumeData));
  return newState;
}

function DataContextControllerProvider({ children }) {
  const initialState = {
    ResumeData: JSON.parse(localStorage.getItem("resumeData")) || [],
    UserData: [],
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

function useDataContextController() {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error(
      "useDataContextController should be used inside the DataContextControllerProvider."
    );
  }

  return context;
}

DataContextControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const setUpdateResume = (dispatch, id, status) => dispatch({ type: "UPDATE_RESUME", id, status });
const setAddResume = (dispatch, newResume) => dispatch({ type: "ADD_RESUME", newResume });
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
