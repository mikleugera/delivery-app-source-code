import {Shops_API} from '../api/api'
import {Shopping_card_API} from '../api/api'

const SET_ITEM = 'SET_ITEM';
const ADD_TO_CART = 'ADD_TO_CART';
const ADD_QUANTITY = 'ADD_QUANTITY';
const SUB_QUANTITY = 'SUB_QUANTITY';
const FILTER_ITEMS = 'FILTER_ITEMS';
const REMOVE_ALL = 'REMOVE_ALL';
const REMOVE_ITEM = 'REMOVE_ITEM';

let initialState = {
    items: [],
    shopsItems: [],
    filterItems: [],
    addedItems: [],
    total: 0
}

export const shopsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ITEM:    
            return {
                ...state,
                items: action.item,
                shopsItems: [...new Set(action.item.map(item => item.shop))],   

        }
        case ADD_TO_CART: {
            let addedItem = Object.assign({}, state.items.find(item=> item.id === action.id))
            //check if the action id exists in the addedItems
            let existed_item = Object.assign({}, state.addedItems.find(item => action.id === item.id))

            if(Object.keys(existed_item).length !== 0) {
                existed_item.quantity += 1;
                return {
                    ...state,  
                    addedItems: state.addedItems.map(item => {
                        return {
                            ...item,
                            quantity: existed_item.quantity
                        }
                    }),           
                    total: state.total + addedItem.price 
                }
            } else {
                addedItem.quantity = 1;
                //calculating the total
                let newTotal = state.total + addedItem.price;                        
                return {
                    ...state,                                    
                    addedItems: [...state.addedItems, addedItem],
                    total : newTotal
                }
                    
            } 
        }             
        case ADD_QUANTITY: {
            let addedItem = Object.assign(state.addedItems.find(item=> item.id === action.id))
            addedItem.quantity += 1 
            let newTotal = state.total + addedItem.price
            return {
                ...state, 
                total: newTotal
            }
        }  
        case SUB_QUANTITY: {
            let addedItem = Object.assign(state.addedItems.find(item=> item.id === action.id)) 
            //if the qt == 0 then it should be removed
            if(addedItem.quantity === 1){
                let new_items = state.addedItems.filter(item=>item.id !== action.id)
                let newTotal = state.total - addedItem.price
                return{
                    ...state,
                    addedItems: new_items,
                    total: newTotal
                }
            } else {
                addedItem.quantity -= 1
                let newTotal = state.total - addedItem.price
                return {
                    ...state,
                    total: newTotal
                }
            }
        }    
        case FILTER_ITEMS: {
            let filter = state.items.filter(item => action.curcat === item.shop)
            return {
                ...state,
                filterItems: filter
            }
        }     
        case REMOVE_ITEM: {
            let itemToRemove= state.addedItems.find(item=> action.id === item.id)
            let new_items = state.addedItems.filter(item=> action.id !== item.id)
            
            let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        } 
        case REMOVE_ALL: {
            return {
                ...state,
                addedItems: [],
                total: 0
            }
        } 
        default:
            return state;    
    }
};

export const setItem = (item) => ({type: SET_ITEM, item});
export const addToCart = (id) => ({type: ADD_TO_CART, id})
export const addQuantity = (id) => ({type: ADD_QUANTITY, id})
export const subQuantity = (id) => ({type: SUB_QUANTITY, id})
export const filterItems = (curcat) => ({type: FILTER_ITEMS, curcat})
export const removeAll = () => ({type: REMOVE_ALL})
export const removeItem = (id) => ({type: REMOVE_ITEM, id})

export const getShopsThunk = () => async (dispatch) => {
    let response = await Shops_API.get();
    dispatch(setItem(response.data));
}  

export const addCartThunk = (id) => async (dispatch) => {
    dispatch(addToCart(id));
}

export const addQuantityThunk = (id) => async (dispatch) => {
    dispatch(addQuantity(id));
};

export const subQuantityThunk = (id) => async (dispatch) => {
    dispatch(subQuantity(id));
};

export const removeItemThunk = (id) => async (dispatch) => {
    dispatch(removeItem(id));
};

export const filterItemsThunk = (data) => async (dispatch) => {
    dispatch(filterItems(data));
};

export const sendDBThunk = (data) => async (dispatch) => {   
    await Shopping_card_API.post(data);
    dispatch(removeAll());
}
