import {IUser} from "../Types/UserType";
import axios from "axios";

// Para teste apenas.
const baseAddr = "http://localhost:5000";

// Registra um usuário.
export function registerUser(user: FormData) {
    return (
        axios.post(baseAddr + "/api/users", user)
            .then(res  => Promise.resolve(res.status))
            .catch(Promise.reject)
        );
}

// Loga um usuário.
export function loginUser(user: Partial<IUser>) {
    /*  const header = new Headers();
    header.set("Content-Type", "application/json");
    return (fetch(baseAddr + "/api/login", {
        body:  JSON.stringify(user),
        credentials: "include",
        method: "POST",
        headers: header
    })
    .then(res => Promise.resolve(res.status))
        .catch(console.log)); */
    return (
        axios.post(baseAddr + "/api/login", JSON.stringify(user), {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(res => {
            console.log("Here");
            console.log(res);
            return Promise.resolve(res.status)
        })
        .catch(err => {

            console.log(err);
        })
    );
}

// Retorna os dados do usuário logado.
export function getUserData() : Promise<Partial<IUser>> {

    return Promise.resolve({
        avatar: "https://avatars0.githubusercontent.com/u/19827889?s=400",
        name: "Matheus Cândido Teixeira",
    });
    return (
        axios.get("/api/users", {
            headers: {
                "Accept": "application/json"
            }
        })
        .then(res => Promise.resolve(res.data as Partial<IUser>))
        .catch(Promise.reject)
    );
}