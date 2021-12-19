import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import { useAuthContext } from "../hooks/useAuthContext";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonList,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonRadioGroup,
  IonContent,
  IonRadio,
  IonListHeader,
  IonSelect,
  IonSelectOption,
  IonText,
  IonCheckbox,
} from "@ionic/react";
import wilayah from "../data/kelurahan.json";
import { useOrder } from "../hooks/useOrder";
import { formatIDR } from "../utilities/idrFormatter";

export default function NewOrder() {
  const { user } = useAuthContext();
  const { placeOrder } = useOrder()

  const [payment, setPayment] = useState("transfer");
  const [payor, setPayor] = useState("receiver");
  const [status, setStatus] = useState("isSender");
  //sender
  const [sender, setSender] = useState("");
  const [senderAddress, setSenderAddress] = useState("");
  const [senderKel, setSenderKel] = useState("Baru Ulu");
  const [senderWa, setSenderWa] = useState("");
  const [senderZone, setSenderZone] = useState(0);
  //receiver
  const [receiver, setReceiver] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [receiverKel, setReceiverKel] = useState("Teritip");
  const [receiverWa, setReceiverWa] = useState("");
  const [receiverZone, setReceiverZone] = useState(0);
  //item
  const [item, setItem] = useState("");
  const [paket, setPaket] = useState("reguler");
  const [note, setNote] = useState("");
  const [itemPrice, setItemPrice] = useState(0);

  //terms
  const [isLegal, setIsLegal] = useState(false);
  const [isSizeOK, setIsSizeOK] = useState(false);

  const [banHemat, setBanHemat] = useState(false);
  const history = useHistory();

  const setSenderArea = (kel: string) => {
    const result = wilayah.filter((zon) => zon.name === kel);
    setSenderZone(result[0].zona);
    setSenderKel(kel);
  };

  const setReceiverArea = (kel: string) => {
    const result = wilayah.filter((zon) => zon.name === kel);
    setReceiverZone(result[0].zona);
    setReceiverKel(kel);
  };

  //assign user data
  const fillUserData = () => {
    if (status === "isSender") {
      setSender(user.displayName);
      setSenderAddress(user.address);
      setSenderKel(user.kelurahan);
      setSenderWa(user.phone);
      setSenderZone(user.zona);
      // reset receiver
      setReceiver("");
      setReceiverAddress("");
      setReceiverKel("Teritip");
      setReceiverWa("");
      setReceiverZone(0);
    }

    if (status === "isReceiver") {
      setReceiver(user.displayName);
      setReceiverAddress(user.address);
      setReceiverKel(user.kelurahan);
      setReceiverWa(user.phone);
      setReceiverZone(user.zona);
      //reset sender
      setSender("");
      setSenderAddress("");
      setSenderKel("Baru Ulu");
      setSenderWa("");
      setSenderZone(0);
    }

    if (status === "isDropshipper") {
      setReceiver("");
      setReceiverAddress("");
      setReceiverKel("Teritip");
      setReceiverWa("");
      setReceiverZone(0);
      //reset sender
      setSender("");
      setSenderAddress("");
      setSenderKel("Baru Ulu");
      setSenderWa("");
      setSenderZone(0);
    }
  };

  useEffect(() => {
    var today = new Date();
    var time = today.getHours();
    if (time > 9) {
      setBanHemat(true);
    }
    fillUserData();
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const order = {
      payment,
      payor,
      sender,
      senderAddress,
      senderKel,
      senderWa,
      senderZone,
      receiver,
      receiverAddress,
      receiverKel,
      receiverWa,
      receiverZone,
      item,
      paket,
      note,
      itemPrice,
    };

    placeOrder(order)

  };

  useEffect(() => {
    fillUserData();
  }, [status]);

  return (
    <IonContent>
      <div className="mx-4 mt-6 w-1/2">
        <IonLabel className="text-xl pl-2">Pengiriman Paket</IonLabel>
        <IonRadioGroup
          value={status}
          // onIonChange={(e) => setStatus(e.detail.value)}
          onIonChange={(e) => setStatus(e.detail.value)}
        >
          <IonListHeader>
            <IonLabel>Saya sebagai:</IonLabel>
          </IonListHeader>
          <div className="grid md:grid-cols-3">
            <IonItem>
              <IonLabel>Pengirim</IonLabel>
              <IonRadio slot="start" value="isSender" />
            </IonItem>
            <IonItem>
              <IonLabel>Penerima</IonLabel>
              <IonRadio slot="start" value="isReceiver" />
            </IonItem>
            <IonItem>
              <IonLabel>Dropshipper</IonLabel>
              <IonRadio slot="start" value="isDropshipper" />
            </IonItem>
          </div>
        </IonRadioGroup>
      </div>
      <form className="flex flex-wrap px-2 py-2" onSubmit={handleSubmit}>
        {/* {(status === "isReceiver" || status === "isDropshipper") && ( */}
        <IonCard className="w-full md:w-1/3">
          <IonCardHeader color="secondary">
            <IonCardTitle>Pengirim</IonCardTitle>
          </IonCardHeader>
          <IonCardContent className="pb-8">
            <IonList>
              <IonItem className="mt-2">
                <IonLabel position="floating">Nama Pengirim:</IonLabel>
                <IonInput
                  type="text"
                  required
                  value={sender}
                  onIonChange={(e) => setSender(e.detail.value!)}
                  disabled={status === "isSender"}
                />
              </IonItem>
              <IonItem className="mb-2 rounded-md">
                <IonTextarea
                  placeholder="Alamat Lengkap:"
                  required
                  value={senderAddress}
                  onIonChange={(e) => setSenderAddress(e.detail.value!)}
                  disabled={status === "isSender"}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Kelurahan:</IonLabel>
                <IonSelect
                  value={senderKel}
                  okText="OK"
                  cancelText="Batal"
                  onIonChange={(e) => setSenderArea(e.detail.value)}
                  disabled={status === "isSender"}
                >
                  {wilayah.map((kel) => (
                    <IonSelectOption key={kel.id} value={kel.name}>
                      {kel.name}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Nomor WA:</IonLabel>
                <IonInput
                  required
                  type="text"
                  inputMode="numeric"
                  value={senderWa}
                  onIonChange={(e) => setSenderWa(e.detail.value!)}
                  disabled={status === "isSender"}
                />
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>
        {/* )} */}
        {/* {(status === "isSender" || status === "isDropshipper") && ( */}
        <IonCard className="w-full md:w-1/3">
          <IonCardHeader color="success">
            <IonCardTitle>Penerima</IonCardTitle>
          </IonCardHeader>
          <IonCardContent className="pb-8">
            <IonList>
              <IonItem className="mt-2">
                <IonLabel position="floating">Nama Penerima:</IonLabel>
                <IonInput
                  type="text"
                  required
                  value={receiver}
                  onIonChange={(e) => setReceiver(e.detail.value!)}
                  disabled={status === "isReceiver"}
                />
              </IonItem>
              <IonItem className="mb-2 rounded-md">
                <IonTextarea
                  placeholder="Alamat Lengkap:"
                  required
                  value={receiverAddress}
                  onIonChange={(e) => setReceiverAddress(e.detail.value!)}
                  disabled={status === "isReceiver"}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Kelurahan:</IonLabel>
                <IonSelect
                  value={receiverKel}
                  okText="OK"
                  cancelText="Batal"
                  onIonChange={(e) => setReceiverArea(e.detail.value)}
                  disabled={status === "isReceiver"}
                >
                  {wilayah.map((kel) => (
                    <IonSelectOption key={kel.id} value={kel.name}>
                      {kel.name}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Nomor WA:</IonLabel>
                <IonInput
                  required
                  type="text"
                  inputMode="numeric"
                  value={receiverWa}
                  onIonChange={(e) => setReceiverWa(e.detail.value!)}
                  disabled={status === "isReceiver"}
                />
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>
        {/* )} */}
        <IonCard className="w-full md:w-1/4">
          <IonCardHeader color="light">
            <IonCardTitle>Barang</IonCardTitle>
          </IonCardHeader>
          <IonCardContent className="pb-8">
            <IonItem>
              <IonLabel position="floating">Nama Barang:</IonLabel>
              <IonInput
                type="text"
                required
                value={item}
                onIonChange={(e) => setItem(e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Harga Barang:</IonLabel>
              <IonInput
                inputMode="numeric"
                disabled={payment == "transfer" ? true : false}
                value={itemPrice}
                type="number"
                onIonChange={(e) => setItemPrice(parseInt(e.detail.value!))}
              />
            </IonItem>
            <IonRadioGroup
              value={payment}
              onIonChange={(e) => setPayment(e.detail.value)}
            >
              <IonListHeader className="mt-4">
                <IonLabel>Metode Bayar:</IonLabel>
              </IonListHeader>
              <IonItem>
                <IonLabel>Transfer</IonLabel>
                <IonRadio slot="start" value="transfer" />
              </IonItem>
              <IonItem>
                <IonLabel>COD</IonLabel>
                <IonRadio slot="start" value="cod" />
              </IonItem>
            </IonRadioGroup>
          </IonCardContent>
        </IonCard>
        <IonCard className="w-full md:w-1/2">
          <IonCardHeader color="light">
            <IonCardTitle>Paket</IonCardTitle>
          </IonCardHeader>
          <IonCardContent className="pb-8">
            <IonRadioGroup
              value={payor}
              onIonChange={(e) => setPayor(e.detail.value)}
            >
              <IonListHeader className="mt-4">
                <IonLabel>Ongkir dibayar oleh:</IonLabel>
              </IonListHeader>
              <div className="grid md:grid-cols-2">
                <IonItem>
                  <IonLabel>Pengirim</IonLabel>
                  <IonRadio slot="start" value="sender" />
                </IonItem>
                <IonItem>
                  <IonLabel>Penerima</IonLabel>
                  <IonRadio slot="start" value="receiver" />
                </IonItem>
              </div>
            </IonRadioGroup>
            <IonRadioGroup
              value={paket}
              onIonChange={(e) => setPaket(e.detail.value)}
            >
              <IonListHeader className="mt-4">
                <IonLabel>Pilihan Paket:</IonLabel>
              </IonListHeader>
              <div className="grid md:grid-cols-2 lg:grid-cols-3">
                <IonItem>
                  <IonLabel>Hemat</IonLabel>
                  <IonRadio slot="start" value="hemat" disabled={banHemat} />
                </IonItem>
                <IonItem>
                  <IonLabel>Reguler</IonLabel>
                  <IonRadio slot="start" value="reguler" />
                </IonItem>
                <IonItem>
                  <IonLabel>Express</IonLabel>
                  <IonRadio slot="start" value="express" />
                </IonItem>
              </div>
            </IonRadioGroup>
            <IonItem className="mb-2 rounded-md">
              <IonTextarea
                placeholder="Catatan khusus:"
                value={note}
                onIonChange={(e) => setNote(e.detail.value!)}
              />
            </IonItem>
          </IonCardContent>
        </IonCard>
        <div>
          <IonList>
            <IonItem>
              <IonText className="text-sm">
                Tidak terdapat material berbahaya dan ilegal seperti bahan mudah
                terbakar, meledak, narkoba dan sejenisnya.
              </IonText>
              <IonCheckbox
                slot="start"
                checked={isLegal}
                onIonChange={(e) => setIsLegal(e.detail.checked)}
              />
            </IonItem>
            <IonItem lines="none">
              <IonText className="text-sm">
                Panjang, lebar, tinggi dan diameter tidak melebihi 2 meter dan
                berat tidak melebihi 10 Kg.
              </IonText>
              <IonCheckbox
                slot="start"
                checked={isSizeOK}
                onIonChange={(e) => setIsSizeOK(e.detail.checked)}
              />
            </IonItem>
          </IonList>
          <div className="ml-2 my-4 flex flex-col">
            <div>
              <IonButton
                type="submit"
                color="success"
                disabled={!isLegal || !isSizeOK}
              >
                Order Kurir
              </IonButton>
            </div>
            <div>
              <IonButton type="reset" size="small" color="light">
                Reset
              </IonButton>
              <IonButton
                size="small"
                color="danger"
                onClick={() => history.goBack()}
              >
                Batal
              </IonButton>
            </div>
          </div>
        </div>
      </form>
    </IonContent>
  );
}
