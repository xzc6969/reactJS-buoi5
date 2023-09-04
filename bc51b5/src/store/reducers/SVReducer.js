import data from "../../data/danhSachSV.json";
import { ADD_SV, DELETE_SV, SELECTED_SV, UPDATE_SV } from "../types/userType";

const DEFAULT_STATE = {
    listSV: data,
    selectedSV:null,
};
  const stringify = localStorage.getItem("LIST_SV");
  if(stringify){
    DEFAULT_STATE.listSV=JSON.parse(stringify);
  }

export const SVReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ADD_SV:{
      state.listSV=[...state.listSV,action.payload];
      localStorage.setItem("LIST_SV", JSON.stringify(state.listSV));
      break;
    }
    case SELECTED_SV:{
      state.selectedSV = action.payload;
      break;
    }
    case UPDATE_SV:{
      const data = [...state.listSV];
      const idx = data.findIndex((element)=>element.id===action.payload.id);
      data[idx]=action.payload;
      state.selectedSV=null;
      state.listSV=data;
      localStorage.setItem("LIST_SV", JSON.stringify(state.listSV));
      break;
    }
    case DELETE_SV:{
      const data = [...state.listSV];
      const idx = data.findIndex((element)=>element.id===action.payload.id);
      data.splice(idx,1);
      state.listSV=data;
      localStorage.setItem("LIST_SV", JSON.stringify(state.listSV));
      break;
    }
  }
  return {...state};
};
