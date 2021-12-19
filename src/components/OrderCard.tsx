
import {
    IonCard,
    IonCardContent,
    IonLabel,
    IonList,
    IonListHeader,
    IonButton,
    IonIcon,
    IonChip,
    IonItem,
    IonText
} from '@ionic/react'
import { trash } from "ionicons/icons";
import { formatIDR } from '../utilities/idrFormatter';


export const OrderCard = (props: any) => {
    const {order} = props
    return (
        <IonCard className="mb-4">
              <IonCardContent>
                <IonList>
                  <IonListHeader lines="inset">
                    <IonLabel className="text-xl">{order.item}</IonLabel>
                    <IonButton>
                        <IonIcon className="text-xl" icon={trash}/>
                    </IonButton>
                    <IonChip>
                      <IonLabel color="primary">{order.paket}</IonLabel>
                    </IonChip>
                  </IonListHeader>
                  <IonItem>
                    <IonLabel>Pengirim</IonLabel>
                    <IonText>{order.sender}</IonText>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Penerima</IonLabel>
                    <IonText>{order.receiver}</IonText>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Harga Barang</IonLabel>
                    <IonText>{formatIDR(order.itemPrice)}</IonText>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Ongkos Kirim</IonLabel>
                    <IonText>{formatIDR(order.ongkir)}</IonText>
                  </IonItem>
                  <IonItem lines="none">
                    <IonLabel color="primary" className="font-bold">
                      Subtotal
                    </IonLabel>
                    <IonText color="primary" className="font-bold">
                      {formatIDR(order.ongkir + order.itemPrice)}
                    </IonText>
                  </IonItem>
                </IonList>
              </IonCardContent>
            </IonCard>
    )
}
