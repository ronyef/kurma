import { useHistory } from "react-router"
import ShortUniqueId from 'short-unique-id';
import { useOrderContext } from "./useOrderContext"
import { hemat, reguler, express } from '../data/tarif'

export const useOrder = () => {
    const { orders, dispatch } = useOrderContext()
    const history = useHistory()

    const placeOrder = (newOrder) => {
        const uid = new ShortUniqueId({ length: 4 })
        console.log('Unique ID:', uid())
        orders.push({...newOrder, id:uid(), ongkir: getShippingCost(newOrder)})
        dispatch({type: 'ADD_ORDER', payload: orders})
        localStorage.setItem('orders', JSON.stringify(orders))
        history.goBack()
    }

    const getShippingCost = (order) => {
        switch (order.paket) {
            case 'hemat':
                return hemat[order.senderZone][order.receiverZone] * 1000
            case 'reguler':
                return reguler[order.senderZone][order.receiverZone] * 1000
            case 'express':
                return express[order.senderZone][order.receiverZone] * 1000
            default:
                return reguler[order.senderZone][order.receiverZone] * 1000
        }
    }

    const removeOrder = () => {

    }

    return { placeOrder, removeOrder }
}
