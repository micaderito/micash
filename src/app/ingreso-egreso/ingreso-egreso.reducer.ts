import { createReducer, on } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import * as actions from './ingreso-egreso.actions';
import { AppState } from '../app.reducer';

export interface State {
    items: IngresoEgreso[]; 
}

export interface AppStateWithIngreso extends AppState{
    ingresosEgresos: State
}

export const initialState: State = {
   items: [],
}

export const ingresoEgresoReducer = createReducer(initialState,

    on(actions.setItems, (state, {items}) => ({ ...state, items: [...items]})),
    on(actions.unSetItems, (state) => ({ ...state, items: []})),

);
