import {IUser} from "../Types/UserType";
import axios from "axios";

// Para teste apenas.
// const baseAddr = "http://localhost:5000";
const baseAddr = "";

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
    return (
        axios.get(baseAddr + "/api/users", {
            withCredentials: true,
            headers: {
                "Accept": "application/json"
            }
        })
        .then(res => Promise.resolve(res.data as Partial<IUser>))
        .then(user => {
            user.avatar = baseAddr + user.avatar;
            return Promise.resolve(user);
        })
        .catch(Promise.reject)
    );
}

export function updateUserData(user: FormData) : Promise<Partial<IUser>> {
    return (
        axios.put(baseAddr + "/api/users", user, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res  => Promise.resolve(res.data as IUser))
            .catch(Promise.reject)
        );
}

// Encerra a sessão de um usuário.
export function logOut () : Promise<boolean> {
    return (
        axios.get(baseAddr + "/api/logout", {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => Promise.resolve(res.status === 200))
        .catch(Promise.reject)
    );
}