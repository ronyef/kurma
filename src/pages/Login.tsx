import { useState } from "react";
import { Link } from "react-router-dom";

import {
  IonPage,
  IonContent,
  IonItem,
  IonInput,
  IonLabel,
  IonButton,
  IonImg,
  IonLoading,
  IonToast,
} from "@ionic/react";
import { useLogin } from "../hooks/useLogin";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [text, setText] = useState("");
  const [number, setNumber] = useState(0);
  const { loading, error, login } = useLogin();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <IonPage>
      <IonContent>
        <IonLoading isOpen={loading} message={"Sedang masuk..."} />
        <IonToast isOpen={error != null} message={error!} duration={3000} />
        <div className="bg-yellow-600 h-screen grid content-center justify-items-center p-4">
          <IonImg src="assets/img/handover.png" className="h-80 w-80" />
          <div>
            <form onSubmit={handleSubmit}>
              <IonItem className="mb-2 rounded-md">
                <IonLabel>Email:</IonLabel>
                <IonInput
                  color="primary"
                  type="text"
                  inputMode="email"
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value!)}
                  required
                />
              </IonItem>
              <IonItem className="mb-4 rounded-md">
                <IonLabel>Password:</IonLabel>
                <IonInput
                  color="primary"
                  type="password"
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value!)}
                  required
                />
              </IonItem>
              <IonButton color="dark" size="large" expand="block" type="submit">
                Login
              </IonButton>
            </form>
            <div className="flex content-between mt-4 xs:flex-wrap">
              <p className="text-gray-100 flex-1 text-sm">Lupa password?</p>
              <Link to="/register" className="text-gray-100 flex-0 text-sm">
                Register
              </Link>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
