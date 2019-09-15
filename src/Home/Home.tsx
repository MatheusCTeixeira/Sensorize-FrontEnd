import React, {Component, RefObject, createRef} from "react";
import { AvatarPreview } from "../Components/AvatarPreview";
import { IUser } from "../Types/UserType";

import {NotificationManager} from "react-notifications";
import { getUserData, updateUserData } from "../Comunication/Login";
import { Button, FormGroup } from "react-bootstrap";
import Form from "react-bootstrap/FormGroup";


interface IProps {}
interface IState {
    avatar?: File;
    user?: IUser;
}

export class Home extends Component<IProps, IState> {
    name    : RefObject<HTMLInputElement>;
    password: RefObject<HTMLInputElement>;

    constructor(props: IProps) {
        super(props);

        this.state    = {};
        this.name     = createRef();
        this.password = createRef();
    }

    componentDidMount = () => {
        getUserData()
        .then(userData => this.setState({user: userData as IUser}))
        .catch(error => {
            NotificationManager.error("Could not get user data.")
        });
    }

    // Altera o avatar do usuário quando a imagem for selecionada.
    setAvatar = (file: File) => {
        this.setState({
            avatar: file,
        });
    }

    // Obtém os dados dos demais campos.w-75
    extractData = () => {
        const name = this.name.current.value;
        const password = this.password.current.value;

        const data = new FormData();
        data.set("id", this.state.user.id.toString());
        data.set("name", name);

        if (password.length > 7)
            data.set("password", password);

        // this.state.avatar != this.state.uer.avatar
        // O primeiro é uma imagem, já o último é uma url.
        if (this.state.avatar)
            data.set("avatar", this.state.avatar);

        return data;
    }

    // Envia os dados para o servidor.
    update = () => {
        const updatedData = this.extractData();
        updateUserData(updatedData)
        .then(userUpdated => {
            console.log(userUpdated);
        })
        .catch(error => {

        });
    }

    render = () => {
        if (!this.state.user) return null;
        return (<>
            <Form>
            <div className="container mt-3 text-black w-50">
                <div className="gap"/>
                <h3>Change Avatar</h3>
                <label>Avatar:</label>
                <AvatarPreview
                    onSelected={this.setAvatar}
                    defaultImage={this.state.user.avatar}/>
                <div className="gap"/>
                <h3>Change Name</h3>
                <FormGroup>
                    <label>Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        style={{textAlign: "center"}}
                        ref={this.name}
                        defaultValue={this.state.user.name} />
                </FormGroup>

                <div className="gap"/>
                <h3>Change Password</h3>
                <FormGroup>
                    <label>Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        ref={this.password}
                        style={{textAlign: "center"}}/>
                </FormGroup>
                <div className="gap"/>
                <Button
                    onClick={this.update}>
                    Save
                </Button>
            </div>
            </Form>
        </>);
    }
}