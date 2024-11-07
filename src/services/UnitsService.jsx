import {
  collection,
  addDoc,
  doc,
  updateDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";

const collectionName = `units_${process.env.REACT_APP_PROJECT_NAME}`;

// Função para adicionar uma nova unidade
export const addUnit = async (unitData) => {
  const newData = { ...unitData, active: true };
  const docRef = await addDoc(collection(db, collectionName), newData);
  return docRef.id; // Retorna o ID do documento adicionado
};

// Função para desativar/ativar uma unidade (atualiza o campo "active")
export const toggleUnityActivity = async (id, isActive) => {
  try {
    const unitDocRef = doc(db, collectionName, id); // Referência ao documento da unidade
    await updateDoc(unitDocRef, { active: isActive }); // Atualiza o campo "active" para true ou false
    return true; // Retorna verdadeiro se a atualização for bem-sucedida
  } catch (error) {
    console.error("Erro ao atualizar a unidade:", error);
    return false; // Retorna falso em caso de erro
  }
};

// Função para buscar todos os documentos da coleção
export const fetchItems = async () => {
  const querySnapshot = await getDocs(collection(db, collectionName));

  // Mapeia os documentos e remove a chave 'password' de cada unidade, se houver
  return querySnapshot.docs.map((doc) => {
    const unitData = { id: doc.id, ...doc.data() };
    delete unitData.password; // Remove a chave 'password', se necessário
    return unitData;
  });
};

// Função para buscar uma unidade específica pelo ID
export const getUnitById = async (id) => {
  try {
    const unitDocRef = doc(db, collectionName, id); // Referência ao documento pelo ID
    const unitSnapshot = await getDoc(unitDocRef); // Busca o documento

    if (unitSnapshot.exists()) {
      return { id: unitSnapshot.id, ...unitSnapshot.data() }; // Retorna os dados da unidade
    } else {
      return null; // Retorna null se a unidade não existir
    }
  } catch (error) {
    return null; // Retorna null em caso de erro
  }
};

// Função para atualizar uma unidade pelo ID fornecido
export const updateUnitById = async (id, updatedData) => {
  const unitDocRef = doc(db, collectionName, id); // Referência ao documento da unidade
  await updateDoc(unitDocRef, updatedData); // Atualiza os campos especificados no documento
  return true; // Retorna verdadeiro se a atualização for bem-sucedida
};
