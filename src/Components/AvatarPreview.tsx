import React, {Component, RefObject} from "react";

import {NotificationManager} from "react-notifications";

interface IProps {
    defaultImage: string;
    onSelected: (image: File) => void;
}

interface IState {

}

export class AvatarPreview extends Component<IProps, IState> {
    avatar: RefObject<HTMLInputElement>;

    constructor(props: IProps) {
        super(props);

        this.avatar = React.createRef();
    }

    // Mostra a imagem que o usuário selecionou como avatar.
    showAvatar = () => {
        const fileReader = new FileReader();
        const files = this.avatar.current.files;

        // Notifica via callback a imagem escolhida.
        if (files[0].type.startsWith("image/")) {
            this.props.onSelected(this.avatar.current.files[0]);
        } else {
            NotificationManager.error("Please, select a picture!");
            return;
        }

        // Exibe a imagem.
        fileReader.readAsDataURL(files[0]);
        fileReader.onload = (e) => {
            const img = document.getElementById("avatarPreview");
            const result = (e.target as FileReader).result;
            img.setAttribute("src", result as string);
        }
    }

    render = () => {

        return (
        <>
            <div>
                <label htmlFor="customFile">
                    <img
                        className="preview"
                        src={this.props.defaultImage}
                        id="avatarPreview">
                    </img>
                </label>
            </div>
            <input
                type="file"
                className="custom-file-input"
                id="customFile"
                ref={this.avatar}
                onChange={this.showAvatar}
            />
        </>);
    }
}