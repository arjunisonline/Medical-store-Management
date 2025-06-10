import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  medicines: {},
};

const medicineSlice = createSlice({
  name: 'medicine',
  initialState,
  reducers: {
    setMedicines(state, action) {
      const { email, medicines } = action.payload;
      state.medicines = {
        ...state.medicines,
        [email]: medicines,
      };

      localStorage.setItem('medicines', JSON.stringify(state.medicines));
    },
    loadFromLocalStorage(state) {
      const stored = JSON.parse(localStorage.getItem('medicines')) || {};
      state.medicines = stored;
    },
  },
});

export const { setMedicines, loadFromLocalStorage } = medicineSlice.actions;
export default medicineSlice.reducer;
