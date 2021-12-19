import React from 'react'
import { IonPage, IonContent, IonButton } from '@ionic/react'
import { useLogout } from '../hooks/useLogout'

export default function Account() {
    const { logout } = useLogout()

    const handleLogout = () => {
        logout()
    }

    return (
        <IonPage>
            <IonContent>
                <IonButton onClick={handleLogout}>
                    Logout
                </IonButton>
            </IonContent>
            
        </IonPage>
    )
}
