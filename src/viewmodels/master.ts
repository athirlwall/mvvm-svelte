import type { Writable } from "svelte/store";
import { writable } from "svelte/store";
import { MockHttpService } from "../services/core/http.service";
import type { MasterModel } from "../models/master";
import type { AppState, StateService } from "../services/core/state.service";
import { stateService } from "../services/core/state.service";
import type { ErrorState } from "../types";

export class MasterViewModel {
  records: MasterModel[];
  stateService: StateService;
  appState: AppState;
  notifier: Writable<MasterViewModel>;
  busy: boolean;
  error: boolean;
  errorState: ErrorState | undefined;

  async initialize() {
    this.notifier = writable<MasterViewModel>(this);
    this.stateService = stateService;
    this.busy = false;
    this.error = false;
    this.stateService.getStateStore().subscribe((appState) => {
      this.appState = appState;
      this.notifyViews();
    });
    await this.loadAllRecords();
    return this;
  }

  notifyViews() {
    this.notifier.set(this);
  }

  async loadAllRecords() {
    this.records = await MockHttpService.fetch("https://master/").then(
      (records) => {
        return records.map((record): MasterModel => {
          return {
            id: record.id,
            name: `${record.firstname} ${record.surname}`,
            telephone: record.telephone,
            email: record.email,
            customerId: record.customerId,
          };
        });
      }
    );
  }

  toggleBusy() {
    this.busy = !this.busy;
    this.notifyViews();
  }

  toggleError() {
    if (this.error) {
      this.error = false;
      this.errorState = undefined;
    } else {
      this.error = true;
      this.errorState = {
        message: "ViewModel in Error State",
        code: 1,
      };
    }
    this.notifyViews();
  }
}
