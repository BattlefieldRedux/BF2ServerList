import * as React from "react";

import { Server, Team, Player } from "../types/response"
import TeamTable from "./team-table"

export interface ServerViewProps {
    server: Server;
}

export default class ServerView extends React.Component<ServerViewProps, any> {

    constructor(props: ServerViewProps) {
        super(props);
    }

    render() {
        let status = this.props.server.isOnline ? "online" : "offline";
        let team1 = this.getTeam(1);
        let team2 = this.getTeam(2);
        let teams = this.props.server.numPlayers == 0 ? "" :
            <div className="teams row">
                <TeamTable team={team1} />
                <TeamTable team={team2} />
            </div>;

        return <section className="server">
            <header>
                <div className={"status " + status}></div>
                <h1 className="name">{this.props.server.name}</h1>
                <div className="pull-right">
                    <span className="map">{this.props.server.mapName}</span>
                    <span className="players">{this.props.server.numPlayers} / {this.props.server.maxPlayers}</span>
                </div>
            </header>
            <ul className="info">
                <li>IP: {this.props.server.hostIp + ":" + this.props.server.hostPort}</li>
                <li>{this.props.server.responseTime} ms</li>
            </ul>
            {teams}
        </section>;
    }

    private getTeam(team: number): Team {
        return {
            name: team == 1 ? this.props.server.team1 : this.props.server.team2,
            score: 0,
            players: this.props.server.players.length > 0 ?
                this.props.server.players.filter(player => player != null && player.team == team) :
                []
        };
    }
}
