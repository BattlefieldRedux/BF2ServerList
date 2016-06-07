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
        var teamName = this.getTeamName(this.props.team.name);
        var team = this.props.team.name != null ? this.props.team.name.toLowerCase() : "";
        var players = this.props.team.players.map(player => {
            return <PlayerRow player={player} key={player.pid} />
        });
        return <div className="col-md-6">
            <table className="table">
                <thead>
                    <tr>
                        <th className={team}><span className="icon"></span></th>
                        <th className="name">{teamName}</th>
                        <th className="team-score"><span className="icon"></span></th>
                        <th className="kills"><span className="icon"></span></th>
                        <th className="deaths"><span className="icon"></span></th>
                        <th className="total-score"><span className="icon"></span></th>
                        <th className="ping"><span className="icon"></span></th>
                    </tr>
                </thead>
                <tbody>
                    {players}
                </tbody>
            </table>
        </div>;
    }

    private getTeamName(team: string): string {
        if (team == null)
            return "?";
        switch (team.toLowerCase()) {
            case "us": return "USMC";
            case "eu": return "EU";
            case "mec": return "MEC";
            case "ch": return "China";
        }
        return "?";
    }
}
