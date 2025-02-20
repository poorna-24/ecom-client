import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
//initial state
const initialState = {
  products: [],
  product: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDelete: false,
};

//create product action
export const createProductAction = createAsyncThunk("product/create", async (payload, { rejectWithValue, getState, dispatch }) => {
  // console.log(payload);
  try {
    const { name, description, category, sizes, brand, colors, price, totalQty, files } = payload;
    //make request
    //token-authenticated
    const token = getState()?.users?.userAuth?.userInfo?.token;
    const config = {
      headers: {
        Authorization: `chandu ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    //images
    //FormData
    const formData = new FormData();
    formData.append("name", name);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("brand", brand);
    formData.append("price", price);
    formData.append("totalQty", totalQty);

    sizes.forEach((size) => {
      formData.append("sizes", size);
    });
    colors.forEach((color) => {
      formData.append("colors", color);
    });

    files.forEach((file) => {
      formData.append("files", file);
    });
    const { data } = await axios.post(
      `${baseURL}/products`,
      // {
      //   name,
      //   description,
      //   category,
      //   sizes,
      //   brand,
      //   colors,
      //   price,
      // },
      formData,
      config
    );

    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data);
  }
});

//slice
const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    //create
    builder.addCase(createProductAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.isAdded = true;
    });
    builder.addCase(createProductAction.rejected, (state, action) => {
      state.loading = false;
      state.product = null;
      state.isAdded = false;
      state.error = action.payload;
    });
  },
});

//generate the reducer
const productReducer = productSlice.reducer;
export default productReducer;
