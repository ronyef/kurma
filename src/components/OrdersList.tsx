import React from "react";
import {
    IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
} from '@ionic/react'

export default function OrdersList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
      <IonCard className="" color="secondary">
        <IonCardHeader>
          <IonCardSubtitle>Baju Kemeja</IonCardSubtitle>
          <IonCardTitle>Arman Ramadhan</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          Jalan Perusda No 33, Kalibaru, Gunung Sari Ilir. 0823458585
        </IonCardContent>
      </IonCard>
      <IonCard className="" color="success">
        <IonCardHeader>
          <IonCardSubtitle>Sajadah Turki</IonCardSubtitle>
          <IonCardTitle>Alimah Rizki</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          Jalan Kabo Jaya No 23, Belakang Masjid Nurul Huda, Kel. Kalijati.
          8237787236
        </IonCardContent>
      </IonCard>
      <IonCard className="" color="secondary">
        <IonCardHeader>
          <IonCardSubtitle>Filter Air Maspion</IonCardSubtitle>
          <IonCardTitle>Sujono</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          Gang Kelapa RT 12 No 34, Kampung Kandang, Kel. Kalibaru. 03789487948
        </IonCardContent>
      </IonCard>
      <IonCard className="" color="success">
        <IonCardHeader>
          <IonCardSubtitle>Hanger Baju</IonCardSubtitle>
          <IonCardTitle>Saifuding</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          Jl Mayjen Surono, RT 24 Gang Merdeka No 23, Kel Karanganyar.
          072834783948
        </IonCardContent>
      </IonCard>
      <IonCard className="" color="secondary">
        <IonCardHeader>
          <IonCardSubtitle>Hair Dryer</IonCardSubtitle>
          <IonCardTitle>Sofi Andari</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          Gunung Sari Ilir Gang Pal Merah, RT 12 No 234, Kel. Gn Sari.
          0734898478
        </IonCardContent>
      </IonCard>
    </div>
  );
}
