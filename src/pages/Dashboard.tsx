import React from "react";
import { Redirect, Route } from 'react-router'
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonBadge,
  IonRouterOutlet,
} from "@ionic/react";
import { gift, personCircle, map, cart } from "ionicons/icons";
import Order from './Order'
import Account from "./Account";
import Portal from "./Portal";
import NewOrder from "../pages/NewOrder";
import Outbox from "./Outbox";
import { useOrderContext } from '../hooks/useOrderContext'

export default function Dashboard() {
  const { orders } = useOrderContext()

  return (
    <IonTabs>
        <IonRouterOutlet>
          <Route path="/dashboard/orders" component={Order} exact={true} />
          <Route path="/dashboard/account" component={Account} exact={true} />
          <Route path="/dashboard/portal" component={Portal} />
          <Route path="/dashboard/outbox" component={Outbox} />
          <Route path="/dashboard/orders/new" component={NewOrder} exact={true}/>
          <Route path="/dashboard" render={() => <Redirect to="/dashboard/orders" />} exact={true} />
        </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="schedule" href="/dashboard/orders">
          <IonIcon icon={gift} />
          <IonLabel>Pengiriman</IonLabel>
          <IonBadge>6</IonBadge>
        </IonTabButton>

        <IonTabButton tab="outbox" href="/dashboard/outbox">
          <IonIcon icon={cart} />
          <IonLabel>Order</IonLabel>
          <IonBadge>{orders && orders.length}</IonBadge>
        </IonTabButton>

        <IonTabButton tab="map" href="/dashboard/portal">
          <IonIcon icon={map} />
          <IonLabel>Portal</IonLabel>
        </IonTabButton>

        <IonTabButton tab="speakers" href="/dashboard/account">
          <IonIcon icon={personCircle} />
          <IonLabel>Account</IonLabel>
        </IonTabButton>

        
      </IonTabBar>
    </IonTabs>
  );
}
