import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";

const collectionName = `users_${process.env.REACT_APP_PROJECT_NAME}`;

// Função para buscar todos os documentos da coleção
export const fetchItems = async () => {
  const querySnapshot = await getDocs(collection(db, collectionName));

  // Mapeia os documentos e remove a chave 'password' de cada usuário
  return querySnapshot.docs.map((doc) => {
    const userData = { id: doc.id, ...doc.data() };
    delete userData.password; // Remove a chave 'password'
    return userData;
  });
};

// Função para adicionar um novo usuário
export const addUser = async (newUser) => {
  await addDoc(collection(db, collectionName), newUser);
};

// Função para verificar se um usuário com o email e senha especificados já existe
export const handleLogin = async (email, password) => {
  const q = query(
    collection(db, collectionName),
    where("userEmail", "==", email),
    where("password", "==", password)
  );
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    const user = { id: userDoc.id, ...userData };
    setUserSession(user);
    return user;
  }

  return null; // Retorna null se o email não existir
};

// Função para checar se um email já existe
export const emailExists = async (email) => {
  const q = query(
    collection(db, collectionName),
    where("userEmail", "==", email)
  );
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty; // Retorna true se o e-mail já estiver registrado
};

// Função para verificar se um documento (CPF) já existe
export const documentExists = async (document) => {
  const q = query(
    collection(db, collectionName),
    where("document", "==", document)
  );
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty; // Retorna true se o CPF já estiver registrado
};

// Função para remover um usuário pelo CPF
export const removeUserByCpf = async (cpf) => {
  const q = query(collection(db, collectionName), where("document", "==", cpf));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    // Se encontrar o usuário com o CPF
    const userDoc = querySnapshot.docs[0];
    await deleteDoc(doc(db, collectionName, userDoc.id)); // Remove o documento
    return true; // Retorna true se a remoção for bem-sucedida
  }

  return false; // Retorna false se o CPF não for encontrado
};

// Função para remover um usuário pelo e-mail
export const removeUserByEmail = async (email) => {
  const q = query(
    collection(db, collectionName),
    where("userEmail", "==", email)
  );
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    // Se encontrar o usuário com o e-mail
    const userDoc = querySnapshot.docs[0];
    await deleteDoc(doc(db, collectionName, userDoc.id)); // Remove o documento
    return true; // Retorna true se a remoção for bem-sucedida
  }

  return false; // Retorna false se o e-mail não for encontrado
};

// Função para buscar um usuário pelo e-mail ou CPF
export const fetchUserByEmailOrCpf = async (searchValue) => {
  // Primeiro, verifica se o searchValue é um email ou CPF, usando a verificação de formato
  let querySnapshot;
  if (searchValue.includes("@")) {
    // Caso seja um e-mail
    querySnapshot = await getDocs(
      query(
        collection(db, collectionName),
        where("userEmail", "==", searchValue)
      )
    );
  } else {
    // Caso seja um CPF (supondo que CPF seja um número ou string sem caracteres especiais)
    querySnapshot = await getDocs(
      query(
        collection(db, collectionName),
        where("document", "==", searchValue)
      )
    );
  }

  // Se encontrar o usuário, retorna os dados
  if (!querySnapshot.empty) {
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();

    // Remove o campo 'password' do objeto de dados do usuário
    delete userData.password;
    return { id: userDoc.id, ...userData }; // Retorna o usuário encontrado
  }

  // Se não encontrar nenhum usuário, retorna null
  return null;
};

// Função para configurar a sessão do usuário
const setUserSession = (user) => {
  sessionStorage.setItem("userName", user.userName);
  sessionStorage.setItem("userEmail", user.userEmail);
  sessionStorage.setItem("userId", user.id);
  sessionStorage.setItem("role", user.role);
};

// Função para atualizar um usuário pelo ID
export const updateUser = async (userId, updatedData) => {
    // Referência ao documento do usuário pelo ID
    const userDocRef = doc(db, collectionName, userId);
    // Atualizando os dados no Firestore
    await updateDoc(userDocRef, updatedData);
    return true; // Retorna true se a atualização for bem-sucedida
};