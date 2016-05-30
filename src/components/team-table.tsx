import * as React from "react";

import { Team } from "../types/response"
import PlayerRow from "./player-row"

export interface TeamTableProps {
    team: Team;
}

export default class TeamTable extends React.Component<TeamTableProps, any> {

    constructor(props: TeamTableProps) {
        super(props);
    }

    render() {
        var players = this.props.team.players.map(player => {
            return <PlayerRow player={player} key={player.pid} />
        });
        return <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Team</th>
                    <th>Kills</th>
                    <th>Deaths</th>
                    <th>Score</th>
                    <th>Ping</th>
                </tr>
            </thead>
            <tbody>
                {players}
            </tbody>
        </table>;
    }
}
