import { IonContent, IonPage, IonButton, IonImg} from "@ionic/react";
import "./Home.css";
import "../img/kardus.jpg";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <div className="bg-yellow-600 h-screen flex flex-col">
          <div className="flex-grow grid content-center justify-items-center">
            <IonImg src="assets/img/kurir.png" className="h-80 w-80" />
            <h1 className="text-4xl text-gray-200 tracking-wide title">Kurir Madani</h1>
            <p className="text-yellow-300 tracking-widest">AMANAH & AFFORDABLE</p>
          </div>
          <div className="w-screen md:w-1/2 pb-4 px-2 self-center">
            <div className="flex-col">
              <div className="w-full mb-2">
                <IonButton
                  expand="block"
                  color="light"
                  fill="outline"
                  size="large"
                  routerLink="/login"
                >
                  Login
                </IonButton>
              </div>
              <div>
                <IonButton
                  expand="block"
                  color="light"
                  fill="outline"
                  size="large"
                  routerLink="/register"
                >
                  Register
                </IonButton>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
