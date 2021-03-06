import {useState, useEffect, useContext, createContext} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocal } from './hooks/useLocal';
import { useDispatch } from 'react-redux';
import { authorize } from './Redux/userSlice';
import jwtDecode from 'jwt-decode';


const AppContext = createContext()

export const decodToken = (token)=>{
    try{
        const decoded = jwtDecode(token)
        return decoded
    }catch(err){
        return null
    }
}

export const api = "https://photocorner33.herokuapp.com"

export const useAppContext = () => useContext(AppContext)

export function AppProvider({children}) {
    const [dark, setDark] = useState(false);
    const [isWantToPost, setIsWantToPost] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const dispatch = useDispatch()

    const saveTheme = async() => {
        if (dark) {
           await AsyncStorage.setItem('theme', 'dark')
        } else {
           await AsyncStorage.setItem('theme', 'light')
        }
    }

    const getSavedTheme = async() => {
        const theme = await AsyncStorage.getItem('theme')
        if (theme === 'dark') {
            setDark(true)
        } else {
            setDark(false)
        }
    }


    const getSavedToken = async() => {
        const token = await AsyncStorage.getItem('token')
        if (token) {
            try {
                const decoded = decodToken(token)
                dispatch(authorize({decoded: decoded.needed, token}))
                setIsLoggedIn(true)
            } catch (error) {
                console.log(error)
            
            }
        }
        setIsReady(true)
    }

    useEffect(() => {
        getSavedTheme()
        getSavedToken()
    },[])

    useEffect(() => {
        saveTheme()
    }, [dark])
   
    return(
        <AppContext.Provider value={{dark, setDark, isWantToPost, isLoggedIn, setIsWantToPost}}>
            {isReady&&children}
        </AppContext.Provider>
    )
}