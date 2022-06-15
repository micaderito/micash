import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AppStateWithIngreso } from '../ingreso-egreso/ingreso-egreso.reducer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubs: Subscription;
  ingresosEgresosSubs: Subscription;

  constructor(private store: Store<AppStateWithIngreso>, private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {

    this.userSubs = this.store.select('user')
    .pipe(filter(auth => auth.user != null))
    .subscribe( ({user}) => {
      this.ingresosEgresosSubs = this.ingresoEgresoService.initIngresosEgresosListener(user.uid)
          .subscribe(ingresosEgresos => {
          this.store.dispatch(ingresoEgresoActions.setItems({items: ingresosEgresos}))
      })
    })

  }

  ngOnDestroy(): void {
    this.ingresosEgresosSubs?.unsubscribe();
    this.userSubs?.unsubscribe();
  }

}
