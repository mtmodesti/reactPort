import { collection, getDocs, addDoc } from "firebase/firestore";

import { db } from "../config/firebaseConfig";

const collectionName = "users";

// Função para buscar todos os documentos da coleção
export const fetchItems = async () => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Função para adicionar um novo
export const addItem = async (newItem) => {
  console.log("teste");
  const teste = { name: "c", pass: "b" };
  await addDoc(collection(db, collectionName), teste);
};
