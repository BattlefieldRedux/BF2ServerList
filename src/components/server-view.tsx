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
        let team1 = this.getTeam(1);
        let team2 = this.getTeam(2);
        return <div>
            <div>Server: {this.props.server.name}</div>
            <div>Players: {this.props.server.numPlayers}/{this.props.server.maxPlayers}</div>
            <div>Response time: {this.props.server.responseTime}</div>
            <TeamTable team={team1} />
            <TeamTable team={team2} />
        </div>;
    }

    private getTeam(team: number): Team {
        return {
            name: team == 1 ? this.props.server.team1 : this.props.server.team2,
            score: 0,
            players: this.props.server.players.length > 0 ? this.props.server.players.filter(player => player.team == team) : []
        };
    }
}
