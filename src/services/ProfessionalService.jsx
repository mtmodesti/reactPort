import {
  collection,
  getDocs,
  addDoc,
  getDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";

const professionalFunctions = `professionalFunctions_${process.env.REACT_APP_PROJECT_NAME}`;
const professionals = `professionals_${process.env.REACT_APP_PROJECT_NAME}`;
const users = `users_${process.env.REACT_APP_PROJECT_NAME}`;

// Função para buscar todos os documentos da coleção de funções
export const getProfessionalsFunctions = async () => {
  const querySnapshot = await getDocs(collection(db, professionalFunctions));

  // Mapeia os documentos e remove a chave 'password' de cada unidade, se houver
  return querySnapshot.docs.map((doc) => {
    const unitData = { id: doc.id, ...doc.data() };
    delete unitData.password; // Remove a chave 'password', se necessário
    return unitData;
  });
};

// Função para buscar todos os documentos da coleção de professionais
export const getProfessionals = async () => {
  const querySnapshot = await getDocs(collection(db, users));

  // Mapeia os documentos e remove a chave 'password' de cada unidade, se houver
  return querySnapshot.docs.map((doc) => {
    const unitData = { id: doc.id, ...doc.data() };
    delete unitData.password; // Remove a chave 'password', se necessário,
    return unitData;
  });
};

// Função para adicionar uma nova unidade
export const addProfessional = async (unitData) => {
  const newData = { ...unitData, active: true };
  const docRef = await addDoc(collection(db, users), newData);
  return docRef.id; // Retorna o ID do documento adicionado
};

// Função para atualizar o status (campo 'active') de um profissional específico
export const updateProfessionalStatus = async (id, isActive) => {
  try {
    // Referência ao documento com o ID fornecido
    const docRef = doc(db, users, id);

    // Atualiza o campo 'active' com o valor do parâmetro isActive
    await updateDoc(docRef, { active: isActive });
  } catch (error) {
    console.error("Erro ao atualizar o status do profissional:", error);
    throw new Error("Falha ao atualizar o status do profissional.");
  }
};

// Função para buscar um profissional específico pelo ID
export const getProfessionalById = async (id) => {
  try {
    // Referência ao documento com o ID fornecido
    const docRef = doc(db, users, id);

    // Busca o documento pelo ID
    const docSnapshot = await getDoc(docRef);

    // Verifica se o documento existe e retorna seus dados
    if (docSnapshot.exists()) {
      return { id: docSnapshot.id, ...docSnapshot.data() };
    } else {
      return null; // Retorna null se o documento não existir
    }
  } catch (error) {
    console.error("Erro ao buscar o profissional pelo ID:", error);
    throw new Error("Falha ao buscar o profissional.");
  }
};

// Função para atualizar uma unidade pelo ID fornecido
export const updateProfessionalById = async (id, updatedData) => {
  try {
    const unitDocRef = doc(db, professionals, id); // Referência ao documento da unidade
    await updateDoc(unitDocRef, updatedData); // Atualiza os campos especificados no documento
    return true; // Retorna verdadeiro se a atualização for bem-sucedida
  } catch (error) {
    console.error("Erro ao atualizar o profissional pelo ID:", error);
    throw new Error("Falha ao atualizar o profissional.");
  }
};
