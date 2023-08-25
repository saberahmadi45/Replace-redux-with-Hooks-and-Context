import { useState, useEffect } from "react";

let globalState = {};
let listeners = [];
let actions = {};

//Create a Custome-Hook

export const useStore = () => {
  const setState = useState(globalState)[1];

  const dispatch = (actionIdentifier, payload) => {
    const newState = actions[actionIdentifier](globalState, payload);

    globalState = { ...globalState, ...newState };

    for (const listener of listeners) {
      listener(globalState);
    }
  };

  //Register Listeners
  useEffect(() => {
    listeners.push(setState);

    return () => {
      //Unmount
      listeners = listeners.filter((li) => li !== setState);
    };
  }, [setState]);

  //
  return [globalState, dispatch];
};

export const initStore = (userActions, initialState) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }

  actions = { ...actions, ...userActions };
};
