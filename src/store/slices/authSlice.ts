import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

type User = { id: string; name: string; role: string }

// Helper functions for localStorage
const saveUserToStorage = (user: User | null) => {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user))
  } else {
    localStorage.removeItem('user')
  }
}

const getUserFromStorage = (): User | null => {
  try {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  } catch {
    return null
  }
}

export const fetchCurrentUser = createAsyncThunk('auth/fetchCurrentUser', async () => {
  // Simulate API call; replace with RTK Query or real fetch
  return new Promise<User | null>((resolve) => {
    setTimeout(()=> {
      // toggle null vs a user to test auth
      resolve({ id: '1', name: 'Nguyen Nhan', role: 'admin' })
      // resolve(null)
    }, 500)
  })
})

const authSlice = createSlice({
  name: 'auth',
  initialState: { 
    user: getUserFromStorage(), 
    loading: false,
    initialized: false 
  },
  reducers: {
    logout(state) { 
      state.user = null
      saveUserToStorage(null)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.pending, (s)=> { 
      s.loading = true 
    })
    builder.addCase(fetchCurrentUser.fulfilled, (s, a: PayloadAction<User | null>)=> {
      s.loading = false
      s.user = a.payload
      s.initialized = true
      saveUserToStorage(a.payload)
    })
    builder.addCase(fetchCurrentUser.rejected, (s)=> { 
      s.loading = false
      s.user = null
      s.initialized = true
      saveUserToStorage(null)
    })
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
