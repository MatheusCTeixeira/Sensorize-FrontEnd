import React, {Component} from "react";

interface IProps {

}

interface IState extends IProps {

}

export class Intro extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        return (
        <>
        <div className="header top-bar" id="top">
            <nav className="navigator">
                <ul className="item">
                    <a href="#sensorize">Sensorize</a>
                </ul>

                <ul className="item">
                    <a href="#actors">Actors</a>
                </ul>

                <ul className="item">
                    <a href="#howitworks">How it works</a>
                </ul>

                <ul className="item login">
                    <a href="/login">Login</a>
                </ul>

            </nav>
            <div className="hr" />
        </div>

        <div className="content container pt-5 text-black">
            <div className="topic" id="sensorize">
                <h3>Sensorize</h3>

                <p>
                Sagittis nisl rhoncus mattis rhoncus urna neque viverra justo
                nec. Eleifend donec pretium vulputate sapien nec sagittis
                aliquam malesuada bibendum. Porttitor lacus luctus accumsan
                tortor. Aliquet nec ullamcorper sit amet risus nullam eget
                felis eget. Amet purus gravida quis blandit turpis cursus.
                Sed viverra ipsum nunc aliquet bibendum enim facilisis gravida.
                Sed elementum tempus egestas sed sed. Ac tincidunt vitae semper
                quis lectus nulla. Dictum sit amet justo donec enim diam
                vulputate ut. Hendrerit dolor magna eget est. Ac turpis egestas
                maecenas pharetra convallis posuere morbi. Vitae auctor eu augue
                ut lectus arcu. Dui vivamus arcu felis bibendum ut tristique et
                egestas. Consectetur adipiscing elit duis tristique sollicitudin
                nibh sit amet commodo. Semper viverra nam libero justo. Libero
                nunc consequat interdum varius sit amet. Nec nam aliquam sem et
                tortor. Urna neque viverra justo nec ultrices dui sapien.
                </p>
            </div>
            <div className="topic" id="actors">
                <h3>Actors</h3>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>
            <div className="topic" id="howitworks">
                <h3>How it works</h3>

                <p>
                Risus viverra adipiscing at in tellus integer feugiat. Aliquam
                eleifend mi in nulla posuere sollicitudin aliquam. Placerat duis
                ultricies lacus sed turpis tincidunt id aliquet risus.
                Pellentesque habitant morbi tristique senectus et netus. Id eu
                nisl nunc mi ipsum faucibus vitae. Platea dictumst quisque
                sagittis purus sit amet volutpat consequat. Donec massa sapien
                faucibus et molestie ac feugiat sed lectus. Lectus nulla at
                volutpat diam ut venenatis tellus. At elementum eu facilisis sed
                odio morbi quis. Quisque non tellus orci ac auctor augue mauris.
                Nibh tortor id aliquet lectus proin nibh. Aliquam id diam
                maecenas ultricies mi eget mauris pharetra et. At risus viverra
                adipiscing at. Convallis tellus id interdum velit laoreet id
                donec. Lobortis feugiat vivamus at augue eget arcu dictum. Erat
                nam at lectus urna duis convallis convallis.
                </p>
            </div>

        </div>
        <div className="footer">

        </div>
        </>);
    }
}