import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { NavBar } from './Components/NavBar/NavBar';
import { Menu } from './Components/Menu/Menu';
import { GlobalStyle } from './Components/Style/GlobalStyle';
import { ModalItem } from './Components/Modal/ModalItem';
import { Order } from './Components/Order/Order';
import { useOpenItem } from './Components/Hooks/useOpenItem';
import { useOrders } from './Components/Hooks/useOrders';
import { useAuth } from './Components/Hooks/useAuth';

const firebaseConfig = {
  apiKey: "AIzaSyBgfuz-xMMJK729LADZh_r7lnOfcdg3OnI",
  authDomain: "mrdonalsd.firebaseapp.com",
  databaseURL: "https://mrdonalsd-default-rtdb.firebaseio.com",
  projectId: "mrdonalsd",
  storageBucket: "mrdonalsd.appspot.com",
  messagingSenderId: "451805945614",
  appId: "1:451805945614:web:a9d4b130d90d2358b7415f"
};

firebase.initializeApp(firebaseConfig);

function App() {
  
  const auth = useAuth(firebase.auth);
  const openItem = useOpenItem();
  const orders = useOrders();

  return (
    <>
      <GlobalStyle/>
      <NavBar {...auth}/>
      <Order 
        {...orders}
        {...auth}
        firebaseDatabase={firebase.database}/>
      <Menu {...openItem}/>
      { openItem.openItem && <ModalItem {...openItem} {...orders}/>}
    </>
  );
}

export default App;
