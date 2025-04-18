// import { createSlice } from "@reduxjs/toolkit";

// const findIndex = (arr: Array<PrivateMessageItem>, item: PrivateMessageItem) => {
//   let low = 0;
//   let high = arr.length - 1;

//   const comparator = (a: PrivateMessageItem, b: PrivateMessageItem) => {
//     const date_a = new Date(a.timestamp);
//     const date_b = new Date(b.timestamp);
//     return date_a.getTime() - date_b.getTime();
//   }

//   while (low <= high) {
//     const mid = Math.floor((low + high) / 2);
//     if (comparator(arr[mid], item) <= 0) {
//       low = mid + 1;
//     } else {
//       high = mid - 1;
//     }
//   }

//   return low;
// }

// type ChatState = {
//   messages: Array<PrivateMessageItem>;
//   receiver: UserInfo;
// }

// const initialState: ChatState = {
//   messages: [],
//   receiver: {
//     name: "",
//     avatar: "",
//     phone: "",
//     email: "",
//     uuid: ""
//   }
// }

// export const chat_slice = createSlice({
//   name: "chat",
//   initialState,
//   reducers: {
//     setMessages: (state, action) => {
//       const { messages: new_msgs } = action.payload;
//       const index = findIndex(state.messages, new_msgs[0]);
//       state.messages.splice(index, 0, ...new_msgs);
//     },
//     pushHistory: (state, action) => {
//       const { messages } = action.payload;
//       state.messages.push(...messages);
//     },
//     addMessage: (state, action) => {
//       const { message } = action.payload;
//       state.messages.unshift(message);
//     },
//     setReceiver: (state, action) => {
//       state.receiver = action.payload;
//     },
//     clearChat: (state) => {
//       state.messages = [];
//       state.receiver = {
//         name: "",
//         avatar: "",
//         phone: "",
//         email: "",
//         uuid: ""
//       }
//     }
//   }
// })

// export const { setMessages, addMessage, pushHistory, setReceiver, clearChat } = chat_slice.actions
