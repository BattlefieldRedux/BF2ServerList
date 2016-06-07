import * as React from "react";

import { Server } from "../types/response"
import ServerView from "./server-view"

export interface ServerListProps {
    serverUris: ServerUri[];
}

interface ServerListState {
    message: string;
    response: Server[];
    refreshInterval: number,
    isLoading: boolean
}

export default class ServerList extends React.Component<ServerListProps, ServerListState> {

    constructor(props: ServerListProps) {
        super(props);
        this.state = {
            message: "",
            response: [],
            refreshInterval: 32000,
            isLoading: false
        };
    }

    componentDidMount() {
        this.refreshServers();
    }

    render() {
        let message = this.state.response.length == 0 ? "Loading servers..." : "";
        let loading = this.state.isLoading ? "" : "";
        let servers = this.state.response.map((server: Server) => {
            return <ServerView server={server} key={server.hostIp + ":" + server.hostPort}/>
        });
        return <div>
            <p>{loading}</p>
            <p>{message}</p>
            {servers}
        </div>;
    }

    private refreshServers() {
        this.setState({
            message: "",
            response: this.state.response,
            refreshInterval: this.state.refreshInterval,
            isLoading: true
        });

        this.getServers()
            .then(servers => {
                // console.log(servers);
                this.update("", servers);
            })
            .catch(error => {
                console.error("Unable to get servers")
                console.log(error)
                this.update("Unable to get servers", []);
            })
    }

    private getBaseUrl(): string {
        if (window.location.toString().indexOf("localhost") >= 0)
            return "http://localhost:25562/";
        return "http://bf2.nihlen.net";
    }

    // async-await? https://templecoding.com/blog/2016/02/17/async-await-with-es6-babel-and-typescript/
    // planned support for es5 in 2.0 https://github.com/Microsoft/TypeScript/wiki/Roadmap
    private getServers(): Promise<Server[]> {
        let baseUrl = this.getBaseUrl();
        let queryString = "?servers=" + this.props.serverUris
            .map(serverUri => serverUri.hostIp + ":" + serverUri.queryPort)
            .join("&servers=");
        let response = fetch(baseUrl + "/api/v1/server/query" + queryString)
            .then(data => data.json())
            .then((data: Server[]) => data);
        return response;
    }

    private update(message: string, response: Server[]) {
        this.setState({
            message: message,
            response: response,
            refreshInterval: this.state.refreshInterval,
            isLoading: false
        });
        if (this.state.refreshInterval > 0)
            setTimeout((() => this.refreshServers()), this.state.refreshInterval);
    }
}

export interface ServerUri {
    name: string;
    hostIp: string;
    queryPort: number;
}
