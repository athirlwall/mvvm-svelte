import type { Writable } from "svelte/store";
import { writable } from "svelte/store";
import type { CustomerModel } from "../models/customer";
import { MockHttpService } from "../services/core/http.service";
import type { AppState, StateService } from "../services/core/state.service";
import { stateService } from "../services/core/state.service";
import { DARK, LIGHT } from "../types";

export class DetailViewModel {
  record: CustomerModel;
  stateService: StateService;
  appState: AppState;
  notifier: Writable<DetailViewModel>;

  async initialize(id: string) {
    this.notifier = writable<DetailViewModel>(this);
    this.stateService = stateService;
    this.stateService.getStateStore().subscribe((appState) => {
      this.appState = appState;
      this.notifyViews();
    });
    await this.loadRecord(id);
    return this;
  }

  notifyViews() {
    this.notifier.set(this);
  }

  toggleMailFlag() {
    this.record.mail = !this.record.mail;
    this.notifyViews();
  }

  async loadRecord(id: string) {
    this.record = await MockHttpService.fetch(`https://detail/${id}`).then(
      (record) => {
        const customer: CustomerModel = {
          id: record.id,
          title: record.title,
          firstname: record.firstname,
          surname: record.surname,
          address1: record.address1,
          address2: record.address2,
          postcode: record.postcode,
          telephone: record.telephone,
          email: record.email,
          mail: record.mail,
          age: record.age,
        };

        return customer;
      }
    );
  }

  toggleLightDark() {
    this.stateService.setState(
      "lightMode",
      this.appState.lightMode === LIGHT ? DARK : LIGHT
    );
  }
}
