import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [
    {
      id: 1,
      img: "https://www.rappler.com/tachyon/2019/09/Screen-Shot-2022-05-17-at-4.42.48-PM.png",
      title: "Red Tea",
      count: 0,
      quantity: 0,
      price: 20,
    },
    {
      id: 2,
      img: "https://www.archanaskitchen.com/images/archanaskitchen/beverages/Green_tea_recipe.jpg",
      title: "Green Tea",
      count: 0,
      quantity: 0,
      price: 20,
    },
    {
      id: 3,
      img: "https://keeprecipes.com/sites/keeprecipes/files/126864_1500356770_0.jpg",
      title: "Vanilla Tea",
      count: 0,
      quantity: 0,
      price: 20,
    },
    {
      id: 4,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTds_Kftop-_5X3iI8J_aawSLCxIIstXsfHYg&usqp=CAU",
      title: "Cinnaman Ginger",
      count: 0,
      quantity: 0,
      price: 20,
    },
    {
      id: 5,
      img: "https://www.feastingathome.com/wp-content/uploads/2015/12/A-long-winters-Nap-107.jpg",
      title: "Anise",
      count: 0,
      quantity: 0,
      price: 20,
    },
    {
      id: 6,
      img: "https://parade.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTkwNTgxMjU0MTEyMzU1NDUz/hibiscus-tea-benefits-jpg.jpg",
      title: "Hibiscus",
      count: 0,
      quantity: 0,
      price: 20,
    },
    {
      id: 7,
      img: "https://www.nescafe.com/mena/sites/default/files/NESCAFE_RAMADAN_RECIPES_WESBITE%20PICTURES_NESCAFE_RAMADAN_RECIPES_WEBSITE_PICTURES_468X468_HONEYDATE%20%281%29.png",
      title: "Nescafe Gold",
      count: 0,
      quantity: 0,
      price: 30,
    },
    {
      id: 8,
      img: "https://expertreviews.b-cdn.net/sites/expertreviews/files/styles/er_main_wide/public/2020/01/untitled_design_61.png?itok=ZDh4pE3L",
      title: "Nespresso Capsules",
      count: 0,
      quantity: 0,
      price: 50,
    },
    {
      id: 9,
      img: "https://cdn.gourmetegypt.com/media/catalog/product/cache/2b4d21b90ad5abb98380bc0a709a4ac8/p/e/pear-imported_-fresh-source.jpg",
      title: "Bottle Of Water",
      count: 0,
      quantity: 0,
      price: 10,
    },
  ],
  cartProducts: [],
  totalPrice: 0,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      if (state.products[action.payload - 1].quantity == 0) {
        alert("Please select quantity !");
        return;
      }
      if (state.products[action.payload - 1].count == 0) {
        state.cartProducts.push(state.products[action.payload - 1]);
        let index = state.cartProducts.findIndex(
          (element) => element.id == action.payload
        );
        state.cartProducts[index].count++;
      } else {
        let index = state.cartProducts.findIndex(
          (element) => element.id == action.payload
        );
        if (
          state.products[action.payload - 1].quantity == 0 ||
          state.products[action.payload - 1].quantity == 1
        ) {
          state.cartProducts[index].quantity++;
        } else {
          state.cartProducts[index].quantity +=
            state.products[action.payload - 1].quantity;
        }
      }
      let total = 0;
      for (let i = 0; i < state.cartProducts.length; i++) {
        total += state.cartProducts[i].quantity * state.cartProducts[i].price;
      }
      state.totalPrice = total;
      alert(`Added ${state.products[action.payload - 1].title} Successfully`);
    },
    increment: (state, action) => {
      state.products[action.payload - 1].quantity++;
    },
    decrement: (state, action) => {
      if (state.products[action.payload - 1].quantity > 0) {
        state.products[action.payload - 1].quantity--;
      }
    },
    incrementCart: (state, action) => {
      let index = state.cartProducts.findIndex(
        (element) => element.id == action.payload
      );
      state.cartProducts[index].quantity++;
      let total = 0;
      for (let i = 0; i < state.cartProducts.length; i++) {
        total += state.cartProducts[i].quantity * state.cartProducts[i].price;
      }
      state.totalPrice = total;
    },
    decrementCart: (state, action) => {
      let index = state.cartProducts.findIndex(
        (element) => element.id == action.payload
      );
      if (state.cartProducts[index].quantity > 1) {
        state.cartProducts[index].quantity--;
        let total = 0;
        for (let i = 0; i < state.cartProducts.length; i++) {
          total += state.cartProducts[i].quantity * state.cartProducts[i].price;
        }
        state.totalPrice = total;
      }
    },
    deleteProduct: (state, action) => {
      let products_to_remain = state.cartProducts.filter((product) => {
        return product.id !== action.payload;
      });
      state.cartProducts = products_to_remain;
      state.products[action.payload - 1].count = 0;
      let total = 0;
      for (let i = 0; i < state.cartProducts.length; i++) {
        total += state.cartProducts[i].quantity * state.cartProducts[i].price;
      }
      state.totalPrice = total;
    },
  },
});

export const {
  addProduct,
  increment,
  decrement,
  incrementCart,
  decrementCart,
  deleteProduct,
} = productsSlice.actions;
export default productsSlice.reducer;
