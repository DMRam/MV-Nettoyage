import {configureStore } from '@reduxjs/toolkit'
import sliceMenu from './switcher-slice'

const store = configureStore({
    reducer: {
        ui: sliceMenu
    }
})
export default store

// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Infer type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch