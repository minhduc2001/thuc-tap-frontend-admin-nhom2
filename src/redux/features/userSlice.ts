import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { ILogin } from '../../interfaces/auth.interface';
import { IUser } from '../../interfaces/user.interface';
import AuthApi from './../../api/authApi';
