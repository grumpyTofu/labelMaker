import { INSERT_CONTENT, UPDATE_CONTENT, DELETE_CONTENT } from "./actionTypes";
import { LOCK_TEMPLATE, UNLOCK_TEMPLATE } from "./actionTypes";

let nextContentId = 0;

export const insertContent = content => ({ 
    type: INSERT_CONTENT, 
    payload: { 
        id: ++nextContentId, 
        type: content.type,
        value: content.value
    } 
});

export const updateContent = content => ({ 
    type: UPDATE_CONTENT, 
    payload: { id:content.id, value: content.value } 
});

export const deleteContent = id => ({ type: DELETE_CONTENT, payload: { id } });

export const lockTemplate = () => ({ type: LOCK_TEMPLATE });
export const unlockTemplate = () => ({ type: UNLOCK_TEMPLATE });

