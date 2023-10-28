import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, getAuth, onAuthStateChanged, updatePassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Firestore, collection, addDoc, query, where, getDocs, setDoc, doc, getDoc } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Storage, ref, uploadBytes } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public loggedIn = new BehaviorSubject<boolean>(false);
  userActivated:string = '';
  userEmail:any;
  currentUser:any;

  constructor(private firestore: Firestore,
              private auth: Auth,
              private router: Router,
              /*private storage: Storage*/) {
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
            password: data.password,
            region: data.region,
            comuna: data.comuna});
  }

  login(email:any, password:any){
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  async getUser(email:any){
    const usersRef = collection(this.firestore, 'users');
    const userQuery = query(usersRef, where('correo', '==', email));
    return await getDocs(userQuery);
  }

  logout(){
    this.auth.signOut();
    this.router.navigate(['/login']);
    this.userEmail = undefined;
    this.loggedIn.next(false);
  }

  isLogged(): boolean {
    return !!this.auth.currentUser;
  }

  /*
  subirSelfie(imagen:any){
    const storageRef = ref(this.storage, 'userImg/' + imagen.fname);
    return uploadBytes(storageRef, imagen.file);
  }
  */

}
