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

                <div style={{textAlign: "justify", lineHeight: 1.8}}>
                With the advancement of machine learning and other branches of
                artificial intelligence, data analysis has become increasingly
                necessary and common for increasing the production efficiency
                and optimization of services offered by companies and for
                academic research. Many companies and research groups work with
                sensors and other data sources. In these, it is common to
                implement systems with specific purpose to analyze the collected
                data, demanding time and money in the creation of systems that
                provide the necessary tools for the visualization and analysis
                of the data. Based on these facts, this project provides an
                application capable of serving a wide range of data sources,
                from sensors to user-collected data, and performing predictive
                calculations on them in real time. The advantage of the
                application developed in this project is the flexibility as to
                the type of data source, the scalability and the fact that it
                does not require dedicated application servers. Therefore, this
                project presents a tool to serve various types of users,
                providing a data visualization platform and statistical analysis
                tools independent of operating system, hardware, data source
                type, database used for data storage. data sources and device
                used for user access to the system.
                </div>
            </div>
            <div className="topic" id="actors">
                <h3>Actors</h3>

                <div style={{textAlign: "justify", lineHeight: 1.8}}>
                <p>
                For the proper functioning of the system was made use of three
                elements: the application, the server and the data source.
                </p>
                <p>
                The data source is the element that originates the data that
                will be displayed and processed in the application. The
                transmitted data may be as a function of time, a time series,
                or as a function of a finite set of values, referred to in this
                system as categories.
                </p>
                <p>
                The server is the element that stores user
                data, data sources, and graphics. It is also responsible for
                authenticating users on the system. Each user has graphs and
                data sources associated with them and it is the server's
                responsibility to control the association between the data of
                these elements and the user, that is, the server must control
                which graphs and data source belongs to a particular user and
                allow the user to can change the data belonging to it.
                </p>
                <p>
                Finally, the application is a web application that runs on the user's
                browser. It is responsible for requesting data from data sources
                and then displaying the returned data and performing predictive
                calculations about them. The approach of requesting the data
                source directly, rather than requesting the server and the data
                source, was employed to reduce propagation time and avoid server
                overload.
                </p>
                </div>
            </div>
            <div className="topic" id="howitworks">
                <h3>How it works</h3>

                <div style={{textAlign: "justify", lineHeight: 1.8}}>
                <p>
                The structure and relationship between the elements developed in
                this project, such as the application, the server, and the data
                source, isolate the responsibility assigned to each of them and
                allow each to address a specific system need and scope. defined
                and restricted performance. This reduces the complexity of the
                system as each element meets a unique need and increases its
                extensibility as elements can be modified, adjusted or updated
                in isolation without interfering with each other.
                The distribution of application, server, and data source
                functionality balanced the workload performed by each element.
                </p><p>
                The application is responsible for fetching data and performing
                calculations about it. The server is responsible for storing
                user-associated data, authenticating users, and mediating user
                access to the database. The data source is responsible for
                providing data, responding to customer requests and filtering
                data as needed.
                </p><p>
                Some aspects that increased the complexity of the project were
                data that are asynchronous from the application
                point of view, the structure of communication between the
                elements that make up the project, and the complexity of the
                technologies employed.
                </p><p>
                The complexity involved in system asynchronism is due to the
                fact that the application has no information on when and how
                data will arrive from data sources. Data from data sources may
                contain a varying number of samples at any time and depending on
                Amount of data can cause the user's browser to crash or slow
                down. To solve this problem an algorithm was created that
                discards older data when it exceeds the buffered data limit.
                </p><p>
                The second source of complexity is due to the communication
                structure between the elements of the
                system. At first, all communication between the application and
                data sources would be through the server, but this approach had
                many drawbacks to the project as the server would be used as a
                proxy between client and data source and another consequence of
                this approach would be the response time of a request, which
                would be doubled on account of the intermediate element, the
                server in this case. To solve this problem, the server provides
                data from the data sources that belong to the user and the user
                himself requests the data sources as required. As a result, the
                server is not overloaded and the time required for the
                communication process between the application and the data
                source is reduced.
                </p><p>
                The last source of complexity comes from the
                technologies employed in the project. Some of the technologies
                used, such as the one used to display the graphics, required
                adaptations to support the processing load and memory
                consumption required to display the graphics while ensuring a
                good user experience for the system. To solve these problems,
                several algorithms have been created, as described above, to
                adapt the data in a format recognizable by technologies, control
                of memory and network bandwidth consumption and data processing
                reduction.
                </p>
                </div>
            </div>

        </div>
        <div className="footer">

        </div>
        </>);
    }
}