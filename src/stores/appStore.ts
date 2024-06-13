import { defineStore } from 'pinia';

import * as t from '@/types';
import * as e from '@/types/enums';

type State = {};

type Actions = {};

type Getters = {};

export const useAppStore = defineStore<'appStore', State, Getters, Actions>('appStore', {
  state: () => ({

  }),
  actions: {},
});
