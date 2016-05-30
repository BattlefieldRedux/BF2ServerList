import * as React from "react";

import { Server } from "../types/response"
import ServerView from "./server-view"

export interface ServerListProps {
    serverUris: ServerUri[];
}

interface ServerListState {
    response: Server[];
    refreshInterval: number,
    isLoading: boolean
}

export default class ServerList extends React.Component<ServerListProps, ServerListState> {

    constructor(props: ServerListProps) {
        super(props);
        this.state = {
            response: [],
            refreshInterval: 32000,
            isLoading: false
        };
    }

    componentDidMount() {
        this.refreshServers();
    }

    render() {
        let loading = this.state.isLoading ? "LOADING" : "";
        let servers = this.state.response.map((server: Server) => {
            return <ServerView server={server} key={server.hostIp + ":" + server.hostPort}/>
        });
        return <div>
            <div>Servers: {servers}</div>
            <div>{loading}</div>
        </div>;
    }

    // async-await? https://templecoding.com/blog/2016/02/17/async-await-with-es6-babel-and-typescript/
    // planned support for es5 in 2.0 https://github.com/Microsoft/TypeScript/wiki/Roadmap
    private getServers(): Promise<Server[]> {
        let queryString = "?servers=" + this.props.serverUris
            .map(serverUri => serverUri.hostIp + ":" + serverUri.queryPort)
            .join("&servers=");
        let response = fetch("http://localhost:25562/api/v1/server/query" + queryString)
            .then(data => data.json())
            .then((data: Server[]) => data);
        return response;
    }

    private refreshServers() {
        this.setState({
            response: this.state.response,
            refreshInterval: this.state.refreshInterval,
            isLoading: true
        });

        this.getServers()
            .then(servers => {
                console.log(servers);
                this.setState({
                    response: servers,
                    refreshInterval: this.state.refreshInterval,
                    isLoading: false
                });
                if (this.state.refreshInterval > 0)
                    setTimeout((() => this.refreshServers()), this.state.refreshInterval);
            });
    }
}

export interface ServerUri {
    name: string;
    hostIp: string;
    queryPort: number;
}
