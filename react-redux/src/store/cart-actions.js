import {uiActions} from "./ui-slice";
import {cartActions} from "./cart-slice";

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(
                'https://fancy-foodorder-default-rtdb.firebaseio.com/cart.json'
            )
            if (!response.ok){
                throw new Error('Could not fetch cart data!')
            }
            const responseData = await response.json()
            return responseData;
        }
        try {
            const cartData = await fetchData()
            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity
            }))
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Fetching cart data failed!'
            }))
        }
    }
}

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(
            uiActions.showNotification({
                status: 'pending',
                title: 'sending...',
                message: 'Sending cart data'
            })
        )

        const sendRequest = async () => {
            const response = await fetch('https://fancy-foodorder-default-rtdb.firebaseio.com/cart.json',
                {
                    method: 'PUT',
                    body: JSON.stringify({
                        items: cart.items,
                        totalQuantity: cart.totalQuantity,
                    })
                })
            if (!response.ok) {
                throw new Error('failed!')
            }
        }

        try {
            await sendRequest()
            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Send cart data successfully!'
            }))
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Sending cart data failed!'
            }))
        }

    }
}