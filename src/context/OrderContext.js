import { createContext, useReducer, useEffect } from "react";

export const OrderContext = createContext();

export const orderReducer = (state, action) => {
    switch (action.type){
        case 'ADD_ORDER':
            return { ...state, orders: action.payload }
        case 'REMOVE_ORDER':
            return { ...state, orders: action.payload }
        default:
            return state
    }
}

export const OrderContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(orderReducer, {
        orders: []
    })

    useEffect(() => {
        let ordersFromStorage = localStorage.getItem('orders')

        if (!ordersFromStorage) {
            localStorage.setItem('orders', JSON.stringify([]))
            ordersFromStorage = localStorage.getItem('orders')
        }

        dispatch({ type: 'ADD_ORDER', payload: JSON.parse(ordersFromStorage) })
    }, [])


    return (
        <OrderContext.Provider value={{ ...state, dispatch }}>
            {children}
        </OrderContext.Provider>
    )
}