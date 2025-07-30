import React, { createContext, useContext, useReducer, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

// Initial state
const initialState = {
  prd: {
    // This will hold all the PRD data
  },
  theme: 'light',
  notifications: [],
  isLoading: false,
};

// Action types
const actionTypes = {
  SET_PRD: 'SET_PRD',
  SET_THEME: 'SET_THEME',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  SET_LOADING: 'SET_LOADING',
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_PRD:
      return {
        ...state,
        prd: action.payload,
      };
    case actionTypes.SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    case actionTypes.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case actionTypes.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload
        ),
      };
    case actionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [storedPrd, setStoredPrd] = useLocalStorage('prd', initialState.prd);
  const [state, dispatch] = useReducer(appReducer, { ...initialState, prd: storedPrd });

  useEffect(() => {
    setStoredPrd(state.prd);
  }, [state.prd, setStoredPrd]);

  // Actions
  const actions = {
    setPrd: (prd) => dispatch({ type: actionTypes.SET_PRD, payload: prd }),
    setTheme: (theme) => dispatch({ type: actionTypes.SET_THEME, payload: theme }),
    addNotification: (notification) =>
      dispatch({ type: actionTypes.ADD_NOTIFICATION, payload: notification }),
    removeNotification: (id) =>
      dispatch({ type: actionTypes.REMOVE_NOTIFICATION, payload: id }),
    setLoading: (loading) =>
      dispatch({ type: actionTypes.SET_LOADING, payload: loading }),
  };

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}; 