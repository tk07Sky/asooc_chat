import { firebaseMutations, firebaseAction } from 'vuexfire'
import firestore from '~/plugins/firestore'
const chatsRef = firestore.collection('chats')

export const state = () => ({
  chats: []
})

export const getters = {
  getChats: state => state.chats
}

export const mutations = {
  ...firebaseMutations
}

export const actions = {
  // INIT_CHAT({ dispatch }) {
  //   chatsRef.orderBy('time').onSnapshot(querySnapshot => {
  //     let docs = []
  //     querySnapshot.forEach(doc => docs.push(doc.data()))
  //     // console.log(docs)
  //     dispatch('SET_CHAT', docs)
  //   })
  // },

  // SET_CHAT: firebaseAction(({ bindFirebaseRef }, ref) => {
  //   console.log('firebaseActions', ref)
  //   bindFirebaseRef('chats', ref)
  // }),

  INIT_CHAT: firebaseAction(({ bindFirebaseRef }) => {
    bindFirebaseRef('chats', chatsRef.orderBy('time'))
  }),

  ADD_MESSAGE: firebaseAction((context, data) => {
    chatsRef.add({
      uid: data.uid,
      user_name: data.userName,
      content: data.content,
      time: Date.now()
    })
  })
}
