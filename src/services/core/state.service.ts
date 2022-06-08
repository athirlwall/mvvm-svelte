import { writable } from "svelte/store";
import { LIGHT } from "../../types";

export type AppState = {
  lightMode: string;
};

const defaultState: AppState = {
  lightMode: LIGHT,
};

export class StateService {
  state = writable(defaultState);

  setState(key: string, value: any) {
    this.state.update((state) => {
      return {
        ...state,
        [key]: value,
      };
    });
  }

  getStateStore() {
    return this.state;
  }
}

export const stateService = new StateService();
