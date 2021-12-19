import {
  IonContent,
  IonPage,
  IonFab,
  IonFabButton,
  IonIcon,
  IonFabList,
  useIonModal,
} from "@ionic/react";
import { gift, bicycle, cube, bagCheck } from "ionicons/icons";

import OrdersList from "../components/OrdersList";
// import NewOrder from "../components/NewOrder";

export default function Order() {
  //   const handleDismiss = () => {
  //     dismiss();
  //   };

  // const [present, dismiss] = useIonModal(NewOrder, {
  //   onDismiss: handleDismiss,
  // });
  return (
    <IonPage>
      <IonContent>
      <IonFab vertical="top" horizontal="end" slot="fixed">
            <IonFabButton color="dark">
              <IonIcon icon={gift} />
            </IonFabButton>
            <IonFabList side="start">
              <IonFabButton>
                <IonIcon icon={bagCheck} />
              </IonFabButton>
              <IonFabButton>
                <IonIcon icon={bicycle} />
              </IonFabButton>
              <IonFabButton href="/dashboard/orders/new">
                <IonIcon icon={cube} />
              </IonFabButton>
            </IonFabList>
          </IonFab>
        <div className="p-2 md:p-4">
          

          <OrdersList />
        </div>
      </IonContent>
    </IonPage>
  );
}
