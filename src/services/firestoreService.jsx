import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

const collectionName = `users_${process.env.REACT_APP_PROJECT_NAME}`;
// Função para buscar todos os documentos da coleção
export const fetchItems = async () => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Função para adicionar um novo
export const addUser = async (newUser) => {
  await addDoc(collection(db, collectionName), newUser);
};

// Função para verificar se um usuário com o email e senha especificados já existe
export const userExists = async (email, password) => {
  const q = query(
    collection(db, collectionName),
    where("userEmail", "==", email),
    where("password", "==", password)
  );
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    // Obtenha o primeiro documento encontrado
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();

    // Adicione o ID ao objeto de dados do usuário
    const user = { id: userDoc.id, ...userData };
    setUserSession(user);
    return user; // Retorna um objeto com o ID e os dados do usuário
  }

  return null; // Retorna null se o email não existir
};

export const emailExists = async (email) => {
  const q = query(
    collection(db, collectionName),
    where("userEmail", "==", email)
  );
  const querySnapshot = await getDocs(q);

  // Retorna true se existir pelo menos um documento com o email fornecido
  return !querySnapshot.empty;
};

const setUserSession = (user) => {
  sessionStorage.setItem("userName", user.userName);
  sessionStorage.setItem("userEmail", user.userEmail);
  sessionStorage.setItem("userId", user.id);
  sessionStorage.setItem("role", user.role);
};
