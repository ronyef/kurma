import { useState } from "react";
import { Link } from "react-router-dom";
import zona from "../data/kelurahan.json";
import {
  IonPage,
  IonContent,
  IonItem,
  IonInput,
  IonLabel,
  IonButton,
  IonList,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonLoading,
  IonToast
} from "@ionic/react";

import { useSignup } from "../hooks/useSignup";

export default function Register() {
  const [displayName, setDisplayName] = useState("");
  const [address, setAddress] = useState("");
  const [kelurahan, setKelurahan] = useState("Kr Joang KM >21");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [zone, setZone] = useState(15)
  const { loading, error, signup } = useSignup();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    signup(email, password, displayName, phone, address, kelurahan, zone);
  };

  const setArea = (kel: string) => {
    const result = zona.filter((ke) => ke.name === kel);
    setKelurahan(kel);
    setZone(result[0].zona);
    // console.log(kelurahan, zone);
  };

  return (
    <IonPage>
      <IonContent>
        <IonLoading
          isOpen={loading}
          message={'Mendaftar...'}
        />
        <IonToast
          isOpen={error != null}
          message={error!}
          duration={3000}
        />
        <div className="bg-yellow-600 h-screen grid content-center justify-items-center px-2">
          {/* <IonImg src="assets/img/handover.png" className="h-80 w-80" /> */}
          <div className="p-4">
            <h1 className="text-white text-4xl mb-2">Registrasi</h1>
            <p className="text-sm mb-2">
              Isi form di bawah ini dengan benar untuk memastikan keberhasilan
              pengiriman anda.
            </p>
            <form onSubmit={handleSubmit}>
              <IonList className="rounded-lg bg-transparent">
                <IonItem className="mb-2 rounded-md">
                  <IonLabel>Nama Lengkap:</IonLabel>
                  <IonInput
                    color="primary"
                    type="text"
                    inputMode="text"
                    required
                    value={displayName}
                    onIonChange={(e) => setDisplayName(e.detail.value!)}
                  />
                </IonItem>
                <IonItem className="mb-2 rounded-md">
                  <IonTextarea
                    color="primary"
                    placeholder="Alamat: jalan, gang, perumahan/blok"
                    onIonChange={(e) => setAddress(e.detail.value!)}
                    required
                    value={address}
                  />
                </IonItem>
                <IonItem className="col-span-2 mb-2 rounded-md">
                  <IonLabel position="floating">Kelurahan:</IonLabel>
                  <IonSelect
                    value={kelurahan}
                    okText="OK"
                    cancelText="Batal"
                    onIonChange={(e) => setArea(e.detail.value)}
                  >
                    {zona.map((kel) => (
                      <IonSelectOption key={kel.id} value={kel.name}>
                        {kel.name}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
                <IonItem className="mb-2 rounded-md">
                  <IonLabel>Nomor HP/WA:</IonLabel>
                  <IonInput
                    color="primary"
                    type="text"
                    inputMode="numeric"
                    value={phone}
                    required
                    onIonChange={(e) => setPhone(e.detail.value!)}
                  />
                </IonItem>
                <IonItem className="mb-2 rounded-md">
                  <IonLabel>Email:</IonLabel>
                  <IonInput
                    color="primary"
                    type="text"
                    inputMode="email"
                    required
                    onIonChange={(e) => setEmail(e.detail.value!)}
                  />
                </IonItem>
                <IonItem className="mb-2 rounded-md">
                  <IonLabel>Password:</IonLabel>
                  <IonInput
                    color="primary"
                    type="password"
                    required
                    onIonChange={(e) => setPassword(e.detail.value!)}
                  />
                </IonItem>
              </IonList>
              {!loading &&
                <IonButton type="submit" color="dark" size="large" expand="block">
                  Register
                </IonButton>
              }
              {loading &&
                <IonButton type="submit" disabled color="dark" size="large" expand="block">
                  Mendaftar...
                </IonButton>
              }
            </form>
            <div className="flex content-between mt-4 xs:flex-wrap">
              <p className="text-gray-100 flex-1 text-sm">Lupa password?</p>
              <Link to="/login" className="text-gray-100 flex-0 text-sm">
                Sudah punya account?
              </Link>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
