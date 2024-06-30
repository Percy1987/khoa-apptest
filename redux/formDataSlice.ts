// redux/formSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToolLanguage {
  id: number;
  tool: string;
  from: string;
  to: string;
  description: string;
  imageUrls: string[];
}

interface Position {
  [x: string]: any;
  id: number;
  value: string;
  positionResourceId: number;
  toolLanguages: ToolLanguage[];
}

interface FormData {
  id: number;
  name: string;
  positions: Position[];
}

interface FormState {
  data: FormData | null;
}

const initialState: FormState = {
  data: null,
};

const formSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    saveFormData: (state, action: PayloadAction<FormData>) => {
      state.data = action.payload;
    },
  },
});

export const { saveFormData } = formSlice.actions;

export const selectFormData = (state: { formData: FormState }) => state.formData;


export default formSlice.reducer;
