import { registerUser } from "../Comunication/Login";
import React, {Component, RefObject, createRef } from "react";
import {NotificationManager} from 'react-notifications';

/* ────────────────────────────────────────────────────────────────────────── */

interface IProps {

}

interface IState extends IProps {

}

export class RegisterPrompt extends Component<IProps, IState> {
    regName    : RefObject<HTMLInputElement>;
    regEmail   : RefObject<HTMLInputElement>;
    regPassword: RefObject<HTMLInputElement>;
    regAvatar  : RefObject<HTMLInputElement>;

    constructor(props: IProps) {
        super(props);

        // Dados para registrar um usuário.
        this.regName     = createRef();
        this.regEmail    = createRef();
        this.regPassword = createRef();
        this.regAvatar   = createRef();
    }

    // Obtém os dados inseridos.
    getRegisterData = () => {
        const formData = new FormData();
        formData.append("name"    , this.regName.current.value);
        formData.append("email"   , this.regEmail.current.value);
        formData.append("password", this.regPassword.current.value);
        formData.append("avatar"  , this.regAvatar.current.files[0]);

        return formData;
    }

    // Registra um usuário. Exibe o resultado através de notificações.
    registerUser = async () => {
        const userData = this.getRegisterData();

        registerUser(userData)
        .then(statusCode => {
            if (statusCode === 200)
                NotificationManager.success("User registred!");
            else
                NotificationManager.warning("Invalid data!");;
        })
        .catch(err => {
            NotificationManager.error("Network error!");
        });
    }

    // Mostra a imagem que o usuário selecionou como avatar.
    showAvatar = () => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(this.regAvatar.current.files[0]);
        fileReader.onload = (e) => {
            const img = document.getElementById("avatarPreview");
            const result = (e.target as FileReader).result;
            img.setAttribute("src", result as string);
        }
    }


    render = () => {
        return (<>
        <h3>Register</h3>
            <div className="form-group frame">
                <label htmlFor="customFile">
                    Avatar
                    <img
                        className="preview"
                        id="avatarPreview">
                    </img>
                </label>
                <input
                    type="file"
                    className="custom-file-input"
                    id="customFile"
                    ref={this.regAvatar}
                    onChange={this.showAvatar}
                />
            </div>
            <div className="form-group">
                <label>Name</label>
                <input
                    type="text"
                    className="form-control"
                    ref={this.regName}/>
            </div>
            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    className="form-control"
                    ref={this.regEmail}/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    ref={this.regPassword}/>
            </div>

            <button
                className="btn btn-primary"
                onClick={this.registerUser}>Submit
            </button>
        </>)
    }
}