import React, { useEffect, useState } from "react";

import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonText,
  IonChip,
  IonCard,
  IonCardContent,
  IonButton,
  IonImg,
} from "@ionic/react";
import { trash } from "ionicons/icons";
import { useOrderContext } from "../hooks/useOrderContext";
import { OrderCard } from "../components/OrderCard";
import { formatIDR } from "../utilities/idrFormatter";

export default function Outbox() {
  const { orders } = useOrderContext();
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    let total = 0;
    orders.forEach((order: any) => {
      total += order.ongkir + order.itemPrice;
    });
    setGrandTotal(total);
  }, [orders]);

  return (
    <IonPage>
      <IonContent>
        <div className="flex w-screen justify-center pt-4">
          <div className="md:w-2/5 w-full">
            {orders &&
              orders.map((order: any) => (
                <OrderCard order={order} key={order.id} />
              ))}
            {grandTotal != 0 && (
              <div>
              <IonCard className="mb-4" color="primary">
                <IonCardContent>
                  {/* <IonList> */}
                  <IonItem color="transparent" lines="none">
                    <IonLabel className="text-2xl font-bold">
                      GRAND TOTAL
                    </IonLabel>
                    <IonText className="font-bold">
                      {formatIDR(grandTotal)}
                    </IonText>
                  </IonItem>
                  {/* </IonList> */}
                </IonCardContent>
              </IonCard>
              <IonButton className="px-2" size="large" color="success" expand="block">Proses Order</IonButton>
              </div>
            )}
          </div>
        </div>
        {grandTotal == 0 && 
        <div className="flex justify-center">
          <div className="flex flex-col ">
            <IonImg className="h-3/4" src="assets/img/card600.png" alt="empty" />
            <div className="flex justify-center">
              <IonButton color="dark">Ayo kirim barang</IonButton>
            </div>
            <div className="flex justify-center">
            <IonLabel className="text-gray-500">Keranjangmu kosong.</IonLabel>
            </div>
          </div>
        </div>
        }
      </IonContent>
    </IonPage>
  );
}
