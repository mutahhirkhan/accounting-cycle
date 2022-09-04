import { useReducer, useEffect, useState } from "react"
import { projectFirestore, timestamp } from "../firebase/config"



export const useFirestore = (collection) => {

  // collection collectionRef
  const collectionRef = projectFirestore.collection(collection)

   

  
  // add a document
  const addDocument = async (doc) => {
    // console.log("collection"+doc)
    try {
      const createdAt = timestamp.fromDate(new Date())
      const addedDocument = await collectionRef.add({ ...doc, createdAt })
      // console.log("col"+addedDocument)
    }
    catch (error) {
      console.log(error);
    }
  }


  // delete a document
  const deleteDocument = async (id) => {

    try {
      await collectionRef.doc(id).delete()
    }
    catch (error) {
      console.log(error)
    }
  }

  // update a document
  const updateDocument = async (id, updates) => {

    try {
      const updatedDocument = await collectionRef.doc(id).update(updates)
      return updatedDocument
    } 
    catch (error) {
      console.log(error)
      // return null;
    }
  }

  return { addDocument, deleteDocument, updateDocument, }

}
