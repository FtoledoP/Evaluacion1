import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, getAuth, onAuthStateChanged, updatePassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Firestore, collection, addDoc, query, where, getDocs, setDoc, doc, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: Firestore,
              private auth: Auth,
              private router: Router) {

  }


  register(email:any, password:any){
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  async createUser(data:any){
    const usersRef = collection(this.firestore, 'users');
    return await setDoc(doc(usersRef, data.correo), {
            nombre: data.nombre,
            apellido: data.apellido,
            correo: data.correo,
            rut: data.rut,
            carrera: data.carrera,
            password: data.password});
  }

}
